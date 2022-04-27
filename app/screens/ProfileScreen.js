import React, {useState}  from 'react';
import { FlatList, StyleSheet, TextInput, Text, bodyText, View, StatusBar, Platform, SafeAreaView } from 'react-native';
import AppTextInput from '../components/AppTextInput';

function ProfileScreen(props) {
    const [editable, setEditable] = useState(false);
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState('Male');
    const [birthday, setBirthday] = useState();

    return (
    <SafeAreaView>
    <View style={styles.view}>
      <Text>username</Text>
      <TextInput
          style={styles.input}
          onChangeText = {setUserName}
        />
    </View>
    {/* <View style={styles.view}>
      <Text>email</Text>
      <TextInput
          style={styles.input}
       
        />
    </View>
    <View style={styles.view}>
      <Text>Test</Text>
      <TextInput
          style={styles.input}
       
        />
    </View>
    <View style={styles.view}>
      <Text>Test</Text>
      <TextInput
          style={styles.input}
       
        />
    </View> */}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
        height: 100,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderRadius: 10,
        shadowColor: "grey",
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        height: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#f9e955',
        
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
      },
    head: {
        alignItems: "center",
        backgroundColor: "orange",
        height:30,
    }

})


export default ProfileScreen;