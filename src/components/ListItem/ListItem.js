import React , { Component }from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class ListItem extends Component {

render(){

let chatMessage = null;
 if (this.props.obj.hasOwnProperty("pickedImage")) {
      chatMessage = (
<View style={styles.innerContainer}>
          <Image  source={{uri: this.props.obj.pickedImage}} style={styles.image} />
              <Text style={styles.userName}>{this.props.obj.userName}</Text>
</View>
      );
    }
    else {
    chatMessage = (
<View style={styles.innerContainer}>
             <Text style={styles.message}>{this.props.obj.message}</Text>
                  <Text style={styles.userName}>{this.props.obj.userName}</Text>
</View>
          );
    }

return(


    <View style={styles.container}>

      {chatMessage}

    </View>

);
}
}


const styles = StyleSheet.create({
  container: {
      width: "100%",
  },
  innerContainer: {
      marginTop: 10,
      padding :10
    },
  image: {
      height: 300,
      width: 300
  },
  userName: {
      fontSize: 16,
    },
  message: {
       fontSize: 22,
       fontWeight: "bold",
       color: 'black'
        }
});

export default ListItem;
