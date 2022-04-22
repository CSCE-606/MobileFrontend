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

import {connect} from 'react-redux';
import { useSelector } from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';
import {getUser} from '../redux/usersReducer';



export function FriendList({navigation}) {

  const profileUser = useSelector(getUser);
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
  {
    console.log("testz");
      // listFriend()
  }
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


const Listing = [
  {
    id: "Amy",
    Email: "aaa111@gmail.com",
    PhoneNumber: 8888888888,
  },
  {
    id: "Allen",
    Email: "ccc333@gmail.com",
    PhoneNumber: 6666666666,
  },
  {
    id: "Alex",
    Email: "bbb222@gmail.com",
    PhoneNumbe: 7777777777,
  },
  {
    id: "Andy",
    Email: "ddd444@gmail.com",
    PhoneNumbe: 5555555555,
  }
]

export default FriendList;