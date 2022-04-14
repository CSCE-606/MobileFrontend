import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView,ScrollView, Alert } from 'react-native';
import { addDoc, query, collection, where, getDocs, orderBy,startAt,endAt} from 'firebase/firestore';
import {db} from '../../firebase';
import AppText from "../components/AppText";
import AppButton from '../components/AppButton';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';

import NotificationPopup from '../components/NotificationPopup';

import { Notification } from '../api/Notification';


export function FriendList({navigation}) {



  const [friendList, setFriendList] = useState([]);
  const userName = "xiaosb3@gmail.com";
  const userRef = collection(db,'users');
  const listFriend = async() => {
  const userQ = query(userRef, where("username","==",userName)); 
  const querySnapShot = await getDocs(userQ);
  let friendList = [];
  querySnapShot.forEach((doc) => {
    friendList = doc.data().friendList;
    
  })
  console.log('friendlist', friendList);
  const pushTokenQ = query(userRef, where("username","in",friendList));
  let tokenSnapShot 
  try{
    tokenSnapShot  = await getDocs(pushTokenQ);
  }catch(err)
  {
    cosnole.log(err);
  }
  const friends = []
  tokenSnapShot.forEach((doc) => {
    
    const res = doc.data();
    const username = res.username;
    const pushToken = res.pushToken;
    friends.push({
      username,
      pushToken
    })
  })

  setFriendList(friends);
  }
  useEffect(() => 
      listFriend()
  ,[])

  return(

<SafeAreaView style={styles.container}>
   
    <NotificationPopup />

  
    <View>
      {console.log('fefe',friendList)}
    
    {
   friendList.map((l, i) => 
    
        
   (<ListItem
        key={i}
    
        title={l.username}
        pushToken={l.pushToken}
        image = {require("../assets/fox.png")}
      />
    )
)
   } 
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
