import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayer = ({ uri }) => {

  const [sound, setSound] = useState();



  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       { uri }, // Use the URI passed via props
       { shouldPlay: true }
    );
    setSound(sound);

    console.log('Playing');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  console.log(sound);
  console.log(uri);
  

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
