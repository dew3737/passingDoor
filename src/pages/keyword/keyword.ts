import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MinbeopProvider } from '../../providers/minbeop/minbeop';

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

  test: string = "<br><h3>기출풀기<br><br>1. (민법) 부동산물권변동<br>2. (민법)유치권</h3>";

  subTitles = {};

  myInput = {};

  loginInfo = {
    user_id: '',
    token_id: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    private minbeopPv: MinbeopProvider) {

      //database providew 연결

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
  } //ionViewDidLoad END

  searchKeyword(){
    this.minbeopPv.searchMinbeop(this.myInput['keyword']).then(keywordData => {
      alert('get:'+keywordData);
      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.push('KeywordResultPage', { getSearchData: keywordData}, navOptions);
    });
  }

  //

}
