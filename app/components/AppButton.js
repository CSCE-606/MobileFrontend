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
        backgroundColor: '#20b2aa',
        justifyContent: 'center',
        alignItems: 'center',
        padding:15,
        width:"100%",

    },
    text :{
        color:"#fff0f5",
        fontSize:18,
        textTransform: "uppercase",
        fontWeight:"bold",
    }

})
export default AppButton;