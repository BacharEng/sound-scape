import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../services/appColors';
import Ionicons from "react-native-vector-icons/Ionicons";

const Dashboard = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:colors.celeste},
    title:{color:'#ffffff', fontSize:50, fontFamily:'Lobster-Regular'},
})

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