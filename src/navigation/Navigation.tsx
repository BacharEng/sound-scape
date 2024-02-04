//Tabs -> Dashboard | Settings | Genres | Playlist | Social

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../services/appColors";
import Dashboard, {screenOptions as DashboardScreenOption} from "../screens/dashboard/Dahsboard";
import Playlist from "../screens/playlist/Playlist";
import Social from "../screens/social/Social";
import Genres from "../screens/genres/Genres";
import Settings from "../screens/settings/Settings";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import Login, {screenOptions as LoginScreenOptions} from "../screens/auth/Login";
import Signup, {screenOptions as SignupScreenOptions} from "../screens/auth/Signup";

const DashboardStackNavigator = createNativeStackNavigator();
const PlaylistStackNavigator = createNativeStackNavigator();
const SocialStackNavigator = createNativeStackNavigator();
const GenresStackNavigator = createNativeStackNavigator();
const AuthStackNavigator = createNativeStackNavigator();

const defaultNavOptions = {
    headerStyle: {backgroundColor: colors.prussian_blue},
    headerTintColor: colors.gray,
    headerTitleStyle: {fontFamily:'Raleway-Medium', fontSize:18}
}

export const DashboardStack = () => {
  return (
    <DashboardStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <DashboardStackNavigator.Screen name="dashboard" component={Dashboard} options={DashboardScreenOption} />
      <DashboardStackNavigator.Screen name="settings" component={Settings}/>
    </DashboardStackNavigator.Navigator>
  );
};

export const PlaylistStack = () => {
  return (
    <PlaylistStackNavigator.Navigator>
      <PlaylistStackNavigator.Screen name="playlist" component={Playlist} />
    </PlaylistStackNavigator.Navigator>
  );
};

export const SocialStack = () => {
  return (
    <SocialStackNavigator.Navigator>
      <SocialStackNavigator.Screen name="social" component={Social} />
    </SocialStackNavigator.Navigator>
  );
};

export const GenresStack = () => {
  return (
    <GenresStackNavigator.Navigator>
      <GenresStackNavigator.Screen name="genres" component={Genres} />
    </GenresStackNavigator.Navigator>
  );
};

export const AuthStack = () => {
  return(
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name='login' component={Login} options={LoginScreenOptions} />
      <AuthStackNavigator.Screen name='signup' component={Signup} options={SignupScreenOptions} />
    </AuthStackNavigator.Navigator>
  )
}

const AppBottomTabs = createMaterialBottomTabNavigator();
export const AppTabs = () => {
  return (
    <AppBottomTabs.Navigator
      activeColor={colors.pink}
      inactiveColor={colors.celeste}
      barStyle={{ backgroundColor: colors.prussian_blue }}
    >
      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={30} name="space-dashboard" />
          ),
        }}
        name="dashboardTab"
        component={DashboardStack}
      />

      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "Playlist",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              size={30}
              name="playlist-music"
            />
          ),
        }}
        name="playlistTab"
        component={PlaylistStack}
      />

      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "Social",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} size={30} name="people" />
          ),
        }}
        name="socialTab"
        component={SocialStack}
      />
      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "Genres",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={30} name="library-music" />
          ),
        }}
        name="genresTab"
        component={GenresStack}
      />
    </AppBottomTabs.Navigator>
  );
};
