import axios from "axios";
import { Playlist } from "../store/usePlaylistStore";
import { MyPlaylist } from '../store/useMyplay';
import { auth, database} from '../services/firebase-config';
import { collection, getDocs, query, where} from 'firebase/firestore'

export const fetchPlaylist = async(search: string): Promise<Playlist[]> => {
    const response = await axios.get(`https://itunes.apple.com/search?term=${search}`);
    const playlist: Playlist[] = response.data.results;
    return playlist;
}

export const fetchMyPlaylist = async(): Promise<MyPlaylist[]> => {
    const myplRef = collection(database, 'myplaylist');
    const q = query(myplRef, where('uid', "==", auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        const data = doc.data() as MyPlaylist;
        return {...data, id: doc.id}
    })
}