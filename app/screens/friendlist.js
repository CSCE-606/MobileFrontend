import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ListItem from "../components/ListItem";

export function FriendList() {
  const users = [
    {
      username: "liboyu"
    },
    {
      username: "wuyue"
    },
    {
      username: "wangfengyi"
    },
    {
      username: "kai"
    }
  ];
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {users.map((user, index) => (
          <View style={styles.listElement}>
            <ListItem
              title={user.username}
              image={require("../assets/fox.png")}
            />
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <AppButton title="Button1" />
        <AppButton title="Button2" />
        <AppButton title="Button3" />
        <AppButton title="Button4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",

    top: 150,
    flex: 0.05,
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1
  },

  container: {
    flex: 1,
    backgroundColor: "#f9e955",
    alignItems: "center",
    justifyContent: "center"
  },

  listElement: {
    flexDirection: "row"
  },

  listContainer: {
    flex: 0.5,
    backgroundColor: "#f9e955",
    right: 100,
    justifyContent: "space-evenly"
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },

  textElement: {},

  userContainer: {
    marginVertical: 40
  }
});

export default FriendList;
