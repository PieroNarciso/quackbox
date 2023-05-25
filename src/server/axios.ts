import axios from 'axios';


export const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});
