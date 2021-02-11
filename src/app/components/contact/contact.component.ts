import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../i18n/language.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin} from "rxjs";
import {tap} from "rxjs/operators";
declare var $;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
name:any;
phone:any;
email:any;
subject:any;
message:any;
Settings={customer_support:'',email:'',facebook_link:'',google_plus_link:'',instagram_link:'',twitter_link:'',title:'',company_history:''}
  constructor(public contactService:ContactService,public langService:LanguageService,public router:Router) { }

  ngOnInit() {
    this.requestDataFromMultipleSources().subscribe(responseList => {
    })
  	
  }
    public requestDataFromMultipleSources(): Observable<any[]> {
      let response1 =this.getSiteSettings();
      return forkJoin([response1]);
    }
      submitData(){
      	let data={
      		name:this.name,
      		email:this.email,
      		phone:this.phone,
      		subject:this.subject,
      		msg:this.message
      	}
      	this.contactService.postData(data,'contact/add').then((result)=>{
      		if(result['status_code']==200) {
      			this.langService.apiSuccessAlert(result['message'])
            this.router.navigate(['/home'])
      		}
      		else{
            this.langService.apiFailureAlert(result['message'])
      		}
      	})
      }
      getSiteSettings(){
  	    let data={
  	      
  	    }
  	    this.contactService.postData(data,'site/settings').then((result)=>{
  	      if(result['status_code']==200) {
  	      	this.Settings.customer_support=result['data'].customer_support;
  	      	this.Settings.email=result['data'].email;
  	      	this.Settings.facebook_link=result['data'].facebook_link;
  	      	this.Settings.google_plus_link=result['data'].google_plus_link;
  	      	this.Settings.instagram_link=result['data'].instagram_link;
  	      	this.Settings.twitter_link=result['data'].twitter_link;
  	      	this.Settings.title=result['data'].title;
  	      	this.Settings.company_history=result['data'].company_history;
  	        //this.Settings=result['data'];
  	        
  	      }
  	      else{
  	         $.dialog({
  	            title: 'Failure',
  	            content: result['message']
  	        });
  	      }
  	    })
  	  }
}
