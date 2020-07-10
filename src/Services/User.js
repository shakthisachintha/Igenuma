import firestore from '@react-native-firebase/firestore';


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

export default { registerUser };