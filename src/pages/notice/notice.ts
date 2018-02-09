import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {

    // this.platform.ready().then(() => {
    //   if (this.navCtrl.canGoBack()){
    //     let navOptions = {
    //       animation: 'ios-transition'
    //     };
    //     this.navCtrl.pop(navOptions);
    //   }
    // });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');

    // this.navBar.backButtonClick = () => {
      
    //   alert('back button clicked');
    //   let navOptions = {
    //     animation: 'ios-transition'
    //   };
    //   this.navCtrl.pop(navOptions);
    // }

  }

}
