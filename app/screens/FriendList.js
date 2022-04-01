import React from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView, Alert } from 'react-native';
import AppText from "../components/AppText";
import AppButton from '../components/AppButton';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
export function FriendList({navigation}) {
    return(

<SafeAreaView style={styles.container}>
    <View>
    
    {/* <View style={styles.listElement}>
                    <ListItem 
                        title = "Friend1"
                        image = {require("../assets/fox.png")}
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Button1" onPress={() => {createThreeButtonAlert}}/>
                    </View>
                </View>
         */}
      <Button
        title="Add Friend"
        onPress={() => 
        navigation.navigate("AddFriend")
        }
      />
    </View>


            

            
            
        </SafeAreaView>

    );
};


const createThreeButtonAlert = () =>
Alert.alert(
  "I need SpongeBob!",
  "I need SpongeBob",
  [
    {
      text: "Ask me later",
      onPress: () => console.log("Ask me later pressed")
    },
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
  
export default FriendList;
