import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../auth-guard.service';
import { MediaHeaderService } from './media-header.service';
import { TranslateService } from '@ngx-translate/core';

declare var $;
@Component({
  selector: 'app-media-header',
  templateUrl: './media-header.component.html',
  styleUrls: ['./media-header.component.scss']
})
export class MediaHeaderComponent implements OnInit {
isLoggedInCheck:boolean;
Settings={customer_support:'',email:'',facebook_link:'',google_plus_link:'',instagram_link:'',twitter_link:'',title:'',company_history:''}
  constructor(public authGuard:AuthGuardService,public headerService:MediaHeaderService,public translate: TranslateService) { }

	ngOnInit() {
	  	this.getSiteSettings();
	  	console.log(this.translate.currentLang)
	}
    get isLoggedStorage(): any {
  		//alert(this.authGuard.isLoggedStorage)
        return (localStorage.getItem('login_status')=='true')?'true':'false'
    }
    getSiteSettings(){
	    let data={
	      
	    }
	    this.headerService.postData(data,'site/settings').then((result)=>{
	      if(result['status_code']==200) {
	      	this.Settings.customer_support=result['data'].customer_support;
	      	this.Settings.email=result['data'].email;
	      	this.Settings.facebook_link=result['data'].facebook_link;
	      	this.Settings.google_plus_link=result['data'].google_plus_link;
	      	this.Settings.instagram_link=result['data'].instagram_link;
	      	this.Settings.twitter_link=result['data'].twitter_link;
	      	this.Settings.title=result['data'].title;
	      	//this.Settings.company_history=result['data'].company_history;
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
