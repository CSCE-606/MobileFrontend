import React from 'react';
import { View,StyleSheet, Text, TouchableOpacity} from 'react-native';

function AppButton({title, onPress,color = '#20b2aa'}) {
    console.log('test it ')
    return (
        <TouchableOpacity style = {[styles.button,{backgroundColor:color}]} onPress = {onPress}>
    
            <Text style = {styles.text}>{title}</Text>

        </TouchableOpacity>
            
        
    );
}
const styles = StyleSheet.create({
    button:{
        borderRadius:25,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
<<<<<<< HEAD
        padding:15,
        width:"100%",
        marginVertical:10,
        
=======
        margin: 5,
        height: 30,
        width: 70,
>>>>>>> 7c29fda91b1d7391a5f13e123adfd64d2eccc688

    },
    text :{
        color:"#fff0f5",
        fontSize:12,
        textTransform: "uppercase",
        fontWeight:"bold",
    }

})
export default AppButton;