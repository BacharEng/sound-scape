import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import appColors from '../services/appColors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Track = (props) => {

  const fixLength = (str,lng) => {
    if(str && str.length > lng){
        return str = str.slice(0,lng) + '...';
      } else {
        return str
      }
  }

  const album = fixLength(props?.track?.collectionName, 20);
  const trackName = fixLength(props?.track?.trackName, 20);
  const artistName = fixLength(props?.track?.artistName, 30);

  return (
    <TouchableOpacity onPress={() => props.trackClick()} style={styles.row}>
        <View style={styles.image_container}>
            <Image style={styles.image} source={{uri: props.track.artworkUrl100}} />
        </View>
        <View style={styles.context_container}>
            <Text style={styles.track_name}>{trackName}</Text>
            <Text style={styles.simple_txt}>{artistName}</Text>
            <Text style={styles.simple_txt}>Album: {album}</Text>
        </View>

        <View style={styles.arrow}>
            <MaterialIcons color={appColors.pink} size={24} name='favorite-border' />
        </View>


        <View style={styles.arrow}>
            <MaterialIcons color={appColors.pink} size={24} name='keyboard-arrow-right' />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    simple_txt: {fontFamily:'Raleway-Medium', fontSize:14},
    track_name: { fontFamily:'Raleway-Bold', fontSize:16, color:appColors.pink },
    image: {width:'100%', height:'100%', borderTopLeftRadius:6, borderBottomLeftRadius:6},
    image_container:{ width:'20%', height:80},
    context_container:{ width:'60%', height:80, padding:10},
    arrow: {width:'10%', height:80, alignItems:'center', justifyContent:'center'},
    row:{
        width:'100%',
        borderRadius:6,
        backgroundColor:appColors.white,
        flexDirection:'row',
        marginBottom:12
    },
})

export default Track