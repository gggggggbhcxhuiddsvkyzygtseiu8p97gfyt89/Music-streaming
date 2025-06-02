import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, IconButton, Typography, Slider } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious, Shuffle, Repeat } from '@mui/icons-material';
import YouTube from 'react-youtube';

const MusicPlayer = ({ track, source }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (track) {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [track]);

  const handlePlayPause = () => {
    if (source === 'spotify') {
      // Handle Spotify playback
      if (isPlaying) {
        window.spotifyPlayer.pause();
      } else {
        window.spotifyPlayer.play();
      }
    } else {
      // Handle YouTube playback
      if (player) {
        if (isPlaying) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      }
    }
    setIsPlaying(!isPlaying);
  };

  const onYouTubeReady = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const handleProgressChange = (event, newValue) => {
    setProgress(newValue);
    if (source === 'spotify') {
      window.spotifyPlayer.seek(newValue * 1000);
    } else if (player) {
      player.seekTo(newValue);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', marginTop: 2 }}>
      <CardContent>
        {source === 'youtube' && track?.videoId && (
          <Box sx={{ display: 'none' }}>
            <YouTube
              videoId={track.videoId}
              onReady={onYouTubeReady}
              opts={{ height: '0', width: '0' }}
            />
          </Box>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <img
            src={track?.artwork || 'https://via.placeholder.com/64'}
            alt={track?.title}
            style={{ width: 64, height: 64, marginRight: 16 }}
          />
          <Box>
            <Typography variant="h6">{track?.title || 'No track selected'}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {track?.artist || 'Unknown Artist'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <IconButton size="small">
            <Shuffle />
          </IconButton>
          <IconButton size="small">
            <SkipPrevious />
          </IconButton>
          <IconButton size="large" onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton size="small">
            <SkipNext />
          </IconButton>
          <IconButton size="small">
            <Repeat />
          </IconButton>
        </Box>

        <Slider
          value={progress}
          onChange={handleProgressChange}
          max={duration}
          sx={{ color: source === 'spotify' ? '#1DB954' : '#FF0000' }}
        />
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
