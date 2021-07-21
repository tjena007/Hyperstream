import React, { Component } from 'react'
import {connect} from 'react-redux';
import { signIn,signOut } from '../actions';

export class GoogleAuth extends Component {
    state = {isSignedIn: null}

    componentDidMount(){
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId: '479194147766-viv0cgn6pavt5rjta30qlq96i8tf7l1s.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(); 
        }else{
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }
    // dont put parentheses after onSignout --> it'will be called as soon as the component is rendered

    renderAuth() {
        if(this.state.isSignedIn === null) {
            return null;
        }else if(this.state.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />Sign Out
                </button>
            )
        }else{
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                    <i className="google icon" /> Sign In with Google
                </button>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderAuth()}
            </div>
        )
    }
}

export default connect(null,{signIn,signOut})(GoogleAuth)
