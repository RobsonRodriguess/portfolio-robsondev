import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function callSpotifyApi() {
  let access_token: string | null = null;

  // Strategy 1: Use refresh token if available and valid
  if (refresh_token && refresh_token.length > 50) {
    try {
      const resp = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
        }),
        cache: 'no-store',
        next: { revalidate: 0 },
      });

      if (resp.ok) {
        const data = await resp.json();
        access_token = data.access_token || null;
      }
    } catch (e) {
      console.error('Spotify refresh token flow failed:', e);
    }
  }

  // If no access token, we can't proceed
  if (!access_token) {
    return NextResponse.json({ isPlaying: false });
  }

  // Get currently playing track
  const resp = await fetch(`${NOW_PLAYING_ENDPOINT}?market=from_token`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });

  if (resp.status === 204) {
    return NextResponse.json({ isPlaying: false });
  }

  if (resp.status === 401) {
    // Token expired
    return NextResponse.json({ isPlaying: false, error: 'Token expired' });
  }

  if (!resp.ok) {
    return NextResponse.json({ isPlaying: false });
  }

  const song = await resp.json();

  if (!song.item) {
    return NextResponse.json({ isPlaying: false });
  }

  return NextResponse.json({
    albumImageUrl: song.item.album.images[0]?.url || '',
    artist: song.item.artists.map((a: any) => a.name).join(', '),
    isPlaying: song.is_playing,
    songUrl: song.item.external_urls.spotify,
    title: song.item.name,
    progressMs: song.progress_ms,
    durationMs: song.item.duration_ms,
  });
}

export async function GET() {
  try {
    if (!client_id || !client_secret) {
      return NextResponse.json({ isPlaying: false, error: 'Not configured' });
    }
    return await callSpotifyApi();
  } catch (error) {
    console.error('Erro na API Spotify:', error);
    return NextResponse.json({ isPlaying: false, error: 'Falha na conexão' });
  }
}
