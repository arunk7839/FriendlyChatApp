import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  View
  } from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from "react-native-image-picker";
import validate from "./src/validation";
import { sendMessage,getMessages,imagePicked } from "./src/actions/index";
import MessageList from "./src/components/MessageList/MessageList";



 class App extends Component {

constructor(props) {
    super(props);
    this.props.onLoadMessages();
  }


  state = {

        pickedImage : null,
        message : "",
        userName :"Arun Kumar",
        validText : false

      };


imagePickerHandler = ()=>{
ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri , base64: res.data}
        });

this.props.onImagePicked(
    this.state.pickedImage,
    this.state.userName
    );

      }
    });

};

sendButtonHandler = ()=>
{

if (this.state.message.trim() === "") {
      return;
    }
    else {

    this.props.onSendMessage(
    this.state.message,
    this.state.userName
    );
this.setState({
message: "",
      validText : false
    });

   }
};


textChangedHandler = val=>{

this.setState({
      message: val,
      validText : validate(val)
    });
};

  render() {
let showProgressBar = null;


 if (this.props.isLoading) {
        showProgressBar = (
        <View style={styles.progressBar}>
        <ActivityIndicator size="large" color="#0000ff"/>
        </View>
        );
      }
      else
      {
      showProgressBar = (<MessageList
                         messages={this.props.messages}
                       />
                        );
      }


    return (
      <View style={styles.container}>

      {showProgressBar}

      <View style={styles.innerContainer}>

        <View>
                    <TouchableOpacity onPress={this.imagePickerHandler}>
                      <View >
                        <Icon

                          size={40}
                          name={ "md-image" }
                          color="#841584"
                        />
                      </View>
                    </TouchableOpacity>
        </View>

      <TextInput
      style={styles.textInput}
      onChangeText={this.textChangedHandler}>
      {this.state.message}
      </TextInput>

       <Button
              onPress={this.sendButtonHandler}
              title="Send"
              color="#841584"
              disabled={
                        !this.state.validText
                        }
              />

      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1

   },
  innerContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin:10

  },
  textInput: {
      width: "70%",
      borderColor: "transparent",
      padding: 8,
    },
    progressBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

      }

});

const mapStateToProps = state => {
  return {
    messages: state.message.messages,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSendMessage: (message, userName) =>
    dispatch(sendMessage(message, userName)),
    onImagePicked: (pickedImage, userName) =>
    dispatch(imagePicked(pickedImage, userName)),
    onLoadMessages: () => dispatch(getMessages())
  };
};

export default connect( mapStateToProps ,mapDispatchToProps)(App);

