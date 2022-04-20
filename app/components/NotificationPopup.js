import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NotificationComponent} from './NotificationComponent';
import styles from '../config/styles';
import TipProvider from "react-native-tip";
import { Tip, showTip } from "react-native-tip";
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { Directions } from 'react-native-gesture-handler';

function NotificationPopup () {

    const [friendName, setFriendName] = useState("User")
    
    const [show, setShow] = useState(false);

    return(
        <View style={{top: -300, left: 300}}>
            
            <TouchableOpacity>
                <Icon name='bell' size={20} color="red" onPress={() => {setShow(true)}} />
            </TouchableOpacity>
           <ScrollView>
            <Modal transparent={true} visible={show}>
                <View style={{backgroundColor: '#000000aa', flex: 1}}>
                    <View style={{backgroundColor: '#ffffff', top: 100, left: 40, margin: 50, padding: 40, borderRadius: 10}}>
                        <Icon name='close' color="red" onPress={() => { setShow(false) }} size={20} style={{top: -30, left: 200}} />
                        <NotificationComponent />
                        <NotificationComponent />
                        <NotificationComponent />
                        <NotificationComponent />
                    </View>
                </View>
            </Modal>
            </ScrollView>
        
        </View>
    );
}

export default NotificationPopup