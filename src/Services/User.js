import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const registerUser = ({ name, email, password, userType }, actions) => {
    const userCollection = firestore().collection('users');
    auth().createUserWithEmailAndPassword(email, password).then(() => {
        alert("Logged in");
        userCollection.add({ name, email, userType }).
            then(snapshot => snapshot.get().
                then(user => console.log(user._data)));
        userCollection.onSnapshot()
    }).catch(error => {
        console.log(error);
    }).finally(() => {
        actions.setSubmitting(false);
    })
}

const resetPassword = async (email) => {
    try {
        await auth().sendPasswordResetEmail(email);
    } catch (error) {
        ErrorHandler(error);
    }
}

export { registerUser, resetPassword };