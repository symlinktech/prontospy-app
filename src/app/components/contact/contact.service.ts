import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpParams  } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

 	constructor(public http: HttpClient, public translate: TranslateService) { }

  	postData(data,url){
  		data['lang_code']=this.translate.currentLang
	    return new Promise((resolve, reject) =>{
	      this.http.post(environment.apiUrl+url,data).
	      subscribe(res =>{
	        resolve(res);
	      }, (err) =>{
	         console.log(err);
	        reject(err);
	      });
	    });
  	}
  	getData(url){
	    return new Promise((resolve, reject) =>{
	      this.http.get(environment.apiUrl+url).
	      subscribe(res =>{
	        resolve(res);
	      }, (err) =>{
	         console.log(err);
	        reject(err);
	      });
	    });
	}
}
