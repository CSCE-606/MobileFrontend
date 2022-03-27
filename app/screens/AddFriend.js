import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView, Alert, TextInput, } from 'react-native';
import AppText from "../components/AppText";
import AppButton from '../components/AppButton';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import {authentication} from "../../firebase";
function AddFriend({navigation}) {
    const [username, setUserName]= useState();
    const listAllUsers = (nextPageToken) => {
        console.log("listAllUsers")
        // List batch of
        authentication
          .listUsers(1000, nextPageToken)
          .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
              console.log('user', userRecord.toJSON());
            });
            if (listUsersResult.pageToken) {
              // List next batch of users.
              listAllUsers(listUsersResult.pageToken);
            }
          })
          .catch((error) => {
            console.log('Error listing users:', error);
          });
      };
      // Start listing users from the beginning, 1000 at a time.
     
      
    return(

<SafeAreaView style={styles.container}>
    <View>
    <Text>UserName</Text>    
      <Button
        title="Search"
        onPress={() => listAllUsers()
        }
      />
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={username}
        placeholder="username"
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

        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
     },
      
  });
  
export default AddFriend;