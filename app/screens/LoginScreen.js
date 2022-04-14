import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View ,Image,Alert} from 'react-native';
import Screen from '../components/Screen';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import {authentication} from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {db} from '../../firebase';
import { collection, addDoc } from "firebase/firestore"; 




function LoginScreen({navigation}) {
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [user, setUser] = useState();

    const SignIn =  async() => {
        let user;
        
        try{
            user = await signInWithEmailAndPassword(authentication, email, password)
        }catch(error)   
        {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorMessage);
            console.log('login error')
            return false;
        };
        setUser(user);
        console.log('true');
        return true;
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

        <AppButton title =  "Login" onPress={
            navigation.navigate('Friend')
            /*
            async() => {
               const res = await SignIn();
               console.log('login',res);
                if (res == true)
                {
                    navigation.navigate('Friend');
                } else {
                    navigation.navigate('Login');
                }
                
            }
            */
        }
        />
        
    </Screen>
  );
 
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
    }
})

export default LoginScreen;