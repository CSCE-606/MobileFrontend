import React, {useEffect, useState} from 'react';
import { ImageBackground, View, Text, Image, StyleSheet, Button, SafeAreaView,ScrollView, Alert } from 'react-native';
import { addDoc, query, collection, where, getDocs, orderBy, startAt, endAt, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import {db} from '../../firebase';
import AppText from "../components/AppText";
import AppButton from '../components/AppButton';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import NotificationPopup from '../components/NotificationPopup';

import { Notification } from '../api/Notification';
import {setUserRedux} from '../redux/usersAction';
import {connect} from 'react-redux';
import { useSelector } from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';
import {getUser} from '../redux/usersReducer';


function FriendList({navigation}, props) {

  // temp state
  // ---start---

  const [friendRequest, setFriendRequest] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [isSwitchEnabled, toggleSwitch] = useState(false)
  // const [App, setAppList] = useState([]);
  const userRef = collection(db,'users');

  const [userId, setUserId] = useState();
  // ---end---

  // onsnapshot test
  // ---start---

  const profileUser = useSelector(getUser);   // popup123@gmail.com
  
  const q = query(collection(db, "users"), where("email", "==", profileUser));
 
  const onChangeDB = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        //console.log("New city: ", "sucss");
        
      }
      if (change.type === "modified") {
         // console.log("Modified city: ", change.doc.data().friendList);
          setFriendList(change.doc.data().friendList)
          setFriendRequest(change.doc.data().friendRequests)
          
      }
      // if (change.type === "removed") {
      //     console.log("Removed city: ", change.doc.data());
      // }
      
    });
  });
  // ---end---

 

  const listFriend = async() => {
    const userQ = query(userRef, where("email","==",profileUser)); 
    const querySnapShot = await getDocs(userQ);

    let friendLists = [];
    let friendRequests = [];
  
    querySnapShot.forEach((doc) => {
      friendLists = doc.data().friendList;
      friendRequests = doc.data().friendRequests;
     
      setUserId(doc.id);
    })
    
    setFriendRequest(friendRequests);
    
    //console.log('friendlist', friendLists);
    const pushTokenQ = query(userRef, where("email","in",friendLists));
    let tokenSnapShot;
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
      const email = doc.data().email;
      
      friends.push({
        username,
        pushToken,
        email
      })
    })
    setFriendList(friends);
  };

  useEffect(() => 
  {
    // console.log("testz");
    listFriend();
    console.log('frinedz list', friendList);
    onChangeDB();
  }
  ,[props])

  const handleAddition = async(data) => {
    // data is email
    const newList = friendRequest.filter(f => f !== data);
    const newFriendList = [...friendList];
    setFriendRequest(newList);


    // sync friendlist for the pp who initiate the request
    const snapshotOrigin = query(userRef,where('username', '==', data));
    const userDocOrigin=await getDocs(snapshotOrigin);
    let idOrigin;
  
    userDocOrigin.forEach((doc) => {
        
      res=doc.data();
      idOrigin = doc.id
      const username = doc.data().username;
      const pushToken = doc.data().pushToken;
      const email = doc.data().email;

      newFriendList.push({
        username,
        pushToken,
        email
      })

    });
      
    const docRefOrigin = doc(db, "users", idOrigin);
      await updateDoc(docRefOrigin,{
          friendList: arrayUnion(profileUser)
      })
    
    
    setFriendList(newFriendList);
    console.log("Test newFriendList:", newFriendList);
    
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef,{
      friendRequests: newList,
      friendList: arrayUnion(data)
    })
  }

  const handlePopupDeletion = async(data) => {
    // Delete element and update inside the popup
    const newList = friendRequest.filter(f => f !== data);
    setFriendRequest(newList);

    const docRef = doc(db, "users", userId);
    await updateDoc(docRef,{
      friendRequests: arrayRemove(data)
    })
    
  }

  const handleDeletion = async(data) => {
    const newFriendList = friendList.filter(f => f.email !== data);
    setFriendList(newFriendList);
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef,{
      friendList: arrayRemove(data)
    })
    
  }
  //friendList.map((l, i) => {
  //console.log("friendList test:", friendList)
  //})
 
  return(

    <ImageBackground 
                   
    source = {require("../assets/wiguna.jpg")}
    style = {styles.background}
>
    
    <SafeAreaView style={styles.container}>
      
      <View>
        <View style={{left:340, top:40, position:'absolute' }}><NotificationPopup friendQueue={friendRequest} onAdd={handleAddition} onDelete={handlePopupDeletion} /></View>
        <ScrollView style={{top:100, width:360, height:520}}>
          {
            friendList.map((l, i) =>       
              (
              console.log("Friendlist Map test:", l),
              <ListItem
                key={i}
                title={l.username}
                email={l.email}
                onDelete={handleDeletion}
                image = {require("../assets/ahmed.jpg")}
                style={styles.ListItem}
                
              />)
            )
            
          }
        </ScrollView>

      </View>

    </SafeAreaView>
    </ImageBackground>

  );

        }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
      flexDirection: "row",
      padding: 15,
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
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    background:{
      flex:1,
      justifyContent: "flex-end",
      backgroundColor:"transparent",
      alignItems: "center"
     },
     ListItem:{
      height: 40,
      margin: 20,
      width: 200,
      borderWidth: 0,
      padding: 10,
      backgroundColor:"white",
      opacity:0.75
     },
  });

const mapStateToProps = (state) => {
  const { users } = state
  return { users }
};


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUserRedux,
  }, dispatch)
);

export default  connect(mapStateToProps, mapDispatchToProps)(FriendList);
