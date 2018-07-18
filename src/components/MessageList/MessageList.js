import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";


const messageList = props => {

  return (
    <FlatList
      style={styles.listContainer}
      data={props.messages}
      renderItem={(info) => (
       <ListItem
                 obj={info.item}

               />
      )}
    />
  );
};


const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default messageList;
