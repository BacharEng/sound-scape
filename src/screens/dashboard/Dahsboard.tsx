import React, { useState } from "react";
import { View, Text, Alert,ActivityIndicator,FlatList,TextInput, TouchableOpacity } from 'react-native';
import colors from '../../services/appColors';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from '../../services/appStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import appColors from "../../services/appColors";
import axios from "axios";
import Track from "../../components/Track";
import { database, auth } from '../../services/firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { fetchPlaylist } from '../../services/playlistService';
import { usePlaylistStore } from '../../store/usePlaylistStore';

const Dashboard = () => {

    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const setPlaylist = usePlaylistStore((state) => state.setPlaylist);
    const playlist = usePlaylistStore((state) => state.playlist);

    const fetchData = async() => {
        if (!search.trim()) {
            Alert.alert("Please enter a search parameter");
            return;
        }
        try {
            const results = await fetchPlaylist(search);
            setPlaylist(results)
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to fetch results')
        }
    }


    return(
        <View style={styles.container}>
            
            <View style={styles.search_container}>
                <TextInput 
                    value={search}
                    onChangeText={(e) => {setSearch(e)}}
                    keyboardType='default'
                    autoCapitalize='none'
                    placeholder="Search your band/artist..."
                    style={styles.input_search}
                 />

                 <TouchableOpacity onPress={fetchData} style={styles.search_btn}>
                    <FontAwesome name="search" size={26} color={colors.pink} />
                 </TouchableOpacity>
            </View>

            <View style={styles.list_container}>
                {
                    playlist && (<>
                    {
                        <FlatList
                            data={playlist}
                            keyExtractor={(item) => item.trackId.toString()}
                            renderItem={({item}) => (
                                <Track track={item} />
                            )}
                        />
                    }
                    </>)
                }
            </View>

        </View>
    )
}


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Dashboard',
        headerRight: () => (
            <Ionicons 
                onPress={() => {navData.navigation.navigate('settings')}}
                name='options' 
                color={colors.gray} size={24} />
        )
    }
}

export default Dashboard;