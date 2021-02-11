import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RegisterService } from './register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
first_name:any;
last_name:any;
email:any;
contact:any;
password:any;
confirm_password:any;
phoneCodeList:any;
phonecode:any;
user_type:any='user';
timeZones:any;
timezone:any;
timezone_id:any;
  constructor(public registerService:RegisterService,public router:Router,public translate: TranslateService,public langService:LanguageService) { }

  ngOnInit() {
  	this.getTimeZoneList();
    $('.select2').select2();
    $('.select2-nosearch').select2({ minimumResultsForSearch: -1});
  }
  validateForm(){
    this.phonecode=$('#phonecode').val();
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //reg.test(this.email)==false
    if(this.first_name==undefined || this.first_name==null || this.first_name.trim()=='') {
        this.langService.failureAlert('First Name field is required')
        
    }
    else if(this.last_name==undefined || this.last_name==null || this.last_name.trim()=='') {
        this.langService.failureAlert('Last Name field is required')
        
    }
    else if(this.email==undefined || this.email==null || this.email.trim()=='') {
        this.langService.failureAlert('Email field is required')
        
    }
    else if(reg.test(this.email.trim())==false) {
        this.langService.failureAlert('Email is not valid')
        
    }
    else if(this.password==undefined || this.password==null || this.password.trim()=='') {
        this.langService.failureAlert('Password field is required')
        
    }
    else if(this.confirm_password==undefined || this.confirm_password==null || this.confirm_password.trim()=='') {
        this.langService.failureAlert('Confirm Password field is required')
        
    }
    else if(this.password!=this.confirm_password) {
        this.langService.failureAlert('Password & Confirm Password does not matched')
        
    }
    else{

    }
  }
  autoSearch(event){
    var input, filter, ul, li, i, txtValue;
    input = $('.dropdown-menu .form-control');
    filter = input.val().toLowerCase();
    ul = $('.dropdown-menu .dropdown-menu-wrap');
    li = $('.dropdown-menu .dropdown-menu-wrap .dropdown-item');
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {  
        li[i].style.display = "none";
      }
    }
  }
  getRole(type){
    this.user_type=type;
  }
  selectTimeZone(zone,id){
    this.timezone=zone
    this.timezone_id=id
  }
  register(){
    if(($("input[name='checkbox-term']").is(":checked")==true) && ($("input[name='checkbox-privacy']").is(":checked")==true)) {
      this.phonecode=$('#phonecode').val()
      let data={
        firstname:this.first_name,
        lastname:this.last_name,
        email:this.email,
        // phonecode:this.phonecode,
        // phone:this.contact,
        timezone:this.timezone_id,
        role:this.user_type,
        password:this.password,
        password_confirmation:this.confirm_password,
        
      }
      console.log(data)
      this.registerService.postData(data,'user/signup').then((result)=>{
        if(result['status_code']==200) {
          this.langService.apiSuccessAlert(result['message'])
          // localStorage.setItem('user_id',result['data'].user_id);
          this.router.navigate(['/verification'],{queryParams:{user_id:result['data'].user_id,email:this.email},skipLocationChange: true})
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
    else{
      this.langService.failureAlert('signup_validation_msg')
    }
  	
  }
  getTimeZoneList(){
    let data={
      
    }
    this.registerService.postData(data,'timezone/list').then((result)=>{
      if(result['status_code']==200) {
        this.timeZones=result['data'];
      }
      else{

      }
    })
  }

}
