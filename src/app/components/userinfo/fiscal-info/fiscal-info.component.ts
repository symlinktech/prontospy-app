import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../../auth-guard.service';
import { UserinfoService } from '../userinfo.service';
import { LanguageService } from '../../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-fiscal-info',
  templateUrl: './fiscal-info.component.html',
  styleUrls: ['./fiscal-info.component.scss']
})
export class FiscalInfoComponent implements OnInit {
CountryList:any;
StateList:any;
CityList:any;
//=====================Fiscal Info
fiscal_business_name:any;
fiscal_code:any;
fiscal_country:any;
fiscal_city:any;
fiscal_province:any;
fiscal_zipcode:any;
fiscal_address:any;
fiscal_vatno:any;
fiscal_pec:any;
fiscal_sdi:any;
first_name:any;
last_name:any;
personal_email:any;
  constructor(public userinfoService:UserinfoService,public authGuard:AuthGuardService,public langService:LanguageService) { }

	ngOnInit() {
     $('.preloader').fadeIn(300);
		var that=this
  	var country,state
  	this.getCountryList();
    // $('#fiscal_country').on('change', function() {
    //     country=this.value
    //     that.getStateList(this.value)
    // });
      // $('#fiscal_province').on('change', function() {
      //   console.log('state_id'+this.value)
      //     state=this.value
      //     that.getCityList(country,state)
      // });
	}
  ngAfterViewInit(){
    this.getProfileDetails();
    $('.select2').select2();
    $('.select2-nosearch').select2({ minimumResultsForSearch: -1});
  }
  logout(){
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    this.authGuard.isLogged();
  }
  getProfileDetails(){
      let data={
        id:localStorage.getItem('user_id')
      }
      this.userinfoService.postData(data,'profile/get').then((result)=>{
        if(result['status_code']==200){
//=====================================Fiscal Info=================================================
        this.fiscal_country=result['data'].fiscal_country;
        $("#fiscal_country option[value=" + this.fiscal_country + "]").prop("selected", true).trigger('change')
        this.fiscal_province=result['data'].fiscal_province;
        this.fiscal_city=result['data'].fiscal_city;
        // if(this.fiscal_province) {
        //   this.getStateList(result['data'].fiscal_country)
        // }
        // if(this.fiscal_city) {
        //   this.getCityList(result['data'].fiscal_country,result['data'].fiscal_province)
        // }
        this.first_name=result['data'].firstname;
        this.last_name=result['data'].lastname;
        this.personal_email=result['data'].personal_email;
        this.fiscal_business_name=result['data'].fiscal_business_name
        this.fiscal_code=result['data'].fiscal_code;
        this.fiscal_zipcode=result['data'].fiscal_zipcode
        this.fiscal_address=result['data'].fiscal_address;
        this.fiscal_vatno=result['data'].fiscal_vatno;
        this.fiscal_pec=result['data'].fiscal_pec;
        this.fiscal_sdi=result['data'].fiscal_sdi;
         $('.preloader').fadeOut(300);
//===================================================================================================
        }
        else{
           $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
	updateFiscalInfo(){
	    this.fiscal_country=$('#fiscal_country').val();
	    this.fiscal_city =$('#fiscal_city').val();
	    this.fiscal_province=$('#fiscal_province').val();
	    let data={
	      id:localStorage.getItem('user_id'),
	      fiscal_business_name:this.fiscal_business_name,
	      fiscal_code:this.fiscal_code,
	      fiscal_country:this.fiscal_country,
	      fiscal_city:this.fiscal_city,
	      fiscal_province:this.fiscal_province,
	      fiscal_zipcode:this.fiscal_zipcode,
	      fiscal_address:this.fiscal_address,
	      fiscal_vatno:this.fiscal_vatno,
	      fiscal_pec:this.fiscal_pec,
	      fiscal_sdi:this.fiscal_sdi,
        personal_email:this.personal_email
	    }
	    this.userinfoService.postData(data,'profile/fiscal-information/update').then((result)=>{
	      if(result['status_code']==200) {
	        this.langService.apiSuccessAlert(result['message'])
	      }
	      else{
	        this.langService.apiFailureAlert(result['message'])
	      }
	    })
  	}
    getCountryList(){
      let data={
        
      }
      this.userinfoService.postData(data,'country/list').then((result)=>{
        if(result['status_code']==200) {
          this.CountryList=result['data'];
          
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
  	}
  	getStateList(id){
      let data={
        country_id:id
      }
      this.userinfoService.postData(data,'state/list').then((result)=>{
        if(result['status_code']==200) {
          this.StateList=result['data'];
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
  	}
  	getCityList(country_id,state_id){
      let data={
        country_id:country_id,
        state_id:state_id
      }
      this.userinfoService.postData(data,'city/list').then((result)=>{
        if(result['status_code']==200) {
          this.CityList=result['data'];
        }
        else{
            this.langService.apiFailureAlert(result['message'])
        }
      })
    }

}
