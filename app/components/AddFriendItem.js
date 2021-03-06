import React, {useState}from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import AppText from './AppText';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getUser} from '../redux/usersReducer';
import { useSelector } from 'react-redux';
import { addDoc, query, collection, where, getDocs, updateDoc, arrayUnion, arrayRemove, doc} from 'firebase/firestore';
import {db} from '../../firebase';
function AddFriendItem({ title, image,username }) {
    const [popup,Setpopup]=useState(false)
    const [displayAlert, showAlert] = useState(false);
    const profileUser = useSelector(getUser);

    const userRef = collection(db,'users');


    const showUsername = async() =>{
      
        var friendRequest=[]
        var newFriendRequest=[]
        friendRequest.push(username)

        const snapshot = query(userRef,where('username', '==', username));
        const userDoc=await getDocs(snapshot);
        let id;
        let res;
        let uName;
        
        const meSnapShot = query(userRef, where('email', '==', profileUser));
        const meDoc = await getDocs(meSnapShot);
        let meName;

        meDoc.forEach((doc) => {
            meName = doc.data().username;
        })

        userDoc.forEach((doc) => {    
            res=doc.data();
            id = doc.id
            uName = res.username;
        
            newFriendRequest=friendRequest.concat(meName);
        
        });

        const docRef = doc(db, "users", id);
            await updateDoc(docRef,{
                friendRequests: arrayUnion(meName)
            })
        
    }


    return(
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={image} />
            </View>
            <AppText style={styles.title}>{title}</AppText>
            <Button  title ="Add Friend"
                     onPress={() => showUsername()}
            />

            <View>

            

          <AwesomeAlert
          show={displayAlert}
          showProgress={false}
          title="AwesomeAlert"
          message="Do you really want to add ?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Yes"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {showAlert(false)
          }}
          onConfirmPressed={() => {showUsername();
          }}
        />





            
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
     
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },

    title: {
        fontWeight: "500",
    },

})


export default AddFriendItem;