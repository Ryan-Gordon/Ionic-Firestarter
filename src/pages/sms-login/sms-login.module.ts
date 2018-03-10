import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SmsLoginPage } from './sms-login';

@NgModule({
  declarations: [
    SmsLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(SmsLoginPage),
  ],
})
export class SmsLoginPageModule {}
