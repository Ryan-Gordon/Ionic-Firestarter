import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the SmsLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 */

@IonicPage()
@Component({
  selector: 'page-sms-login',
  templateUrl: 'sms-login.html',
})
export class SmsLoginPage {

  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public alertCtrl:AlertController, private auth:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmsLoginPage');
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
  //Delegate request to auth provider
  smsLogin(phoneNum: number){
    this.auth.smsLogin(phoneNum,this.recaptchaVerifier);
  }
}