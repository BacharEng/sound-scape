import React, { useState } from "react";
import { 
    View, 
    Text, 
    Alert,
    ActivityIndicator,
    FlatList,
    TextInput, 
    TouchableOpacity } from 'react-native';
import colors from '../../services/appColors';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from '../../services/appStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import appColors from "../../services/appColors";
import axios from "axios";
import Track from "../../components/Track";

const Dashboard = (props) => {

    const [playlist, setPlaylist] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const loadPlaylist = async() => {
        setIsLoading(true)
        await axios.get(`https://itunes.apple.com/search?term=${search}`)
        .then(res => {
            setPlaylist(res.data.results);
            setSearch("");
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false)
            Alert.alert("Load playlist", err.message);
        })
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

                 <TouchableOpacity onPress={loadPlaylist} style={styles.search_btn}>
                    <FontAwesome name="search" size={26} color={colors.pink} />
                 </TouchableOpacity>
            </View>

            <View style={styles.list_container}>
                {
                    isLoading ? (<>
                        <ActivityIndicator size='large' color={colors.pink} />
                    </>) : (<>
                        {
                            playlist.length > 0 
                            ? <FlatList
                                style={{width:'100%'}}
                                data={playlist}
                                keyExtractor={item => item.trackId}
                                renderItem={itemRow => 
                                    <Track 
                                        trackClick={() => {props.navigation.navigate("trackInfo", {track: itemRow.item} )}}
                                        track={itemRow.item} />}
                            />
                            : <Text>No data for you :-(</Text>
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