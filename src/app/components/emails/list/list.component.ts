import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmailsService } from '../emails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../i18n/language.service';
declare var $;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ListComponent implements OnInit {
name='Emails';
EmailList:any;
parent_id:any;
user_id:any;
  constructor(public emailsService:EmailsService,public router:Router,public activatedRoute:ActivatedRoute,public langService:LanguageService) { }

  ngOnInit() {
    $('.preloader').fadeIn(300);
    this.user_id=localStorage.getItem('user_id')
    this.getEmails();
  }

  getEmails(){
  	let data={
  		user_id:localStorage.getItem('user_id')
  	}
  	this.emailsService.postData(data,'email/list').then((result)=>{
  		if(result['status_code']==200){
  			this.EmailList=result['data']
        if(this.EmailList.length>0) {
          this.parent_id=this.EmailList[this.EmailList.length-1].id
        }
        $('.preloader').fadeOut(300);
        
  		}
  		else{
        $('.preloader').fadeOut(300);
  			this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
  details(email_id,rcv_id,snd_id){
    rcv_id=(this.user_id==snd_id)?rcv_id:snd_id
  	this.router.navigate([(localStorage.getItem('role')=='consultant')?'account/consultant/email/details':'account/client/email/details'],{queryParams:{email_id:email_id,parent_id:this.parent_id,rcv_id:rcv_id}})
  }
  removeEmail(id,index){
    let data={
      id:id,
      deleted_by:this.user_id
    }
    this.emailsService.postData(data,'email/delete').then((result)=>{
      if(result['status_code']==200){
        this.langService.apiSuccessAlert(result['message'])
        this.EmailList.splice(index,1)
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
}
