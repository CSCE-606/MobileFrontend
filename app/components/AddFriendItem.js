import React, {useState}from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import AppText from './AppText';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getUser} from '../redux/usersReducer';
import { useSelector } from 'react-redux';

function AddFriendItem({ title, image,username }) {
    // const [popup,Setpopup]=useState(false)
    const [displayAlert, showAlert] = useState(false);
    const profileUser = useSelector(getUser);
    const showUsername = () =>{
        console.log("efew",username);
        console.log("efprofileuser", profileUser);
        try {
            let docRef;
            if (user){
                docRef = await addDoc(collection(db, "users"), {
                email: user.email,
                username: user.email,
                uid: user.uid,
                friendList: [],
                friendRequests: [],
                pushToken: [expoPushToken.data]
            });
        }
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return(
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={image} />
            </View>
            <AppText style={styles.title}>{title}</AppText>
            <Button  title ="Add Friend"
                     onPress={showUsername}
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