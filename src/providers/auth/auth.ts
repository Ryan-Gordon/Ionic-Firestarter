import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';

import firebase from 'firebase';
import { environment } from '../../enviroments/enviroment';
import { Facebook } from '@ionic-native/facebook';
export const firebaseConfig = environment.firebaseConfig;
// Initialise firebase with our config variable
firebase.initializeApp(firebaseConfig);
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private googlePlus: GooglePlus, private facebook:Facebook) {
    console.log('Hello AuthProvider Provider');
  }
  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
  
        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            console.log("Firebase success: " + JSON.stringify(success)); 
          });
  
      }).catch((error) => { console.log(error) });
  }
  
  googleLogin(): Promise<any> {
    
    return new Promise((resolve, reject) => { 
      this.googlePlus.login({
        'webClientId': environment.clientID,
        'offline': true
      }).then( res => {
              const googleCredential = firebase.auth.GoogleAuthProvider
                  .credential(res.idToken);
    
              firebase.auth().signInWithCredential(googleCredential)
            .then( response => {
                console.log("Firebase success: " + JSON.stringify(response));
                resolve(response)
            });
      }, err => {
          console.error("Error: ", err)
          reject(err);
      });
    });
  }

}
