import { Component, OnInit } from '@angular/core';
import { FooterService } from './footer.service';

declare var $;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
Settings={customer_support:'',email:'',facebook_link:'',google_plus_link:'',instagram_link:'',twitter_link:'',title:'',company_history:''}
current_year:any;
role=localStorage.getItem('role')
home_footer_title:any;
home_footer_description:any;
  constructor(public footerService:FooterService) { }

  	ngOnInit() {
	  	var d = new Date();
	    this.current_year = d.getFullYear();
	  	this.getSiteSettings();
	  	this.getHomeFooterContent()
  	}
  	get isLoggedStorage(): any {
  		//alert(this.authGuard.isLoggedStorage)
        return (localStorage.getItem('login_status')=='true')?'true':'false'
    }
   	getSiteSettings(){
	    let data={
	      
	    }
	    this.footerService.postData(data,'site/settings').then((result)=>{
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
  	getHomeFooterContent(){
      let data={
        alias:'home-footer-content'
      }
      return this.footerService.postData(data,'page/details').then((result)=>{
        if(result['status_code']==200) {
          this.home_footer_title=result['data'].name
          this.home_footer_description=result['data'].description
        }
        else{
        }
      })
    }
}
