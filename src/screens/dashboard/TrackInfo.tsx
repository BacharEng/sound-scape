import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, Button, TouchableOpacity } from 'react-native'
import styles from '../../services/appStyle';
import appColors from '../../services/appColors';
import AudioPlayer from '../../components/AudioPlayer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { database, auth } from '../../services/firebase-config'
import { collection, addDoc } from 'firebase/firestore'

const TrackInfo = (props) => {

  const track = props.route.params.track;

  const addTrackToPlaylist = async() => {
    try {
        const trackRef = await addDoc(collection(database, "myplaylist"), {
            uid: auth.currentUser.uid,
            ...track
          });
    } catch (error) {
        
    }
  }

  return (
    <ScrollView style={{flex:1, backgroundColor:appColors.celeste}}>
        <Image style={styles.ti_main_image} source={{uri: track.artworkUrl100}} />
        <AudioPlayer uri={track.previewUrl} />


        <TouchableOpacity onPress={addTrackToPlaylist} style={styles.add_btn}>
            <MaterialCommunityIcons size={50} color={appColors.white} name='playlist-plus' />
        </TouchableOpacity>


    </ScrollView>
  )
}

export const screenOptions = (navData) => {
    return {
        headerTitle: navData.route.params.track.trackName
    }
}


export default TrackInfo