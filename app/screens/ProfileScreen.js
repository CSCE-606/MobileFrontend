import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, TextInput, Text, bodyText,CameraRoll, View, StatusBar, Platform, SafeAreaView } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import { useSelector } from 'react-redux';
import {getUser} from '../redux/usersReducer';
import { Avatar } from 'react-native-elements';
import { Icon } from '@rneui/themed';
import { ref, uploadBytes, getStorage } from "firebase/storage";
import {storage} from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import { Constants,Permissions } from 'expo';
import 'react-native-get-random-values';
import { uuid } from 'uuidv4';

function ProfileScreen(props) {
    const [editable, setEditable] = useState(false);
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState('Male');
    const [birthday, setBirthday] = useState();
    
    const [files, setFiles] = useState([]);
    const [avatarImage, setImage] = useState();
    const [uploading, setUploading] = useState(false);
    const metadata = {
        contentType: 'image/jpeg',
      };
     

    const onPress = async() => {

        // await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // await Permissions.askAsync(Permissions.CAMERA);


        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            setImage(result.uri);
          }

          try {
            setUploading(true);
      
            if (!result.cancelled) {
              const uploadUrl = await uploadImageAsync(result.uri);
              console.log('upload url', uploadUrl);
              setImage(uploadUrl);
            }
          } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
          } finally {
            setUploading(false);
          }

        //   const uploadTask = uploadBytes(storageRef, file, metadata); 
        };
    
    const uploadImageAsync = async(uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
          });
        
          console.log('before')

        //   const fileRef = ref(storage(), uuid());
          console.log('after')
          const result = await uploadBytes(storage,"test.jpg", blob);
          console.log('result', result);
          console.log("blob",blob);
          // We're done with the blob, close and release it
          blob.close();
        
          return await getDownloadURL(fileRef);
    }

  
  const profileUser = useSelector(getUser);
  console.log(profileUser);
    return (
    <SafeAreaView>
        <View style={{alignItems: 'center'}}>
        <Avatar
            rounded
            source={{
                uri:
                'https://cdn.landesa.org/wp-content/uploads/default-user-image.png',
            }}
            size="xlarge"
            >
                <Avatar.Accessory onPress={onPress}/>
            </Avatar>
            </View>
    <View style={styles.view}>
      <Text>username</Text>
      <TextInput
          style={styles.input}
          onChangeText = {setUserName}
        />
    </View>
    {/* <View style={styles.view}>
      <Text>email</Text>
      <TextInput
          style={styles.input}
       
        />
    </View>
    <View style={styles.view}>
      <Text>Test</Text>
      <TextInput
          style={styles.input}
       
        />
    </View>
    <View style={styles.view}>
      <Text>Test</Text>
      <TextInput
          style={styles.input}
       
        />
    </View> */}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
        height: 100,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderRadius: 10,
        shadowColor: "grey",
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        height: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#f9e955',
        
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
      },
    head: {
        alignItems: "center",
        backgroundColor: "orange",
        height:30,
    }

})


export default ProfileScreen;