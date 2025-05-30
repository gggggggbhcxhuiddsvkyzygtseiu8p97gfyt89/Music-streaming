import axios from 'axios';

// Replace with your YouTube API key
const API_KEY = 'YOUR_YOUTUBE_API_KEY';
const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchYouTube = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: query,
        type: 'video',
        videoCategoryId: '10', // Music category
        key: API_KEY
      }
    });

    return response.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url
    }));
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return [];
  }
};

export const getVideoDetails = async (videoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails',
        id: videoId,
        key: API_KEY
      }
    });

    const video = response.data.items[0];
    return {
      videoId: video.id,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      thumbnail: video.snippet.thumbnails.high.url,
      duration: video.contentDetails.duration
    };
  } catch (error) {
    console.error('Error getting video details:', error);
    return null;
  }
};