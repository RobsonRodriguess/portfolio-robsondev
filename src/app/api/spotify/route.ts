import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

// In-memory token cache to prevent hammering the Spotify token endpoint
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

function getCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret =
    process.env.SPOTIFY_CLIENT_SECRET ||
    process.env['SEGREDO DO CLIENTE_SPOTIFY_'];
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  return { clientId, clientSecret, refreshToken };
}

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const resp = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  });

  if (!resp.ok) {
    return null;
  }

  const data = await resp.json();
  if (data.access_token) {
    cachedAccessToken = data.access_token;
    tokenExpiresAt = now + (data.expires_in || 3600) * 1000;
    return cachedAccessToken;
  }

  return null;
}

export async function GET() {
  try {
    const { clientId, clientSecret, refreshToken } = getCredentials();

    if (!clientId || !clientSecret || !refreshToken) {
      return NextResponse.json({ isPlaying: false, configured: false });
    }

    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);
    if (!accessToken) {
      return NextResponse.json({ isPlaying: false });
    }

    const resp = await fetch(`${NOW_PLAYING_ENDPOINT}?market=from_token`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (resp.status === 204 || resp.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await resp.json();

    if (!song || !song.item) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      albumImageUrl: song.item.album?.images?.[0]?.url || '',
      artist: song.item.artists?.map((a: { name: string }) => a.name).join(', ') || 'Unknown',
      isPlaying: Boolean(song.is_playing),
      songUrl: song.item.external_urls?.spotify || '',
      title: song.item.name || '',
      progressMs: song.progress_ms || 0,
      durationMs: song.item.duration_ms || 0,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
