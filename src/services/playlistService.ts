import axios from "axios";
import { Playlist } from "../store/usePlaylistStore";

export const fetchPlaylist = async(search: string): Promise<Playlist[]> => {
    const response = await axios.get(`https://itunes.apple.com/search?term=${search}`);
    const playlist: Playlist[] = response.data.results;
    return playlist;
}