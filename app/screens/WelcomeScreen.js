import React from 'react';
import { Image, ImageBackground,StyleSheet,Text,View ,button} from 'react-native';
import AppButton from '../components/AppButton';
function WelcomeScreen(props) {

    return(
        <ImageBackground 
            source = {require("../assets/sponge.jpeg")}
            style = {styles.background}
        >
            <Text></Text>
            <Image style = {styles.logo} source = {require("../assets/Ping!.png")} />
            <AppButton title = "Login"/>
            <View style = {styles.RegisterButton}></View>
            
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
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