import create from 'zustand';

export interface MyPlaylist {
    trackId: number;
    artistName: string;
    artistId: number;
    trackName: string;
    artistViewUrl: string;
    previewUrl: string;
    artworkUrl100: string;
    trackPrice: number;
    wrapperType: string;
    uid: string;
}

interface MyPlaylistStore {
    myplaylist: MyPlaylist[];
    setMyPlaylist: (playlist: MyPlaylist[]) => void;
    addTrackToPlaylist: (track: MyPlaylist) => void;
}

export const useMyplay = create<MyPlaylistStore>((set) => ({
    myplaylist:[],
    setMyPlaylist: (myplaylist) => set({myplaylist}),
    addTrackToPlaylist: (track) => set((state) => ({myplaylist: [...state.myplaylist, track]}))
}))