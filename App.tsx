import React, {useCallback} from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet } from 'react-native';
import Welcome from './src/screens/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { AppTabs } from './src/navigation/Navigation';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider  } from 'react-native-paper';
import colors from './src/services/appColors';
import Login from './src/screens/auth/Login';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: colors.prussian_blue
  }
}

const App = () => {

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

  return(
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Login />
        </PaperProvider>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1},
})

export default App;