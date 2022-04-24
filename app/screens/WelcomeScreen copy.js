import React, { useState, useEffect } from 'react';
import { Image, ImageBackground,StyleSheet,Text,View } from 'react-native';
import AppButton from '../components/AppButton';

function WelcomeScreen({navigation}) {


    useEffect(()=> {
        setTimeout(()=>{
                    navigation.navigate('Login')
                },1000)//定时两秒后自动跳转到主页.

    },[])

    return(
        <ImageBackground 
           
            source = {require("../assets/WCP.jpg")}
            style = {styles.background}
        >z
           
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
    },
    buttonsContainer:{
        padding: 20,
        width:"100%",

    },
    logo: {
        width:230,
        height:230,
        position: "absolute",
        top: 70,
    },
    RegisterButton: {
        width:"100%" ,
        height:70,
        backgroundColor:'#87cefa',
    },
});
export default WelcomeScreen;