import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView, Alert, TextInput, ScrollView} from 'react-native';
import AppText from "../components/AppText";
import AppButton from '../components/AppButton';
import AddFriendItem from '../components/AddFriendItem';
import Screen from '../components/Screen';
import {authentication} from "../../firebase";
import { addDoc, query, collection, where, getDocs, orderBy,startAt,endAt} from 'firebase/firestore';
import {orderByChild} from 'firebase/database';
import {db} from '../../firebase';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector } from 'react-redux';
import {getUser} from '../redux/usersReducer';

function AddFriend() {
    const [username, setUserName]= useState();
    const [PotentialFriendList,setPotentialFriendList] = useState([]);
    const [displayFriendList, updateDisplay] = useState(false);
    const profileUser = useSelector(getUser);
    const userRef = collection(db,'users');




    const searchUser = async () => {
      const q1 = query(userRef, orderBy('username'), startAt(username), endAt(username+"\uf8ff"));

      const PotentialFriends= await getDocs(q1);
      let tempPotentialFriendList= [];
      
      PotentialFriends.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempPotentialFriendList.push(doc.data());
        //console.log(doc.id, " => ", doc.data());
      });
      //console.log("friendlist",tempPotentialFriendList);
      setPotentialFriendList(tempPotentialFriendList);
      updateDisplay(true);
    };
    console.log("test potential friend lis --->", PotentialFriendList)
    return(

<SafeAreaView style={styles.container}>
    <View>
    <Text>UserName</Text>    
      <Button
        title="Search"
        onPress={() => searchUser()}
      />
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={username}
        placeholder="username"
      />
    <ScrollView>
      {displayFriendList ? 
        PotentialFriendList.map((l, i) => 
        (<AddFriendItem
             key={i}
             title={l.username}
             username={l.username}
           />
         )
     )
      : null}
    </ScrollView>
    </View>
    
      
        </SafeAreaView>

    );
};



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