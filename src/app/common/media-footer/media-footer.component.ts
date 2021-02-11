import { Component, OnInit } from '@angular/core';
import { MediaFooterService } from './media-footer.service';

declare var $;
@Component({
  selector: 'app-media-footer',
  templateUrl: './media-footer.component.html',
  styleUrls: ['./media-footer.component.scss']
})
export class MediaFooterComponent implements OnInit {
Settings={customer_support:'',email:'',facebook_link:'',google_plus_link:'',instagram_link:'',twitter_link:'',title:'',company_history:''}
current_year:any;
  constructor(public footerService:MediaFooterService) { }

  ngOnInit() {
  	 var d = new Date();
        this.current_year = d.getFullYear();
  	this.getSiteSettings();
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
}
