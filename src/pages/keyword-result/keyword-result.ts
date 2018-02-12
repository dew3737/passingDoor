import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { MinbeopProvider } from '../../providers/minbeop/minbeop';

/**
 * Generated class for the KeywordResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-keyword-result',
  templateUrl: 'keyword-result.html',
})
export class KeywordResultPage {

  @ViewChild(Navbar) navbar: Navbar;

  minbeop = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private minbeopPv: MinbeopProvider) {

    this.minbeopPv.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadMinbeopData();
      }
    });
  }

  loadMinbeopData(){
    this.minbeopPv.getAllMinbeop().then(data => {
      this.minbeop = data;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordResultPage');

    this.navbar.backButtonClick = (e:UIEvent) => {
      let navOptions = {
        animation: 'ios-transition'
      };
      this.navCtrl.pop(navOptions);
    }
  }

}
