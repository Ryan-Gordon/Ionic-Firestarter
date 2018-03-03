import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';

import firebase from 'firebase';
import { environment } from '../../enviroments/enviroment';
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

  constructor(private googlePlus: GooglePlus) {
    console.log('Hello AuthProvider Provider');
  }
  
  googleLogin(): Promise<any> {
    
    return new Promise((resolve, reject) => { 
      this.googlePlus.login({
        'webClientId': '5351366995-npuh9q89gaoiagoc4jssqck26gorj7hh.apps.googleusercontent.com',
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
