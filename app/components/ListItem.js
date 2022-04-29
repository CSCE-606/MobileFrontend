import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, Button, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppText from './AppText';

function ListItem({ title, image, pushToken }) {
  const [isSwitchEnabled, toggleSwitch] = useState(false)
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
             <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isSwitchEnabled}
       ></Switch>
       {console.log("username",title)}
        
                <Image style={styles.image} source={image} />
                <AppText style={styles.title}>{title}</AppText>
            </View>

            <Icon name='bell' size={20} color="blue" onPress={sendPushToken} />    
          
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