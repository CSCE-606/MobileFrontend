import React from 'react';
import { View,StyleSheet, Text, TouchableOpacity} from 'react-native';

function AppButton({title, onPress}) {
    console.log('test it ')
    return (
        <TouchableOpacity style = {styles.button} onPress = {onPress}>
    
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
        margin: 5,
        height: 30,
        width: 70,

    },
    text :{
        color:"#fff0f5",
        fontSize:12,
        textTransform: "uppercase",
        fontWeight:"bold",
    }

})
export default AppButton;