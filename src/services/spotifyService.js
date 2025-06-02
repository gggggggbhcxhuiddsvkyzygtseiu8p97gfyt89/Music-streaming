import SpotifyWebApi from '@spotify/web-api-js';

const spotifyApi = new SpotifyWebApi();

// Replace with your Spotify API credentials
const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
const REDIRECT_URI = 'http://localhost:5173/callback';

export const initializeSpotify = () => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get('access_token');

  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
    return true;
  }
  return false;
};

export const authorizeSpotify = () => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-modify-playback-state',
    'user-read-playback-state',
    'streaming'
  ];

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join('%20')}&response_type=token`;
  
  window.location.href = authUrl;
};

export const searchSpotify = async (query) => {
  try {
    const response = await spotifyApi.search(query, ['track'], { limit: 20 });
    return response.tracks.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      artwork: track.album.images[0].url,
      uri: track.uri
    }));
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return [];
  }
};

export const playTrack = async (uri) => {
  try {
    await spotifyApi.play({ uris: [uri] });
  } catch (error) {
    console.error('Error playing track:', error);
  }
};
