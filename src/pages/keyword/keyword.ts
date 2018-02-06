import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the KeywordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-keyword',
  templateUrl: 'keyword.html',
})
export class KeywordPage {

  loginInfo = {
    user_id: '',
    token_id: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordPage');

    var dataPromise = this.storage.get('member_id');

    dataPromise.then(data => {
      if(data){
        this.storage.get('tokenid').then( dataToken =>{
          this.loginInfo.user_id = data + '님 환영합니다.';
          this.loginInfo.token_id = dataToken;
        });
      } else {
        this.loginInfo.user_id = '게스트입니다.';
      }
    })
    // if (memberId){
    //   this.login.val = memberId + '님 환영합니다.';
    // } else {
    //   this.login.val = '게스트입니다.';
    // }
  } //ionViewDidLoad END

}
