import React from 'react';
import {useState} from 'react';
import { ImageBackground,StyleSheet,Image,Button, Text, View,Alert} from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppPasswordTextInput from '../components/AppPasswordTextInput';
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
    const [phoneNumber, setPhoneNumber] = useState;
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
    return (

        <ImageBackground 
                   
                   source = {require("../assets/WCP.jpg")}
                   style = {styles.background}
        >
            <View style={styles.view}>
    {/* <Screen style = {styles.container}> */}
        <Image style = {styles.logo} source = {require("../assets/Logo111.png")}/>
        <AppTextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "full-name"
            icon = "account"
            placeholder = "Full Name"
            textContentType = "fullName"
            secureTextEntry 
            onChangeText = {text => setFullname(text)}
            style={styles.textInput}
        />
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
            onChangeText = {text => setPassword(text)}
            style={styles.textInput}
        />
        <AppTextInput
            autoCapitalize= 'none'
            autoCorrect = {false}
            keyboardType = "phone_number"
            icon = "phone"
            placeholder = "Phone Number"
            textContentType = "phoneNumber"
            secureTextEntry 
            onChangeText = {text => setPhonenumber(text)}
            style={styles.textInput}
        />

        <AppButton title =  "Register" style={styles.Registerbutton} onPress={

                    () => {
                    navigation.navigate("Login");
                }

        }
        />

        <PopUp popUpVisible={popUpVisible}  setPopUpVisible={setPopUpVisible} popUpText={popUpText} />
        
        {/* <Button title =  "Register" onPress={RegisterUser}/> */}

        <Text style={styles.loginText} >Registered Already?</Text>
        <Text onPress={() => navigation.navigate("Login")} style={styles.loginText} >Login</Text>
        
    {/* </Screen> */}
    </View>
    </ImageBackground>
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
        marginTop: -150,
        marginBottom:50,
    },
    textInput:{
        width:250,
        height:10,
        
        alignSelf:'center',
        marginTop: 10,
        marginBottom:10,
    },
    loginText: {
        color:"#FFFFFF",
        fontSize:16, 
    },
    view: {
        flex: 1,
        alignItems:'center',
        justifyContent: "center"
    },
    background:{
        flex:1,
        justifyContent: "flex-end",
        backgroundColor:"transparent",
        alignItems: "center"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    baseText: {
        fontFamily: "Cochin"
    },
    loginbutton:{
        color: "black",
        backgroundColor:"black",
       
        flex: 1,
        justifyContent: "center"
    },
    
})


export default RegisterScreen;