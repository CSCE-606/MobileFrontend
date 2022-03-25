import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View ,Image,Alert} from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import auth from '@react-native-firebase/auth';

function LoginScreen({navigation}) {
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    console.log('email', email);
    console.log('password',password);

    // function onAuthStateChanged(user) {
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    //   }

    const onClick = async () => {

        console.log('test');
        console.log(email,password);

        const res = await auth().signInWithEmailAndPassword(email,password);
        console.log('auth res',res);
    }


    //   useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    //   }, []);
    
    //   if (initializing) return null;
    
    //   if (!user) {
    //     return (
    //       <View>
    //         <Text>Login</Text>
    //       </View>
    //     );
    //   }

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

        <AppButton title =  "Login" onPress={() => {

                onClick();
                // navigation.navigate("Friend")
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