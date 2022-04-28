
import React, { useState, useEffect } from 'react';
import { View, Image,StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {getLocation} from "./Location";

console.log("teste", getLocation);

const App = () => {
  const [mapRegion, setmapRegion] = useState({
    latitude: 30.616701789744717,
    longitude:  -96.338583,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  console.log(`value of i is ${getLocation()}`);

  


  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
      >

        <Marker coordinate={mapRegion} title={'User Location'} >
          < Image
          
           source={{uri:"https://firebasestorage.googleapis.com/v0/b/curastone-74faf.appspot.com/o/cd654793-481e-48cb-b176-9f78baae7e75.jpg?alt=media&token=91a9ced6-594a-4193-9582-59b32c0ac8f7"}}
           style={{width: 50, height: 50, borderRadius : 1000, borderWidth: 3, borderColor: "blue"}}
           
          />
        </Marker>

      </MapView>
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});