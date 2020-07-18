import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { Alert } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/context';
import _ from 'lodash';
import { ErrorHandler } from '../components';
import { uploader } from '../api/storage';


export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    function onAuthStateChanged(data) {
        setIsLoading(true);
        if (data) {
            firestore().collection('users').doc(data.uid).get().then(resp => {
                const userData = resp._data;
                if (userData) {
                    setIsLoading(false);
                    let userObj = _.pick(userData, ['email', 'name', 'userType', 'image']);
                    userObj.image = data.photoURL;
                    userObj.id = data.uid;
                    setUser(userObj);
                }
            }).catch(() => {
                setIsLoading(false);
                alert("Unkown login error occured!");
                setUser(null);
            })
        } else {
            setIsLoading(false);
            setUser(null);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);


    const changePassword = async (currentPassword, newPassword) => {
        try {
            const provider = firebase.auth.EmailAuthProvider
            const authCredential = provider.credential(user.email, currentPassword);
            const result = await firebase.auth().currentUser.reauthenticateWithCredential(authCredential)
            if (result.user) {
                await auth().currentUser.updatePassword(newPassword);
                alert("Password successfully changed!");
            };
        } catch (error) {
            if (error.code == 'auth/wrong-password') return alert("Current password is incorrect.");
            if (error.code == 'auth/weak-password') return alert("New password is not strong enough");
            else {
                ErrorHandler(error);
            }
        }
    }

    const updateUser = async (data) => {
        try {
            const result = await firestore().collection("users").doc(user.id).update({
                name: data.name
            })
            setUser({ ...user, ...data });
        } catch (error) {
            ErrorHandler(error);
        }
    }

    const loginUser = async ({ email, password }) => {
        setIsLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            if (error.code == 'auth/invalid-email') return alert("Invalid Email address or password");
            if (error.code == 'auth/user-not-found') return alert("There is no user corresponding to the email address.");
            if (error.code == 'auth/wrong-password') return alert("Invalid Email address or password.");
        }

    }


    const logOutUser = async () => {
        setIsLoading(true);
        try {
            await auth().signOut();
            setIsLoading(false);
            setUser(null);
        } catch (error) {
            alert("Error occured on logout");
            setIsLoading(false);
        }
    }

    const registerUser = ({ name, email, password, userType }, actions) => {
        setIsLoading(true);
        const userCollection = firestore().collection('users');
        auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                userCollection.doc(uid).set({ name, email, userType }).then(() => {
                    onAuthStateChanged(response.user);
                })
                    .catch(error => {
                        alert("Sorry unkown error occured");
                        setIsLoading(false);
                    })
            })
            .catch(error => {
                setIsLoading(false);
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

    const updatePhoto = async (uri, fileName, onSuccess = null) => {
        try {
            const successFunction = async (URL) => {
                const userData = {
                    photoURL: URL,
                };
                const result = await firebase.auth().currentUser.updateProfile(userData);
                onSuccess(URL);
                setUser({ ...user, image: URL });

            }
            uploader('Images/User/', uri, fileName, null, successFunction);
        } catch (error) {
            ErrorHandler(error);
        }
    }


    return { changePassword, user, setUser, registerUser, loginUser, logOutUser, isLoading, updatePhoto, updateUser }


}
