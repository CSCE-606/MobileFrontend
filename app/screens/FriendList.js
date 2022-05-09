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
  

 
  const onChangeDB = () =>{
    const q = query(userRef, where("email", "==", profileUser));
    onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if(change) {
        setFriendRequest(change.doc.data().friendRequests)
        const listFriend = async() => {
          // The following is to put friendList to render
          let friend = [];
          let friendQuery = query(userRef, where("username", "in", change.doc.data().friendList));
          let friendSnapShot = await getDocs(friendQuery);
          friendSnapShot.forEach((doc) => {

            const username = doc.data().username;
            const pushToken = doc.data().pushToken;
            const email = doc.data().email;
            
            friend.push({
              username,
              pushToken,
              email
            })
          })
          setFriendList(friend);

        }
        listFriend();
      }
      
    });

  });
}
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
    
    // in order to set friendList, we need to have username, pushToken, and email
    const pushTokenQ = query(userRef, where("username","in",friendLists));
    let tokenSnapShot;
    try{
      tokenSnapShot  = await getDocs(pushTokenQ);
    }catch(err)
    {
      cosnole.log(err);
    }

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
    onChangeDB();

  }
  ,[props])
  
  const handleAddition = async(data) => {
    // deal with friendRequest list
    const newList = friendRequest.filter(f => f !== data);
    //setFriendRequest(newList);

    
    // deal with friendlist for both side user
    const newFriendList = [...friendList];
    
    const snapshotOther = query(userRef,where('username', '==', data));
    const userDocOther= await getDocs(snapshotOther);
    let idOther;

    userDocOther.forEach((doc) => {
      idOther = doc.id
 
      const username = doc.data().username;
      const pushToken = doc.data().pushToken;
      const email = doc.data().email;
  
      newFriendList.push({
        username,
        pushToken,
        email
      })

    });
    
    
    
    
    //setFriendList(newFriendList);
   
    
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef,{
      friendRequests: newList,
      friendList: arrayUnion(data)
    })

    const snapshot = query(userRef,where('email', '==', profileUser));
    const userDoc= await getDocs(snapshot);
    let nameUser;

    userDoc.forEach((doc) => { nameUser = doc.data().username; });

    // Wait until end to update other file
    const docRefOther = doc(db, "users", idOther);
      await updateDoc(docRefOther,{
          friendList: arrayUnion(nameUser)
      })
      console.log("What is data?", data)
      console.log("What is nameUser?", nameUser)
  }

  const handlePopupDeletion = async(data) => {
    // Delete element and update inside the popup
    const newList = friendRequest.filter(f => f !== data);
   // setFriendRequest(newList);

    const docRef = doc(db, "users", userId);
      await updateDoc(docRef,{
        friendRequests: newList
      })
    
  }

  const handleDeletion = async(data) => {
    const newFriendList = friendList.filter(f => f.username !== data);
    setFriendList(newFriendList);
    const docRef = doc(db, "users", userId)
      await updateDoc(docRef,{
        friendList: arrayRemove(data)
      })
    
  }
 
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
                <ListItem
                  key={i}
                  title={l.username}
                  email={l.email}
                  onDelete={handleDeletion}
                  image = {require("../assets/ahmed.jpg")}
                  style={styles.ListItem}
                  
                />
              )
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
