import React, { useState, useEffect } from 'react';
import { View, Image,StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { addDoc, query, collection, where, getDocs, orderBy, startAt, endAt, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import {db} from '../../firebase';
import {connect} from 'react-redux';
import { useSelector } from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';
import {getUser} from '../redux/usersReducer';


const Map = () => {
  
  const [userId, setUserId] = useState();
  const [location, setLocation] = useState( {latitude: 15.616701789744717,
    longitude:  -100.338583,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,});
  const [errorMsg, setErrorMsg] = useState(null);

  const profileUser = useSelector(getUser);   

  const q = query(collection(db, "users"), where("email", "==", profileUser));


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
      const longitudeDelta= 0;


      setLocation({latitude,
        longitude,latitudeDelta,longitudeDelta});
  

      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setUserId(doc.id);
      })
      const docRef = doc(db, "users", userId)
  
      await updateDoc(docRef,{
      geoLocation: location
            })
        
    })();
  }, []);
  
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } 

  



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