import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView,ScrollView, Alert } from 'react-native';
import { addDoc, query, collection, where, getDocs, orderBy, startAt, endAt, doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
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

  // temp state
  // ---start---

  const [friendRequest, setFriendRequest] = useState([]);
  // ---end---

  // onsnapshot test
  // ---start---

  const profileUser = useSelector(getUser);   // popup123@gmail.com
  
  const q = query(collection(db, "users"), where("username", "==", profileUser));
 
  const onChangeDB = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New city: ", change.doc.data());
      }
      // if (change.type === "modified") {
      //     console.log("Modified city: ", change.doc.data());
      // }
      // if (change.type === "removed") {
      //     console.log("Removed city: ", change.doc.data());
      // }
    });
  });
  // ---end---

  const [friendList, setFriendList] = useState([]);
  const userRef = collection(db,'users');

  const [userId, setUserId] = useState();

  const listFriend = async() => {
    const userQ = query(userRef, where("username","==",profileUser)); 
    const querySnapShot = await getDocs(userQ);

    let friendLists = [];
    let friendRequests = [];
  
    querySnapShot.forEach((doc) => {
      friendLists = doc.data().friendList;
      friendRequests = doc.data().friendRequests;
     
      setUserId(doc.id)
    })
    

    setFriendRequest(friendRequests);  
    
    console.log('friendlist', friendLists);  
    const pushTokenQ = query(userRef, where("username","in",friendLists));
    let tokenSnapShot 
    try{
      tokenSnapShot  = await getDocs(pushTokenQ);
    }catch(err)
    {
      cosnole.log(err);
    }

    //console.log(pushTokenQ, "this is pushTokenQ")
    const friends = []
    tokenSnapShot.forEach((doc) => {

      const username = doc.data().username;
      const pushToken = doc.data().pushToken;
      
      friends.push({
        username,
        pushToken
      })
    })

    //setFriendList(friends);
    setFriendList(friendLists);
  }


  useEffect(() => 
  {
    // console.log("testz");
    onChangeDB();
    listFriend();
  }
  ,[])

  handleAddition = async(data) => {
    const newList = friendRequest.filter(f => f !== data);
    const newFriendList = [...friendList];
    setFriendRequest(newList);

    newFriendList.push({data})
    setFriendList(newFriendList);
    
   
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef,{
      friendRequests: newList,
      friendList: arrayUnion({username: data})
    })
  }

  handleDeletion = async(data) => {
    const newList = friendRequest.filter(f => f !== data);
    setFriendRequest(newList);

    const docRef = doc(db, "users", userId)
    await updateDoc(docRef,{
      friendRequests: newList
    })
  }
  
  return(
    
<SafeAreaView style={styles.container}>
   

    
    <View>
      
      <View style={{left:300, top:-70, position:'absolute' }}><NotificationPopup friendQueue={friendRequest} onAdd={handleAddition} onDelete={handleDeletion} /></View>
    <ScrollView style={{top:-10, width:360, height:520}}>
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
   </ScrollView> 
      <Button
        title="Add Friend"
        onPress={() => 
        navigation.navigate("AddFriend")
        }
      />
    </View>

    <View>
    
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
