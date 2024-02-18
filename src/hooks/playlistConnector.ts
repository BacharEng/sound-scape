import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { fetchPlaylist } from '../services/playlistService';
import { usePlaylistStore } from '../store/usePlaylistStore';

export const playlistConnector = () => {
    const {data: playlist} = useQuery('playlists', fetchPlaylist);
    const setPlaylist = usePlaylistStore(state => state.setPlaylist);

    useEffect(() => {
        if(playlist){
            setPlaylist(playlist)
        }
    },[playlist,setPlaylist])
}