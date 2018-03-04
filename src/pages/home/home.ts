import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import {AuthProvider} from '../../providers/auth/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userProfile: any = null;
  icons:string = 'log-in'; //string to keep track of which icon is showing
  constructor(public navCtrl: NavController, public authProvider:AuthProvider) {
    //Set up a listener for the when the AuthState changes (Login/Logout) and perform some action.
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
      } else { 
          this.userProfile = null;
      }
    });
  }

    googleLogin(){
      this.authProvider.googleLogin()
        .then(res => {
          //We have successfully logged in
          //Do something with the response 
        })
    }
    facebookLogin(){
      this.authProvider.facebookLogin()
        .then(res => {
          //We have successfully logged in
          //Do something with the response 
        })
    }

  

}
