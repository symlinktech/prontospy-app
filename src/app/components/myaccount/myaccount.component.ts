import { Component, OnInit, DoCheck, KeyValueDiffers, ViewEncapsulation } from '@angular/core';
import { AuthGuardService } from '../../auth-guard.service';
import { MyaccountService } from './myaccount.service';
import { LanguageService } from '../../i18n/language.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../../common.service';

declare var $;

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class MyaccountComponent implements OnInit {
//===============Personal Info
first_name:any;
last_name:any;
second_last_name:any;
personal_email:any;
phone:any;
personal_country:any;
personal_address:any;
personal_city:any;
personal_province:any;
personal_zipcode:any;
personal_dob:any;
birth_country:any;
birth_province:any;
birth_city:any;
nationality
gender:any;
personal_telephone:any;
personal_telephone_code:any;
image:any;
previous_image:any;
isNewImage:boolean=false;
CountryList:any;
PhoneCodeList:any;
StateList:any=[];
CityList:any=[];
BirthCountryList:any;
BirthStateList:any=[];
BirthCityList:any=[];
NationalityList:any;
name:any='myaccount';
timeZones:any;
timezone:any;
flag_code:any;
  constructor(public authGuard:AuthGuardService,public _DomSanitizer: DomSanitizer, public accountService:MyaccountService,public langService:LanguageService,private datePipe: DatePipe,public commService:CommonService) { }

  ngOnInit() {
    $('.preloader').fadeIn(300);
    this.getProfileDetails();
    this.getNationalityList();
    this.getCountryList();
    this.getBirthCountryList();
    this.getTimeZoneList();
    var that=this;
    $('#personal_dob').datetimepicker({format:'Y-m-d',timepicker:false,inline:false,lang:'en',scrollMonth : false,scrollInput : false,yearStart:'1940',yearEnd:new Date().getFullYear()-18,onSelectDate:function () {
      that.checkDateBirth(); 
    }}); 
    // if(localStorage.getItem('role')=='consultant') {
    //   var element = <HTMLInputElement> document.getElementById("timezone");
    //   element.disabled = true;
    // }
    var country,state
        // $('#personal_country').on('change', function() {
        //   country=this.value
        //   that.getStateList(this.value)
        // });
        // $('#personal_province').on('change', function() {
        //   state=this.value
        //   that.getCityList(country,state)
        // });
        // $('#birth_country').on('change', function() {
        //   country=this.value
        //   that.getBirthStateList(this.value)
        // });
        // $('#birth_province').on('change', function() {
        //   state=this.value
        //   that.getBirthCityList(country,state)
        // });
  }
  checkDateBirth(){
    var dob = new Date($('#personal_dob').val());
    var year = dob.getFullYear();
    var month = dob.getMonth();
    var day =dob.getDay();
    var today = new Date();
    var age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      age--;
    }
    if(age<18) {
      // this.age=undefined;
      this.langService.failureAlert('age_alert_msg')

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
  ngAfterViewInit(){
    $('.select2').select2();
    $('.select2-multiple').select2({placeholder: " - Select Category - "});
    $('.select2-nosearch').select2({minimumResultsForSearch: -1});
  }
  changePhoneCode(code,iso){
    this.personal_telephone_code=code
    this.flag_code=iso.toLowerCase()
  }
  logout(){
  	localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    this.authGuard.isLogged();
  }
  onFileChange(event) {
    var name=[];
    var newname:any;
    var fileData:any;
    var extension:any;
    var myString:any;
    var that=this;
    if (event.target.files && event.target.files.length > 0) {
      fileData = event.target.files;

      $(fileData).each(function(i, obj) {
        myString = obj.name
        extension=myString.substring(myString.lastIndexOf(".")+1)
        name.push(obj.name);
      });
      newname = name.join(' | ');
      $('#filename').html(newname);

      $.each(fileData , function(index, val) {
        let reader = new FileReader(); 
        reader.readAsDataURL(val);
        if(extension=='jpg' || extension=='png' || extension=='jpeg')  {
          reader.onload = () => {
            that.image=reader.result;
            that.isNewImage=true;
          };
        }
        else{
          that.langService.failureAlert('file_type_validation')
        }
      });
    }
  }
  
  
  updatePersonalInfo(){
    this.personal_dob=$('#personal_dob').val();
    this.personal_country =$('#personal_country').val();
    this.personal_province=$('#personal_province').val();
    this.personal_city=$('#personal_city').val();
    this.birth_country=$('#birth_country').val();
    this.birth_province=$('#birth_province').val();
    this.birth_city=$('#birth_city').val();
    this.nationality=$('#nationality').val();
    this.gender=$('#gender').val();
    this.timezone=$('#timezone').val();
    let data={
      id:localStorage.getItem('user_id'),
      firstname:this.first_name,
      lastname:this.last_name,
      middlename:this.second_last_name,
      //name:this.first_name+ ' ' + this.last_name,
      timezone:this.timezone,
      //personal_email:this.personal_email,
      personal_country:this.personal_country,
      personal_province:this.personal_province,
      personal_address:this.personal_address,
      personal_city:this.personal_city,
      personal_zipcode:this.personal_zipcode,
      personal_dob:this.personal_dob,
      birth_country:this.birth_country,
      birth_province:this.birth_province,
      birth_city:this.birth_city,
      nationality:this.nationality,
      gender:this.gender,
      personal_telephone:this.personal_telephone,
      personal_telephone_code:this.personal_telephone_code,
      image:(this.isNewImage==true)?this.image:undefined,
      previous_image:this.previous_image,

    }
    this.accountService.postData(data,'profile/personal-information/update').then((result)=>{
      if(result['status_code']==200) {
        localStorage.setItem('first_name',this.first_name)
        localStorage.setItem('last_name',this.last_name)
        for(let i=0;i<this.timeZones.length;i++){
          if($('#timezone').val()==this.timeZones[i].id) {
            localStorage.setItem('user_timezone',this.timeZones[i].zone)
          }
        }
        this.langService.apiSuccessAlert(result['message'])
        window.location.reload()
        //window.location.reload();
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }

//===================Onload API Calls================================

  getProfileDetails(){
    let data={
      id:localStorage.getItem('user_id')
     
    }
    if(localStorage.getItem('role')=='consultant') {
       data['appointment_count']='1'
       data['user_id']=localStorage.getItem('user_id')
    }
    this.accountService.postData(data,'profile/get').then((result)=>{
      if(result['status_code']==200){
        if(localStorage.getItem('role')=='consultant') {
           var element = <HTMLInputElement> document.getElementById("timezone");
          element.disabled = (result['data'].appointment>0)?true:false;
          this.personal_country=result['data'].details.personal_country;
          $("#personal_country option[value=" + this.personal_country + "]").prop("selected", true).trigger('change')
          this.personal_province=result['data'].details.personal_province;
          this.personal_city=result['data'].details.personal_city;
          this.birth_country=result['data'].details.birth_country;
          this.birth_province=result['data'].details.birth_province;
          this.birth_city=result['data'].details.birth_city;
          this.timezone=result['data'].details.timezone
          $("#timezone option[value=" + this.timezone + "]").prop("selected", true).trigger('change')
          localStorage.setItem('user_timezone',result['data'].details.zone)
          localStorage.setItem('user_offset',result['data'].details.offset)
          //====================================================Personal info===============================
              this.first_name=result['data'].details.firstname;
              this.last_name=result['data'].details.lastname;
              this.second_last_name=result['data'].details.middlename;
              this.personal_address=result['data'].details.personal_address
              
              
              this.personal_zipcode=result['data'].details.personal_zipcode;
              this.personal_dob=result['data'].details.personal_dob;
              $('#personal_dob').val(this.personal_dob);
              
              
              this.nationality=result['data'].details.nationality;
              $("#nationality option[value=" + this.nationality + "]").prop("selected", true).trigger('change')
              this.gender=result['data'].details.gender;
              $("#gender option[value=" + this.gender + "]").prop("selected", true).trigger('change')
              this.personal_email=result['data'].details.personal_email;
              this.personal_telephone=result['data'].details.personal_telephone;
              this.personal_telephone_code=result['data'].details.personal_telephone_code;
              this.image=result['data'].details.image;
              this.commService.setProfileImage(this.image)
              localStorage.setItem('image',this.image)
              this.previous_image=result['data'].details.previous_image;
          //=================================================================================================
        }
        else{
          this.personal_country=result['data'].personal_country;
          $("#personal_country option[value=" + this.personal_country + "]").prop("selected", true).trigger('change')
          this.personal_province=result['data'].personal_province;
          this.personal_city=result['data'].personal_city;
          this.birth_country=result['data'].birth_country;
          this.birth_province=result['data'].birth_province;
          this.birth_city=result['data'].birth_city;
          this.timezone=result['data'].timezone
          $("#timezone option[value=" + this.timezone + "]").prop("selected", true).trigger('change')
          localStorage.setItem('user_timezone',result['data'].zone)
          localStorage.setItem('user_offset',result['data'].offset)
          //====================================================Personal info===============================
          this.first_name=result['data'].firstname;
          this.last_name=result['data'].lastname;
          this.second_last_name=result['data'].middlename;
          this.personal_address=result['data'].personal_address
          
          
          this.personal_zipcode=result['data'].personal_zipcode;
          this.personal_dob=result['data'].personal_dob;
          $('#personal_dob').val(this.personal_dob);
          
          
          this.nationality=result['data'].nationality;
          $("#nationality option[value=" + this.nationality + "]").prop("selected", true).trigger('change')
          this.gender=result['data'].gender;
          $("#gender option[value=" + this.gender + "]").prop("selected", true).trigger('change')
          this.personal_email=result['data'].personal_email;
          this.personal_telephone=result['data'].personal_telephone;
          this.personal_telephone_code=result['data'].personal_telephone_code;
          this.image=result['data'].image;
          this.commService.setProfileImage(this.image)
          localStorage.setItem('image',this.image)
          this.previous_image=result['data'].previous_image;
        //=================================================================================================
        }
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
    getNationalityList(){
      let data={
        
      }
      this.accountService.postData(data,'nationality/list').then((result)=>{
        if(result['status_code']==200) {
          this.NationalityList=result['data'];
          return result['data']
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
  }
  getCountryList(){
      let data={
        
      }
      this.accountService.postData(data,'country/list').then((result)=>{
        if(result['status_code']==200) {
          this.CountryList=result['data'];
          this.BirthCountryList=result['data'];
          this.PhoneCodeList=result['data'];
          for (var i = 0; i < this.PhoneCodeList.length; i++) {
            if(this.PhoneCodeList[i].phonecode) {
               this.PhoneCodeList[i].phonecode=this.PhoneCodeList[i].phonecode.replace("+","")
               this.PhoneCodeList[i].phonecode='+'+this.PhoneCodeList[i].phonecode
            }
           if(this.PhoneCodeList[i].phonecode==this.personal_telephone_code) {
             this.flag_code=this.PhoneCodeList[i].iso2.toLowerCase()
           }
        }
          // if(this.personal_country==undefined) {
          //   this.personal_country=this.CountryList[0].id
          //   this.getStateList(this.personal_country)
          // }
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
  }
  getStateList(id){
    if(id) {
      let data={
        country_id:id
      }
      this.accountService.postData(data,'state/list').then((result)=>{
        if(result['status_code']==200) {
           this.StateList=result['data'];
           //console.log(this.StateList)
            // for(let i=0;i<this.StateList.length;i++){
            //   var optionValue=optionValue+'<option value='+this.StateList[i].id+'>'+this.StateList[i].name+'</option>';
            // }
            // $("#personal_province").html(optionValue);
            if(this.personal_province==undefined) {
              this.personal_province=this.StateList[0].id
              //this.getCityList(this.personal_country,this.personal_province)
            }
            
            
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
      
  }
  getCityList(country_id,state_id){
    if(country_id && state_id) {
      let data={
        
        country_id:country_id,
        state_id:state_id
      }
      this.accountService.postData(data,'city/list').then((result)=>{
        if(result['status_code']==200) {
          this.CityList=result['data'];
          //console.log(this.CityList)
          var optionValue1=''
          // for(let i=0;i<this.CityList.length;i++){
          //   optionValue1=optionValue1+'<option value='+this.CityList[i].id+'>'+this.CityList[i].name+'</option>';
          // }
          // $("#personal_city").html(optionValue1);
          if(this.personal_city==undefined) {
              this.personal_city=this.CityList[0].id
          }
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
      
    }
    getBirthCountryList(){
      let data={
        
      }
      this.accountService.postData(data,'country/list').then((result)=>{
        if(result['status_code']==200) {
          this.BirthCountryList=result['data'];
          // if(this.birth_country==undefined && this.BirthCountryList.length>0) {
          //   this.birth_country=this.CountryList[0].id
          //   this.getBirthStateList(this.birth_country)
          // }
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
  }
  getBirthStateList(id){
      let data={
        
        country_id:id
      }
      this.accountService.postData(data,'state/list').then((result)=>{
        if(result['status_code']==200) {
          this.BirthStateList=result['data'];
          // for(let i=0;i<this.BirthStateList.length;i++){
          //     var optionValue2=optionValue2+'<option value='+this.BirthStateList[i].id+'>'+this.BirthStateList[i].name+'</option>';
          //   }
          //   $("#birth_province").html(optionValue2);
            if(this.birth_province==undefined) {
              this.birth_province=this.StateList[0].id
              //this.getCityList(this.birth_country,this.birth_province)
            }
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
  }
  getBirthCityList(country_id,state_id){
      let data={
        country_id:country_id,
        state_id:state_id
      }
      this.accountService.postData(data,'city/list').then((result)=>{
        if(result['status_code']==200) {
          this.BirthCityList=result['data'];
          var optionValue3=''
          // for(let i=0;i<this.BirthCityList.length;i++){
          //     optionValue3=optionValue3+'<option value='+this.BirthCityList[i].id+'>'+this.BirthCityList[i].name+'</option>';
          //   }
          //   $("#birth_city").html(optionValue3);
            if(this.birth_city==undefined) {
              this.birth_city=this.StateList[0].id
            }
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
  getTimeZoneList(){
    let data={
      
    }
    this.accountService.postData(data,'timezone/list').then(async (result)=>{
      if(result['status_code']==200) {
        this.timeZones=await result['data'];
        $("#timezone option[value=" + this.timezone + "]").prop("selected", true)
       $('.preloader').fadeOut(300);
        //$("#timezone option[value=" + this.timezone + "]").prop("selected", true)
      }
      else{

      }
    })
  }
}
