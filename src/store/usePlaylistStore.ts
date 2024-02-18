import create from 'zustand';

export interface Playlist {
    trackId: number;
    artistName: string;
    artistId: number;
    trackName: string;
    artistViewUrl: string;
    previewUrl: string;
    artworkUrl100: string;
    trackPrice: number;
    wrapperType: string;
}

interface PlaylistStore {
    playlist: Playlist[];
    setPlaylist: (playlist: Playlist[]) => void;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
    playlist:[],
    setPlaylist: (playlist) => set({playlist})
}))