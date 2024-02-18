import axios from "axios";
import { Playlist } from "../store/usePlaylistStore";
import { MyPlaylist } from '../store/useMyplay';
import { auth, database} from '../services/firebase-config';
import { DocumentData, addDoc, collection, deleteDoc, doc, getDocs, query, where} from 'firebase/firestore'

const myplRef = collection(database, 'myplaylist');

export const fetchPlaylist = async(search: string): Promise<Playlist[]> => {
    const response = await axios.get(`https://itunes.apple.com/search?term=${search}`);
    const playlist: Playlist[] = response.data.results;
    return playlist;
}

export const fetchMyPlaylist = async(): Promise<MyPlaylist[]> => {
    const q = query(myplRef, where('uid', "==", auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        const data = doc.data() as MyPlaylist;
        return {...data, id: doc.id}
    })
}

export const addTrackToMyPlaylist = async(track : Omit<MyPlaylist, 'id'>): Promise<DocumentData> => {
    return await addDoc(myplRef, track);
}

export const removeFromMyPlaylist = async(id: string): Promise<void> => {
    const useDoc = doc(database, 'myplaylist', id);
    await deleteDoc(useDoc);
}