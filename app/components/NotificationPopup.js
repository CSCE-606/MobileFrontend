import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NotificationComponent} from './NotificationComponent';

function NotificationPopup () {

    // const [_showTip, setShowTip] = useState(false)
    const [friendName, setFriendName] = useState("User")

    return(
        <View>
            {/* <Tip
                id='notification'
                title={friendName+" send you a friend request"}
                body={ <NotificationComponent /> }
                showItemPulseAnimation
                pulseColor='#ff8080'
            >
        
                <TouchableOpacity
                    
                    onPress={() => {
                        _showTip && showTip('notification')
                        setShowTip(true)
                    }}
                    style={{ padding: 10, borderRadius: 50 }}
                >
                    <Icon name="heart" color='blue' size={35}/>
                </TouchableOpacity>
            </Tip> */}

        {/* <TipProvider
                    overlayOpacity={0.5}
                    titleStyle={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginBottom: 10
                    }}
                    bodyStyle={{
                        fontSize: 16
                    }}
                    tipContainerStyle={{
                        padding: 20,
                        borderRadius: 20,
                        maxWidth: 350,
                        elevation: 5
                    }}
                    // darkMode={isDarkMode}
                    prevNextTextStyle={{
                    }}
                    prevNextButtonStyle={{
                    }}
                /> */}
        
        
        
        
        
        </View>


    );
}

export default NotificationPopup