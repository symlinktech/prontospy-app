import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../../auth-guard.service';
import { UserinfoService } from '../userinfo.service';
import { LanguageService } from '../../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-insurance-info',
  templateUrl: './insurance-info.component.html',
  styleUrls: ['./insurance-info.component.scss']
})
export class InsuranceInfoComponent implements OnInit {
//=====================Insurance
insurance_company_name:any;
insurance_number:any;
insurance_expiration:any;
insurance_available_status:any;
first_name:any;
last_name:any;
personal_email:any;
ins_company_name=false;
ins_number=false;
ins_exp_date=false;
  constructor(public userinfoService:UserinfoService,public authGuard:AuthGuardService,public langService:LanguageService) { }

  ngOnInit() {
     $('.preloader').fadeIn(300);
  	$('#insurance_expiration').datetimepicker({format:'Y-m-d',timepicker:false,inline:false,lang:'en',scrollMonth : false,
    scrollInput : false,value:new Date()});
    this.getProfileDetails();
  }
   logout(){
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    this.authGuard.isLogged();
  }
  insCheck(){
    if($("input[name='checkbox-insurance_available_status'").is(":checked")==true) {
      this.ins_company_name=true
      this.ins_number=true
      this.ins_exp_date=true
    }
    else{
      this.ins_company_name=false
      this.ins_number=false
      this.ins_exp_date=false
    }
    console.log('hi')
  }
  getProfileDetails(){
      let data={
        id:localStorage.getItem('user_id'),
        
      }
      this.userinfoService.postData(data,'profile/get').then((result)=>{
        if(result['status_code']==200){
          this.first_name=result['data'].firstname;
          this.last_name=result['data'].lastname;
          this.personal_email=result['data'].personal_email;
//=====================================Insurance Info================================================
        this.insurance_company_name=result['data'].insurance_company_name
        this.insurance_number=result['data'].insurance_number
        this.insurance_expiration=result['data'].insurance_expiration
        $('#insurance_expiration').val(this.insurance_expiration);
        this.insurance_available_status=result['data'].insurance_available_status;
        if(this.insurance_available_status=="1") {
          $("input[name='checkbox-insurance_available_status']").prop("checked", true)
          this.ins_company_name=true
          this.ins_number=true
          this.ins_exp_date=true
        }
         $('.preloader').fadeOut(300);
//====================================================================================================
        }
        else{
          $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
  updateInsuranceInfo(){
    this.insurance_expiration=$('#insurance_expiration').val();
    this.insurance_available_status=(($("input[name='checkbox-insurance_available_status'").is(":checked")==true)?'1':'2');
     let data={
      id:localStorage.getItem('user_id'),
      insurance_company_name:this.insurance_company_name,
      insurance_number:this.insurance_number,
      insurance_expiration:this.insurance_expiration,
      insurance_available_status:this.insurance_available_status,
    }
    this.userinfoService.postData(data,'profile/insurance-information/update').then((result)=>{
      if(result['status_code']==200) {
         this.langService.apiSuccessAlert(result['message'])
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
}
