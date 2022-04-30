import React from 'react';
import { View, StyleSheet, Text, Image, Button} from 'react-native';

import AppText from './AppText';

function ListItem({ title, image, pushToken, onDelete, name }) {
   
    const sendPushToken = () => {
        console.log(pushToken);
        try{
            pushToken.forEach((token) =>{
            
                console.log("tokenzzz", token);
            fetch("https://exp.host/--/api/v2/push/send/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Accept-Encoding": "gzip, deflate",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: token,
              data: { extraData: "Some data in the push notification" , "_displayInForeground":true, 
            "shouldSetBadge":false, "shouldShowAlert": true},
              title: "Nihao!",
              body: "Nihao!",
            }),
          });
            });
          }
          catch(err){
            console.log('test err', err);
          }
    }

    return(
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={image} />
            </View>
            <Button title={'Send Notification'} onPress={sendPushToken}></Button>
            <Button title={'delete'} onPress={() => onDelete(title)}></Button>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.title}>{name}</AppText>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
     
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },

    title: {
        fontWeight: "500",
    },

})


export default ListItem;