import React from 'react';
import {useState} from 'react';
import { StyleSheet,Image,Button} from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import PopUp from '../components/Popup';
import {authentication} from "../../firebase";
import {  createUserWithEmailAndPassword } from "firebase/auth";

function RegisterScreen({navigation}) {
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [modalVisible, setModalVisible] = useState(false);
    const RegisterUser = async(e) => {
        e.preventDefault();
        console.log(email,password);
        let user;
        try{
            const createUserRes = await createUserWithEmailAndPassword(authentication, email, password);
            user = createUserRes.user;
        }catch(error)
        { 
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode,errorMessage);
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
        <PopUp modalVisible={modalVisible}  setModalVisible={setModalVisible} />
        
        <Button title =  "Register" onPress={
          () => setModalVisible(true)
            }/>
        
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