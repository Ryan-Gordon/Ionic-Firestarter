import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';

import firebase from 'firebase';
import { environment } from '../../enviroments/enviroment';
import { Facebook } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';
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

  constructor(private googlePlus: GooglePlus, private facebook:Facebook, public alertCtrl:AlertController) {
    console.log('Hello AuthProvider Provider');
  }


  signOut(){
    firebase.auth().signOut();
  }


  //Adapted from https://github.com/javebratt/firebase-phone-authentication
  smsLogin(phoneNumber: number, recaptchaVerifier:firebase.auth.RecaptchaVerifier){
    const appVerifier = recaptchaVerifier;
    const phoneNumberString = "+" + phoneNumber;
    //Signin with phonenumbers requires BOTH the phone number and a verified captcha
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
              .then(function (result) {
                // User signed in successfully.
                console.log(result.user);
                //Pop back to the previous page.
                this.navCtrl.pop();
              }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
              });
            }
          }
        ]
      });
      prompt.present();
    })
    .catch(function (error) {
      console.error("SMS not sent", error);
    });
  
  }

  //Social Provider logins
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


