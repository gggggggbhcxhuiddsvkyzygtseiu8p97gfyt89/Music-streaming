import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import MusicPlayer from '../components/MusicPlayer';
import { searchSpotify } from '../services/spotifyService';
import { searchYouTube } from '../services/youtubeService';

const Home = () => {
  const [spotifyTracks, setSpotifyTracks] = useState([]);
  const [youtubeTracks, setYoutubeTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentSource, setCurrentSource] = useState(null);

  useEffect(() => {
    // Load initial recommendations
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const spotifyResults = await searchSpotify('top tracks');
      const youtubeResults = await searchYouTube('music');
      
      setSpotifyTracks(spotifyResults);
      setYoutubeTracks(youtubeResults);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  };

  const handleTrackSelect = (track, source) => {
    setCurrentTrack(track);
    setCurrentSource(source);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Discover Music
      </Typography>

      <MusicPlayer track={currentTrack} source={currentSource} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Spotify Tracks
        </Typography>
        <Grid container spacing={2}>
          {spotifyTracks.map((track) => (
            <Grid item xs={12} sm={6} md={3} key={track.id}>
              <Card 
                sx={{ cursor: 'pointer' }}
                onClick={() => handleTrackSelect(track, 'spotify')}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={track.artwork}
                  alt={track.title}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>{track.title}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {track.artist}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          YouTube Music
        </Typography>
        <Grid container spacing={2}>
          {youtubeTracks.map((track) => (
            <Grid item xs={12} sm={6} md={3} key={track.videoId}>
              <Card 
                sx={{ cursor: 'pointer' }}
                onClick={() => handleTrackSelect(track, 'youtube')}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={track.thumbnail}
                  alt={track.title}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>{track.title}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {track.channelTitle}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
