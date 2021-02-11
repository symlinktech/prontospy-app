import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmailsService } from '../emails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../i18n/language.service';
declare var $;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
name='Email Details';
EmailList:any;
email_text:any;
email_id:any;
parent_id:any;
divCheck:boolean=false;
user_id:any;
receiver_id:any;
  constructor(public emailsService:EmailsService,public router:Router,public activatedRoute:ActivatedRoute,public langService:LanguageService) { }

  ngOnInit() {
    this.user_id=localStorage.getItem('user_id')
  	this.activatedRoute.queryParams.subscribe((res)=>{
  		this.email_id=res.email_id
      this.parent_id=res.parent_id
      this.receiver_id=res.rcv_id
  		this.getEmails()
  	})
  }
    ngDoCheck(){
      //this.getEmails()
    }
  	getEmails(){
	  	let data={
	  		user_id:localStorage.getItem('user_id'),
	  		email_id:this.email_id
	  	}
	  	this.emailsService.postData(data,'email/details').then((result)=>{
	  		if(result['status_code']==200){
	  			this.EmailList=result['data']
	  		}
	  		else{
	  			this.langService.apiFailureAlert(result['message'])	
	  		}
	  	})
  	}
  	showDiv(){
  		this.divCheck=!this.divCheck
  		if(this.divCheck) {
  			$('.reply').removeClass('d-none')
  		}
  		else{
  			$('.reply').addClass('d-none')
  		}
  		
  	}
  	replyMail(){
  		let data={
            type:'2',
            email_id:this.email_id,
            parent_id:this.parent_id,
            sender_id:localStorage.getItem('user_id'),
            receiver_id:this.receiver_id,
            description:this.email_text,
        }
        this.emailsService.postData(data,'email/send').then((result)=>{
	  		if(result['status_code']==200){
          this.email_text=''
          //this.getEmails()
          //this.langService.apiSuccessAlert(result['message'])
	  		}
	  		else{
	  			this.langService.apiFailureAlert(result['message'])
	  		}
	  	})
  	}
}
