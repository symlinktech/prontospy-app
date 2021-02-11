import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../../auth-guard.service';
import { UserinfoService } from '../userinfo.service';
import { LanguageService } from '../../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-membership-info',
  templateUrl: './membership-info.component.html',
  styleUrls: ['./membership-info.component.scss']
})
export class MembershipInfoComponent implements OnInit {

//======================Professional & Member
professionalList:any;
professional_qualification:any;
authorization_profession:any;
member_name:any;
member_country:any;
member_region:any;
member_city:any;
member_reg_no:any;
member_date_reg:any;
CountryList:any;
StateList:any;
CityList:any;

first_name:any;
last_name:any;
personal_email:any;
  constructor(public userinfoService:UserinfoService,public authGuard:AuthGuardService,public langService:LanguageService) { }

  	ngOnInit() {
      $('.preloader').fadeIn(300);
  		var that=this
    	var country,state
  		this.getProfessionalList();
  		this.getCountryList();
	  	$('#member_date_reg').datetimepicker({format:'Y-m-d',timepicker:false,inline:false,lang:'en',scrollMonth : false,
    scrollInput : false,value:new Date()});
		  // $('.country').on('change', function() {
    //       country=this.value
    //       that.getStateList(this.value)
    //   });
      // $('.state').on('change', function() {
      //     state=this.value
      //     that.getCityList(country,state)
      // });
	}
    logout(){
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_id');
      this.authGuard.isLogged();
    }
    ngAfterViewInit(){
      this.getProfileDetails();
      //$('.select2').select2();
      //$('.select2-nosearch').select2({ minimumResultsForSearch: -1});
    }
    getProfileDetails(){
      let data={
        id:localStorage.getItem('user_id'),
        
      }
      this.userinfoService.postData(data,'profile/get').then((result)=>{
        if(result['status_code']==200){
//========================================Membership Info============================================
        this.member_country=result['data'].membership_country
        $("#member_country option[value=" + this.member_country + "]").prop("selected", true).trigger("change")
        this.member_region=result['data'].membership_region
        this.member_city=result['data'].membership_city
        // if(this.member_country) {
        //   this.getStateList(result['data'].membership_country)
        // }
        // if(this.member_region) {
        //   this.getCityList(result['data'].membership_country,result['data'].membership_region)
        // }
        this.first_name=result['data'].firstname;
        this.last_name=result['data'].lastname;
        this.personal_email=result['data'].personal_email;
        if(result['data'].professional_qualifications) {
          this.professional_qualification=result['data'].professional_qualifications.split(",");
          for(let m=0;m<this.professional_qualification.length;m++){
            $("#professional_qualification option[value=" + this.professional_qualification[m] + "]").prop("selected", true).trigger("change")
          }
        }
        
        this.authorization_profession=result['data'].authorization_profession;
        if(this.authorization_profession=="1") {
          $("input[name='checkbox-professional_declaration']").prop("checked", true)
        }
        
        this.member_date_reg=result['data'].membership_date_reg
        $('#member_date_reg').val(this.member_date_reg);
        this.member_name=result['data'].membership_name
        this.member_reg_no=result['data'].membership_reg_no
        $('.preloader').fadeOut(300);
//===================================================================================================
        }
        else{
          $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
  	updateMemberInfo(){
	    this.professional_qualification=$('#professional_qualification').val();
	    this.member_country =$('#member_country').val();
	    this.member_region=$('#member_region').val();
	    this.member_city=$('#member_city').val();
	    this.member_date_reg=$('#member_date_reg').val();
    	this.authorization_profession=(($("input[name='checkbox-professional_declaration'").is(":checked")==true)?'1':'');
    
	    let data={
	      id:localStorage.getItem('user_id'),
	      professional_qualifications:this.professional_qualification,
	      authorization_profession:this.authorization_profession,
	      membership_name:this.member_name,
	      membership_country:this.member_country,
	      membership_region:this.member_region,
	      membership_city:this.member_city,
	      membership_reg_no:this.member_reg_no,
	      membership_date_reg:this.member_date_reg,
	    }
	    this.userinfoService.postData(data,'profile/membership-information/update').then((result)=>{
	      if(result['status_code']==200) {
	        this.langService.apiSuccessAlert(result['message'])
	      }
	      else{
	        this.langService.apiFailureAlert(result['message'])
	      }
	    })
  	}
    getProfessionalList(){
	    let data={
	      
	    }
	    this.userinfoService.postData(data,'professional-qualification/list').then((result)=>{
	      if(result['status_code']==200) {
	       this.professionalList=result['data']
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
