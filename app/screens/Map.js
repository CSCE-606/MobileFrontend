
import React, { useState, useEffect } from 'react';
import { View, Image,StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';



const Map = () => {
  // const [mapRegion, setmapRegion] = useState({
    // latitude: 30.616701789744717,
    // longitude:  -96.338583,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  // });
  

  const [location, setLocation] = useState( {latitude: 15.616701789744717,
    longitude:  -100.338583,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,});
  const [errorMsg, setErrorMsg] = useState(null);
  console.log('tmd',location)


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let newlocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
                enableHighAccuracy: true,
                timeInterval: 5
      });
      const latitude = newlocation.coords.latitude;
      const longitude = newlocation.coords.longitude;
      const latitudeDelta = 0;


      setLocation({latitude,
        longitude,latitudeDelta});
        
   
    })();
  }, []);
  
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } 
  console.log('tnd',location)
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={location}
      >

        <Marker coordinate={location} title={'User Location'} >
 
        </Marker>

      </MapView>
    </View>
  );
};



export default Map;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});