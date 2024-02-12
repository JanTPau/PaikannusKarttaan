import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'

export default function Map() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    (async() => {
      getUserPosition()
    })()
  },  [])

  const getUserPosition = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync()

    try {
      if (status !== 'granted') {
        console.log('Geolocation failed')
        return
      }
      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
