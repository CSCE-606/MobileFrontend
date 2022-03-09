import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';


import ListItem from '../components/ListItem';

export function FriendList() {
    return(
        <View style={styles.container}>
            <View style={styles.listContainer} >
                <View style={styles.listElement}>
                    <Image
                        style={styles.image}
                        source={{
                            url: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png"
                        }}
                    />
                    <Text style={styles.textElement}>Friend 1</Text>
                </View>
                <View style={styles.listElement}>
                    <Image
                        style={styles.image}
                        source={{
                            url: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png"
                        }}
                    />
                    <Text style={styles.textElement}>Friend 2</Text>
                </View>
                <View style={styles.listElement}>
                    <Image
                        style={styles.image}
                        source={{
                            url: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png"
                        }}
                    />
                    <Text style={styles.textElement}>Friend 3</Text>
                </View>
                <View style={styles.listElement}>
                    <Image
                        style={styles.image}
                        source={{
                            url: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png"
                        }}
                    />
                    <Text style={styles.textElement}>Friend 4</Text>
                </View>
                
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Talk" style={styles.buttonElement} />
                <Button title="List" style={styles.buttonElement} />
                <Button title="Community" style={styles.buttonElement} />
                <Button title="Setting" style={styles.buttonElement} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        flex: 0.2,
        top: 150,
        alignContent: "stretch",
    },

    buttonElement: {
        flex: 0.25,
    },

    container: {
        flex: 1,
        backgroundColor: "#f9e955",
        alignItems: "center",
        justifyContent: "center",
    },

    listElement: {
        flexDirection: "row",
    },

    listContainer: {
        flex: 0.5,
        backgroundColor: "#f9e955",
        alignItems: "flex-end",
        right: 100,
        justifyContent: "space-evenly",
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    },

    textElement: {
       
    },

    userContainer: {
        marginVertical: 40,

    }
})


export default FriendList;