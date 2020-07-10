import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { Alert } from 'react-native';
import React, { useContext, useEffect } from 'react';
import AuthContext from '../auth/context';
import _ from 'lodash';
// import React from 'react'

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    function onAuthStateChanged(data) {
        console.log(data);
        if (data) {
            firestore().collection('users').doc(data.uid).get().then(resp => {
                const userData = resp._data;
                if (userData) {
                    let userObj = _.pick(userData, ['email', 'name', 'userType', 'image']);
                    userObj.image = data.photoURL;
                    setUser(userObj);
                }
            }).catch(() => {
                setUser(null);
                alert("Unkown login error occured!");
            })
        } else {
            setUser(null);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [])

    const loginUser = ({ email, password }, actions) => {

        auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.log(error)
                if (error.code == 'auth/invalid-email') return alert("Invalid Email address or password");
                if (error.code == 'auth/user-not-found') return alert("There is no user corresponding to the email address.");
                if (error.code == 'auth/wrong-password') return alert("Invalid Email address or password.");
            }).finally(() => {
                actions.setSubmitting(false);
            });
    }

    const logOutUser = () => {
        auth().signOut()
            .then(() => {
                setUser(null);
            });
    }

    const registerUser = ({ name, email, password, userType }, actions) => {
        const userCollection = firestore().collection('users');
        auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                userCollection.doc(uid).set({ name, email, userType }).then(() => {
                    onAuthStateChanged(response.user);
                })
                    .catch(error => {
                        alert("Sorry unkown error occured");
                    }).finally(() => {
                        actions.setSubmitting(false);
                    })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert(
                        "Registration Failed!",
                        `That email address is already in use!`
                    );
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert(
                        "Registration Failed!",
                        `That email address is invalid!`
                    );
                }
            })

    }



    return { user, setUser, registerUser, loginUser, logOutUser }


}
