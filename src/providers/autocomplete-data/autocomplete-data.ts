import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AutocompleteDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteDataProvider {

  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    console.log('Hello AutocompleteDataProvider Provider');

    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'autocompletedata.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.init();
            }
          });
        });
    });
  } // constructor END

  init() {
    this.http.get('assets/autocompletedata.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
            alert('init성공');
          })
          .catch(e => {
            console.error(e);
            alert('init실패');            
          });
      });
  } // init END

  autocomplete(keyword):Promise<any>{
    let autoKeyword = [keyword, keyword]; 

    return new Promise ((resolve, reject) => {
      let sql = "SELECT searchWord FROM autocompletedata WHERE consonant LIKE '%'||?||'%' OR searchWord LIKE '%'||?||'%'";
      this.database.executeSql(sql,autoKeyword).then( (data) => {
      let getautoData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          getautoData.push ({ searchWord: data.rows.item(i).searchWord });
        }
      }
        resolve(getautoData);
      }, (error) => {
        let errors = [];
        errors.push(error);
        reject(errors);     
      });
    });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
