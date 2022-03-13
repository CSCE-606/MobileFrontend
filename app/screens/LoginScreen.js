import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View ,Image,Alert} from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import axios from 'axios';

function LoginScreen({navigation}) {
    const [username, setUserName]=useState()
    const [password, setPassword]=useState()
    return (
    <Screen style = {styles.container}>
        <Image style = {styles.logo} source = {require("../assets/Ping_logo.png")}/>
        <AppTextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "default"
            icon = "email"
            placeholder = "Username"
            textContentType = "emailAddress"
            onChangeText = {text => setUserName(text)}
        />
        <AppTextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "default"
            icon = "lock"
            placeholder = "Password"
            textContentType = "password"
            secureTextEntry 
            onChangeText = {text => setPassword(text)}
        />

        <AppButton title =  "Login" onPress={async() => {
                console.log(`Username is ${username} and password is ${password}`)
                await axios.post(`http://192.168.192.152:3000/login?username=${username}&password=${password}`)
                navigation.navigate("Friend")
            }
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