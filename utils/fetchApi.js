import axios from "axios";
//  as we are exporting 2 variables from one and the same file, it is better to export the same way = i.e. just using export (w/o default) so that in the other file we can get these both simultaniously via distructuring: import { fetchApi, baseUrl } from '../utils/fetchApi';
export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_PUBLIC_RAPID_API_KEY,
    },
  });
    
  return data;
}