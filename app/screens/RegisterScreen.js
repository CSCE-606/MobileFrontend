import React from 'react';
import {useState} from 'react';
import { StyleSheet,Image,Button, Alert} from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import PopUp from '../components/Popup';
import {authentication, db} from "../../firebase";
import * as Notifications from 'expo-notifications';
import { collection, addDoc } from "firebase/firestore"; 
import {  createUserWithEmailAndPassword } from "firebase/auth";

function RegisterScreen({navigation}) {
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpText, setPopUpText] = useState();
    // const [useracc,setUser] = useState();
    const RegisterUser = async(e) => {
        e.preventDefault();
        
        if(!email || !password){
            setPopUpText('Please enter a valid password or email');
        }

        let user;

        try{
          const createUserRes = await createUserWithEmailAndPassword(authentication, email, password);
    
            if (createUserRes.user)
            {  
            user= createUserRes.user;
            }
        }catch(error)
        { 
            const errorCode = error.code;
            const errorMessage = error.message;

           Alert.alert(errorMessage);
        }
        // setPopUpText("Register Successful. Please go back to Login page.");
        // setPopUpVisible(true);
    
   
            try {
                let docRef;
                const expoPushToken = await Notifications.getExpoPushTokenAsync({
                    experienceId: '@username/example',
                    development: true
                  });

                  console.log(expoPushToken.data);
                
                if (user){
                    console.log(user);
                    console.log(user.email);
                    console.log('uid', user.uid);
                    docRef = await addDoc(collection(db, "users"), {
                    email: user.email,
                    name: user.email,
                    uid: user.uid,
                    friendList: [],
                    pushToken: [expoPushToken.data]
                });
            }
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
    }
    return (
    <Screen style = {styles.container}>
        <Image style = {styles.logo} source = {require("../assets/Ping_logo.png")}/>
        <AppTextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "email-address"
            icon = "email"
            placeholder = "Email"
            textContentType = "emailAddress"
            onChangeText = {text => setEmail(text)}
        />
        <AppTextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "email-address"
            icon = "lock"
            placeholder = "Password"
            textContentType = "password"
            secureTextEntry 
            onChangeText = {text => setPassword(text)}
        />
        <PopUp popUpVisible={popUpVisible}  setPopUpVisible={setPopUpVisible} popUpText={popUpText} />
        
        <Button title =  "Register" onPress={RegisterUser}/>
        
    </Screen>
  )
};

const styles = StyleSheet.create({
    container: {
        padding:10
    },
    logo:{
        width:230,
        height:230,
        
        alignSelf:'center',
        marginTop: 10,
        marginBottom:20,
    },
    
})


export default RegisterScreen;