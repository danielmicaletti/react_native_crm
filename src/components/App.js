
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import Login from './Login';
import Loader from './Loader';
import Navigation from './Navigation';
import reducers from '../reducers/PeopleReducer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

export default class App extends Component {

    state = {
        loggedIn: null
    }

    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyCPDNQKhXWruZbj4ePYXfCc7IC2sqkKgd4",
            authDomain: "crmproj-60e60.firebaseapp.com",
            databaseURL: "https://crmproj-60e60.firebaseio.com",
            projectId: "crmproj-60e60",
            storageBucket: "",
            messagingSenderId: "476136212909"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({loggedIn: true });
            }else{
                this.setState({loggedIn: false });
            }
        });
    }

    renderinitialView(){
        switch(this.state.loggedIn){
            case true:
                return <Navigation />
            case false:
                return <Login />;
            default:
                return <Loader size={'large'} />;
        }
    }

    render() {
        return (
            <Provider store={store}>
                {this.renderinitialView()}
            </Provider>
        );
    }
}


//   render() {
//     return (
//       <Provider store={store}>
//           <View style={styles.container}>
//             {this.renderInitialView()}
//           </View>
//       </Provider>
//     );
//   }
// }
