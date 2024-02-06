import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, Button } from 'react-native'
import styles from '../../services/appStyle';
import appColors from '../../services/appColors';
import AudioPlayer from '../../components/AudioPlayer';

const TrackInfo = (props) => {

  const track = props.route.params.track;

  return (
    <ScrollView style={{flex:1, backgroundColor:appColors.celeste}}>
        <Image style={styles.ti_main_image} source={{uri: track.artworkUrl100}} />
        <AudioPlayer uri={track.previewUrl} />
    </ScrollView>
  )
}

export const screenOptions = (navData) => {
    return {
        headerTitle: navData.route.params.track.trackName
    }
}


export default TrackInfo