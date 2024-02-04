import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth } from '../../services/firebase-config'

const Settings = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Button onPress={() => auth.signOut()} title='Sign Out' />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#00cc99'},
    title:{color:'#ffffff', fontSize:50, fontFamily:'Lobster-Regular'},
})

export default Settings;