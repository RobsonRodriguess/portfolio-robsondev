const http = require('http');
const https = require('https');
const { URL } = require('url');

const CLIENT_ID = '50a6b5a539834da68f214f1284751958';
const CLIENT_SECRET = 'fa420cd4f3394446a5d1ce445a89defe';
const REDIRECT_URI = 'https://meu-portfolio-rosy-two.vercel.app/';
const AUTH_URL = 'https://accounts.spotify.com/authorize?response_type=code&client_id=50a6b5a539834da68f214f1284751958&scope=user-read-currently-playing%20user-read-playback-state%20user-read-recently-played&redirect_uri=https://meu-portfolio-rosy-two.vercel.app/';
const PORT = 3456;

// Also test if the code you gave me is actually an access token
const code1 = process.argv[2];
if (code1) {
  console.log('Testing provided code as access token...');
  https.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + code1 },
  }, (resp) => {
    let body = '';
    resp.on('data', d => body += d);
    resp.on('end', () => {
      console.log('Spotify /me response (status ' + resp.statusCode + '):');
      console.log(body.substring(0, 300));
    });
  }).on('error', e => console.error('Error:', e.message));
}

console.log('Opening Spotify authorization page...');
console.log('AUTH URL:', AUTH_URL);
console.log('');

// Start a local server to catch the callback
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:' + PORT);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Authorization successful! You can close this window.');

  const code = url.searchParams.get('code');
  if (code) {
    console.log('Got authorization code.');
    exchangeToken(code);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Listening on http://localhost:' + PORT);
  console.log('Open this URL in your browser and authorize:');
  console.log(AUTH_URL);
  // Try to open browser
  const { exec } = require('child_process');
  exec('start "" "https://accounts.spotify.com/authorize?response_type=code&client_id=50a6b5a539834da68f214f1284751958&scope=user-read-currently-playing%20user-read-playback-state%20user-read-recently-played&redirect_uri=https%3A%2F%2Fmeu-portfolio-rosy-two.vercel.app%2F"');
});

function exchangeToken(code) {
  const auth = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
  const postData = 'grant_type=authorization_code&code=' + encodeURIComponent(code) + '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);

  const options = {
    hostname: 'accounts.spotify.com',
    path: '/api/token',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + auth,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = https.request(options, (resp) => {
    let body = '';
    resp.on('data', d => body += d);
    resp.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data.refresh_token) {
          console.log('');
          console.log('REFRESH TOKEN:');
          console.log(data.refresh_token);
          console.log('');
          console.log('Copy this token! They go in vercel env add SPOTIFY_REFRESH_TOKEN production');
          server.close();
        } else {
          console.log('API Response:', JSON.stringify(data, null, 2));
        }
      } catch {
        console.log('Raw response:', body.substring(0, 500));
      }
    });
  });

  req.on('error', (e) => console.error('Error:', e.message));
  req.write(postData);
  req.end();
}
