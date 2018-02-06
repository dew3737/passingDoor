import { MenuToggle } from 'ionic-angular/components/menu/menu-toggle';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { MenuClose } from 'ionic-angular/components/menu/menu-close';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  title: string = "<br><br><br><br><center><h1>족보와 기출문제로<br>슬기로운 공부~~</h1></center>";

  constructor(
    public navCtrl: NavController, 
    private platform: Platform) {

    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        if (this.navCtrl.canGoBack()){
          let navOptions = {
            animation: 'ios-transition'
          };
          this.navCtrl.pop(navOptions);
        } else if (this.navCtrl.first()) {
          this.navCtrl.canSwipeBack();
        } else {
          alert('종료');
          this.platform.exitApp();
        }
      });
    });

  }

  keyword(){
    this.navCtrl.push('KeywordPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  notice(){
    this.navCtrl.push('NoticePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  howtouse(){
    this.navCtrl.push('HowtousePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  login(){
    this.navCtrl.push('LoginPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

}
