import { SET_MESSAGES} from './actionTypes';
import { uiStartLoading, uiStopLoading
 } from "./index";


export const sendMessage = (message, userName) => {

     return dispatch => {

      dispatch(uiStartLoading());
        const messageData = {
                            message: message,
                            userName: userName

                        };
         fetch("YOUR_DATABASE_URL", {
                            method: "POST",
                            body: JSON.stringify(messageData)

                    })
                    .catch(err => {
                        console.log(err);
                        alert("Something went wrong, please try again!");
                      dispatch(uiStopLoading());
                    })
                    .then(res => res.json())
                    .then(parsedRes => {

                       dispatch(getMessages());
                        dispatch(uiStopLoading());
                    });
      }
     };

export const imagePicked = (pickedImage, userName) => {
return dispatch => {
 dispatch(uiStartLoading());
fetch("WRITE_THE_URL_YOU_GET_FROM_FIREBASE_DEPLOY", {
                method: "POST",
                body: JSON.stringify({
                    image: pickedImage.base64
                })
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                const ImageData = {

                    userName: userName,
                    pickedImage: parsedRes.imageUrl


               };

               return fetch("YOUR_DATABASE_URL", {
                    method: "POST",
                    body: JSON.stringify(ImageData)
                })
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(getMessages());
               dispatch(uiStopLoading());
            });
};
};


export const getMessages = () =>
{
  return dispatch => {
  dispatch(uiStartLoading());
     return fetch(
          "YOUR_DATABASE_URL"

        )
       .catch(err => {
                                console.log(err);
                                alert("Something went wrong, please try again!");
                               dispatch(uiStopLoading());
                            })
                            .then(res => res.json())
                            .then(parsedRes => {

                                const messages = [];
                                        for (let key in parsedRes) {
                                          messages.push({
                                            ...parsedRes[key],

                                            key: key
                                          });

                                          }

                                        dispatch(setMessages(messages));
                                dispatch(uiStopLoading());
                            }).catch(err => {
                                                                    alert("Something went wrong, sorry :/");
                                                                     console.log(err);
                                                                     dispatch(uiStopLoading());
                                                                   });

    };
    };


export const setMessages = messages => {
  return {
    type: SET_MESSAGES,
    messages: messages
  };
};
