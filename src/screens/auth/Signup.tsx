import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import colors from "../../services/appColors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, database } from "../../services/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../../services/appStyle";
import { addDoc, collection } from "firebase/firestore";

type Item = string;

const Signup: React.FC = (props) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [avatar] = useState(
    "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const initialItems: Item[] = [
    "Rock",
    "Jazz",
    "Heavy Metal",
    "Black Metal",
    "Pop",
    "Dance",
    "Trance",
    "R&B",
    "Classic",
  ];
  const [firstViewItems, setFirstViewItems] = useState<Item[]>(initialItems);
  const [secondViewItems, setSecondViewItems] = useState<Item[]>([]);

  const moveToSecondView = (item: Item) => {
    setFirstViewItems(firstViewItems.filter((i) => i !== item));
    setSecondViewItems([...secondViewItems, item]);
  };

  const moveToFirstView = (item: Item) => {
    setSecondViewItems(secondViewItems.filter((i) => i !== item));
    setFirstViewItems([...firstViewItems, item]);
  };



  const signupAction = async() => {
    setIsLoading(true);


    if (email !== "" && password !== "") {

      const user = await createUserWithEmailAndPassword(auth, email, password);

      const docRef = await addDoc(collection(database, "accounts"), {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        avatar: avatar,
        email:email,
        uid: user.user.uid,
        genres: secondViewItems
      });


    } else {
      Alert.alert("All inputs are require");
      setIsLoading(false);
    }
  };

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
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          keyboardType="default"
          placeholder="First name"
          style={styles.input}
        />

        <TextInput
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          keyboardType="default"
          placeholder="Last name"
          style={styles.input}
        />

        <TextInput
          value={mobile}
          onChangeText={(text) => setMobile(text)}
          keyboardType="phone-pad"
          placeholder="Mobile"
          autoCapitalize="none"
          style={styles.input}
        />

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

        <FlatList
          data={firstViewItems}
          renderItem={(itemRow) => (
            <TouchableOpacity
              onPress={() => moveToSecondView(itemRow.item)}
              style={styles.item}
            >
              <Text style={{ color: colors.white }}>{itemRow.item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `first_${index}`}
          numColumns={3}
          style={styles.list}
        />
        <FlatList
          data={secondViewItems}
          renderItem={(itemRow) => (
            <TouchableOpacity
              onPress={() => moveToFirstView(itemRow.item)}
              style={styles.itemSec}
            >
              <Text style={{ color: colors.white }}>{itemRow.item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `second_${index}`}
          numColumns={3}
          style={styles.list}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.pink} />
        ) : (
          <TouchableOpacity style={styles.btn} onPress={signupAction}>
            <Text style={styles.btn_txt}>Sign Up</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("login");
          }}
          style={styles.outline_btn}
        >
          <Text style={styles.outline_btn_txt}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

export default Signup;
