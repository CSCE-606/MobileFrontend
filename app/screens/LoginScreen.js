import React from 'react';
import {useState} from 'react';
import { ImageBackground, StyleSheet, Text, View ,Image,Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Pressable} from 'react-native';

import Screen from '../components/Screen';
import {connect} from 'react-redux';

import AppTextInput from '../components/AppTextInput';
import AppPasswordTextInput from '../components/AppPasswordTextInput';
import AppButton from '../components/AppButton';
import {authentication} from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {db} from '../../firebase';
import { collection, addDoc } from "firebase/firestore"; 
import {setUserRedux} from '../redux/usersAction';
import {getUser} from '../redux/usersReducer';
import { bindActionCreators } from 'redux';


function LoginScreen({navigation,props}) {
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [user, setUser] = useState();

    
    const dispatch = useDispatch();

    const SignIn = async() => {
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
        console.log(user);
        console.log('useremail', user.user.email);
        setUser(user.user.email);
     
        dispatch(setUserRedux(user.user.email));
        return true;
    }
    


  
    return (
    
        <ImageBackground 
                   
                   source = {require("../assets/WCP.jpg")}
                   style = {styles.background}
        >
            <View style={styles.view}>
        <Image style = {styles.logo} source = {require("../assets/Logo111.png")}/>
        <AppTextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "email-address"
            icon = "email"
            placeholder = "Email"
            textContentType = "emailAddress"
            onChangeText = {text => setEmail(text)}
            style={styles.textInput}
        />

        <AppPasswordTextInput
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "default"
            icon = "lock"
            placeholder = "Password"
            textContentType = "password"
            value={password}
            enablesReturnKeyAutomatically
            onChangeText = {text => setPassword(text)}
            style={styles.textInput}
        />
     
        
        
        <AppButton title ="Login"
         onPress={async() => {  const res = await SignIn();

        if (res == true)
        {
        navigation.navigate('Home');
        } else {
        navigation.navigate('Login');
        }
        }
            
        } />
        
        {/* <AppButton title =  "Login" style={styles.loginbutton} onPress={
                 () => {
                 navigation.navigate("Friend");
             }
        
        }
        />    */}
        <Text style={styles.loginText} >Forgot Password?</Text>
        <Text onPress={() => navigation.navigate("Register")} style={styles.loginText} >Register</Text>
        </View>
        </ImageBackground>
  
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
        marginTop: -150,
        marginBottom:150,
    },
    loginbutton:{
        color: "black",
        backgroundColor:"black",
       
        flex: 1,
        justifyContent: "center"
        
    },
    background:{
        flex:1,
        justifyContent: "flex-end",
        backgroundColor:"transparent",
        alignItems: "center"
    }, 
    view: {
        flex: 1,
        alignItems:'center',
        justifyContent: "center"
    },
    textInput:{
        width:250,
        height:10,
        
        alignSelf:'center',
        marginTop: 10,
        marginBottom:10,
    },
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    loginText: {
        color:"#FFFFFF",
        fontSize:16, 

    }
});

const mapStateToProps = (state) => {
    const { users } = state
    return { users }
  };
  

  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      setUserRedux,
    }, dispatch)
  );

export default  connect(mapStateToProps, mapDispatchToProps)(LoginScreen);