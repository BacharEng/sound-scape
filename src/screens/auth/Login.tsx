import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import colors from "../../services/appColors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {auth} from '../../services/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const loginAction = () => {
    if(email !== "" && password !== ""){
        signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            Alert.alert(err.message)
        })
    } else {
        Alert.alert("All inputs are require")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <MaterialCommunityIcons
          color={colors.pink}
          size={60}
          name="music-clef-treble"
        />
        <Text style={styles.title}>SoundScape</Text>
      </View>

      <View style={styles.form_container}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          placeholder="Email address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
          style={styles.input}
        />

        <TouchableOpacity style={styles.btn} onPress={loginAction}>
          <Text style={styles.btn_txt}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn_txt: {
    fontFamily: "Raleway-Medium",
    fontSize: 20,
    color: colors.white,
  },
  btn: {
    backgroundColor: colors.pink,
    borderRadius: 12,
    padding: 12,
    width: "100%",
    fontSize: 18,
    alignItems: "center",
  },
  form_container: {
    width: "100%",
    marginTop: 30,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    width: "100%",
    fontSize: 18,
    fontFamily: "Raleway-Medium",
    marginBottom: 12,
  },
  logo_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
    justifyContent: "center",
    backgroundColor: colors.celeste,
  },
  title: {
    color: colors.prussian_blue,
    marginLeft: -14,
    fontSize: 40,
    fontFamily: "Lobster-Regular",
  },
});

export default Login;
