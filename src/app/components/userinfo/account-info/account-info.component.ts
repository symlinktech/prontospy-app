import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../../auth-guard.service';
import { UserinfoService } from '../userinfo.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../i18n/language.service';
import { UserSidebarComponent } from '../../../common/user-sidebar/user-sidebar.component'
declare var $;
@Component({
  providers:  [UserSidebarComponent],
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
//=================Account Info=========================
profile_name:any;
email:any;
old_password:any='';
new_password:any='';
confirm_password:any='';
promotional_email_status:any;
update_advice_email_status:any;
phoneCodeList:any;
phonecode:any;
first_name:any;
last_name:any;
personal_email:any;
profile_status:any='';
role:any;
name:any='Account Info';
  constructor(public userinfoService:UserinfoService,public router:Router, public authGuard:AuthGuardService,public translate: TranslateService,public langService:LanguageService,public userSidebar:UserSidebarComponent) { }

	ngOnInit() {
		 $('.preloader').fadeIn(300);
		this.email=localStorage.getItem('user_email');
		this.role=localStorage.getItem('role');
		this.getProfileDetails();
	}
	logout(message){
		$.dialog({
            title: 'Success',
            content: message,
    	});
	  	localStorage.removeItem('user_email');
	    localStorage.removeItem('user_name');
	    localStorage.removeItem('user_id');
	    this.authGuard.isLogged();
	    this.router.navigate([''])
	    window.location.reload();
	}
	closeAccount(){
		const currentLang = this.translate.currentLang;
	    var that=this
	      $.confirm({
	      title: this.translate.translations[currentLang]['account_close'],
	      content: this.translate.translations[currentLang]['are_you_want_to_close_account'],
	      buttons: {
	          confirm: function () {
	              that.AccountCloseApi();
	          },
	          cancel: function () {
	             close();
	          }
	      }
	    });
  	}
	AccountCloseApi(){
	    let data={
	    	id:localStorage.getItem('user_id')
	    }
	    this.userinfoService.postData(data,'profile/delete').then((result)=>{
	    	if(result['status_code']==200) {
	        	this.logout(result['message'])
	    	}
	    	else{
	    		this.langService.apiFailureAlert(result['message'])
	    	}
	    })
	}
	getProfileDetails(){
	    let data={
	      id:localStorage.getItem('user_id')
	    }
    	this.userinfoService.postData(data,'profile/get').then((result)=>{
	      if(result['status_code']==200){
	//========================================Account Info===============================================
	        this.first_name=result['data'].firstname;
	        this.last_name=result['data'].lastname;
	        this.personal_email=result['data'].personal_email;
	        this.profile_name=result['data'].profile_name;
	        this.promotional_email_status=result['data'].promotional_email_status;
	        this.update_advice_email_status=result['data'].update_advice_email_status;
	        this.profile_status=result['data'].active_status;
	        if(this.profile_status=='3') {
	        	var element = <HTMLInputElement> document.getElementById("profile_status");
      			element.disabled = true;
	        }
	        $("#profile_status option[value=" + this.profile_status + "]").prop("selected", true).trigger('change')
	        if(this.promotional_email_status=="1") {
	          $("input[name='checkbox-promotional_email_status']").prop("checked", true)
	        }
	        if(this.update_advice_email_status=="1") {
	          $("input[name='checkbox-update_advice_email_status']").prop("checked", true)
	        }
	        $('.preloader').fadeOut(300);
	//===================================================================================================
	      }
	      else{
	      	$('.preloader').fadeOut(300);
	        this.langService.apiFailureAlert(result['message'])
	      }
    	})
  	}
    updateAccountInfo(){
	    this.promotional_email_status=(($("input[name='checkbox-promotional_email_status']").is(":checked")==true)?'1':'2')
	    this.update_advice_email_status=(($("input[name='checkbox-update_advice_email_status']").is(":checked")==true)?'1':'2')	   
	    let data={
	      id:localStorage.getItem('user_id'),
	      email:this.email,
	      update_advice_email_status:this.update_advice_email_status,
	      promotional_email_status:this.promotional_email_status,
	      profile_name:this.profile_name,
	      old_password:this.old_password,
	      new_password:this.new_password,
	      confirm_password:this.confirm_password,
	      status:(this.role=='user')?'1':$('#profile_status').val()
	    }
	    this.userinfoService.postData(data,'profile/account-information/update').then((result)=>{
	      if(result['status_code']==200) {
	       this.langService.apiSuccessAlert(result['message'])
	       var status=(this.role=='user')?'1':$('#profile_status').val()
	        localStorage.setItem('active_status',status)
	        window.location.reload()
	      }
	      else{
	        this.langService.apiFailureAlert(result['message'])
	      }
	    })
  	}
}
