//import { withStyles } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

//import colors from "../config/colors";

function ListItem({ title, subTitle, image }) {

    return(
        <view style={styles.container}>
            <Image style={styles.image} source={image} />

            <view>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </view>
        </view>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    },

    title: {
        fontWeight: "500",
    },

    subTitle: {
        color: "#bbb",
    }
})


export default ListItem;