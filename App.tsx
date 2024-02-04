import React, {useCallback, useEffect, useState} from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppTabs, AuthStack } from './src/navigation/Navigation';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider  } from 'react-native-paper';
import colors from './src/services/appColors';
import { auth } from './src/services/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: colors.prussian_blue
  }
}

const App = () => {

  const [isUser, setIsUser] = useState(false);

  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Light": require("./assets/fonts/Raleway-Light.ttf"),
    "Raleway-Medium": require("./assets/fonts/Raleway-Medium.ttf"),
    "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
    "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf")
  })
  
  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded])
  
  if(!fontsLoaded){
    return null
  }

  const handleAuthStateChange = async(authUser) => {
    if(authUser){
      setIsUser(true)
    } else {
      setIsUser(false)
    }
  } 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return unsubscribe;
  },[])


  return(
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          {
            isUser ? (<AppTabs />) : (<AuthStack />)
          }
        </PaperProvider>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1},
})

export default App;