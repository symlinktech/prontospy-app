import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentDetailsService } from './appointment-details.service';
import { LanguageService } from '../../i18n/language.service';
import { InvoiceComponent } from '../invoice/invoice.component';
import { environment } from '../../../environments/environment'

declare var $;
declare var moment;
declare var tz;
@Component({
  providers:  [InvoiceComponent],	
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppointmentDetailsComponent implements OnInit {
Reviews:any;
communication:any;
empathy_and_flexibility:any;
rating:any;
reliable_and_trustworthy:any;
appointment_id:any;
consultant_id:any;
name="Appointment";
appointmentData={'date':'','start_time':'','end_time':'','timezone':'','profile_name':'','amount':'','currency':'','payment_status':0,'cron_status':0,'cron_message':'','authorization_amount':0,'appointment_id':''}
admin_percentage=0;
admin_amount=0;
total_amount=0;
user_id:any;
role:any;
fiscal_business_name:any;
professional_qualifications:any;
membership_city:any;
membership_name:any;
membership_region:any;
membership_reg_no:any;
membership_date_reg:any;
insurance_company_name:any;
insurance_expiration:any;
insurance_number:any;
fiscal_address:any;
fiscal_city:any;
fiscal_country:any;
fiscal_code:any;
fiscal_pec:any;
fiscal_province:any;
fiscal_sdi:any;
fiscal_vatno:any;
fiscal_zipcode:any;
personal_email:any;
services:any;
mode:any;
timeDuration:any;
price_per_min:any;
consultant_price:any;
payable_amount=0;
payout_amount=0;
consultant_insurance_available_status=2;
@ViewChild('invoice_pdf', {static: false}) invoice_pdf: ElementRef;
baseUrl=environment.baseUrl
  constructor(public activatedRoute:ActivatedRoute,public appoimentService:AppointmentDetailsService,public langService:LanguageService) { }

  	ngOnInit() {
  		this.user_id=localStorage.getItem('user_id')
  		this.role=localStorage.getItem('role')
  		$('#details').removeClass('d-none')
  	 	$(".card-nav a").click(function(){
        	$(this).tab('show');
      	});
      	this.activatedRoute.queryParams.subscribe((res)=>{
      		this.consultant_id=res.con_id;
      		this.appointment_id=res.app_id;
      		this.getAppointment();
      	})
  	}

    showDiv(id){
	    if(id=='details') {
		    $('#details').removeClass('d-none')
		    $('#payments').addClass('d-none')
		    $('#reviews').addClass('d-none')
	    }
	    else if(id=='reviews'){
		    $('#reviews').removeClass('d-none')
		    $('#details').addClass('d-none')
		    $('#payments').addClass('d-none')
	    }
	    else if(id=='payments') {
	    	$('#payments').removeClass('d-none')
	      	$('#details').addClass('d-none')
	      	$('#reviews').addClass('d-none')
	    }
	}
	emailInvoice(){
		let data={
			appointment_id:this.appointment_id
		}
		this.appoimentService.getData('send-invoice/'+this.appointment_id).then((result)=>{
			if(result['status_code']==200) {
				this.langService.apiSuccessAlert(result['message'])
			}
			else{
				this.langService.apiFailureAlert(result['message'])
			}
		})
	}
	getAppointment(){
	  	let data={
	      appointment_id:this.appointment_id
	  	}
	  	this.appoimentService.postData(data,'profile/appointment/get').then((result)=>{
	  		if(result['status_code']==200) {
	  			this.consultant_id=result['data'].consultant_id
	  			this.appointmentData.timezone=result['data'].timezone
	  			this.appointmentData.appointment_id=result['data'].appointment_id
	  			this.appointmentData.start_time=result['data'].appointment_start_time
	  			this.appointmentData.end_time=result['data'].appointment_end_time
	  			this.appointmentData.date=result['data'].appointment_date
	  			this.appointmentData.authorization_amount=result['data'].authorization_amount
	  			var today:any = new Date(this.appointmentData.date+" "+this.appointmentData.start_time);
				var Christmas:any = new Date(this.appointmentData.date+" "+this.appointmentData.end_time);
				var diffMs = (Christmas - today); // milliseconds between now & Christmas
				var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
				this.timeDuration=diffMins+ " minutes"
	  			this.appointmentData.amount=result['data'].amount
	  			this.price_per_min=result['data'].consultant_price
	  			this.payable_amount=this.price_per_min*diffMins
	  			this.appointmentData.currency=result['data'].currency
	  			this.appointmentData.payment_status=result['data'].payment_status
	  			this.appointmentData.cron_status=result['data'].cron_status
	  			this.appointmentData.cron_message=result['data'].cron_message
	  			this.admin_percentage=result['data'].admin_percentage
	  			this.payout_amount=this.payable_amount-parseFloat(result['data'].admin_amount)
	  			this.admin_amount=parseFloat(result['data'].admin_amount)
	  			this.total_amount=this.payable_amount
	  			if(localStorage.getItem('user_id')==result['data'].user_id) {
	  				this.appointmentData.profile_name=result['data'].consultant_profile_name
	  			}
	  			else{
	  				this.appointmentData.profile_name=result['data'].user_profile_name
	  			}
	  			this.fiscal_business_name=(this.role=='consultant')?result['data'].user_fiscal_business_name:result['data'].consultant_fiscal_business_name
		        this.professional_qualifications=(this.role=='consultant')?result['data'].user_professional_qualifications:result['data'].consultant_professional_qualifications
		        this.membership_city=(this.role=='consultant')?result['data'].user_membership_city:result['data'].consultant_membership_city
		        this.membership_name=(this.role=='consultant')?result['data'].user_membership_name:result['data'].consultant_membership_name
		        this.membership_region=(this.role=='consultant')?result['data'].user_membership_region:result['data'].consultant_membership_region
		        this.membership_reg_no=(this.role=='consultant')?result['data'].user_membership_reg_no:result['data'].consultant_membership_reg_no
		        this.membership_date_reg=(this.role=='consultant')?result['data'].user_membership_date_reg:result['data'].consultant_membership_date_reg
		        this.insurance_company_name=(this.role=='consultant')?result['data'].user_insurance_company_name:result['data'].consultant_insurance_company_name
		        this.insurance_expiration=(this.role=='consultant')?result['data'].user_insurance_expiration:result['data'].consultant_insurance_expiration
		        this.insurance_number=(this.role=='consultant')?result['data'].user_insurance_number:result['data'].consultant_insurance_number
		        this.fiscal_address=(this.role=='consultant')?result['data'].user_fiscal_address:result['data'].consultant_fiscal_address
		        this.fiscal_city=(this.role=='consultant')?result['data'].user_fiscal_city:result['data'].consultant_fiscal_city
		        this.fiscal_country=(this.role=='consultant')?result['data'].user_fiscal_country:result['data'].consultant_fiscal_country
		        this.fiscal_code=(this.role=='consultant')?result['data'].user_fiscal_code:result['data'].consultant_fiscal_code
		        this.fiscal_pec=(this.role=='consultant')?result['data'].user_fiscal_pec:result['data'].consultant_fiscal_pec
		        this.fiscal_province=(this.role=='consultant')?result['data'].user_fiscal_province:result['data'].consultant_fiscal_province
		        this.fiscal_sdi=(this.role=='consultant')?result['data'].user_fiscal_sdi:result['data'].consultant_fiscal_sdi
		        this.fiscal_vatno=(this.role=='consultant')?result['data'].user_fiscal_vatno:result['data'].consultant_fiscal_vatno
		        this.fiscal_zipcode=(this.role=='consultant')?result['data'].user_fiscal_zipcode:result['data'].consultant_fiscal_zipcode
		        this.personal_email=(this.role=='consultant')?result['data'].user_personal_email:result['data'].consultant_personal_email
		        this.services=result['data'].appointment_type
		        this.consultant_insurance_available_status=result['data'].consultant_insurance_available_status
		        this.mode=(this.role=='consultant')?result['data'].service_type:result['data'].service_type
	  			moment.tz.setDefault(this.appointmentData.timezone);
	            var tz = localStorage.getItem('user_timezone');
	            this.appointmentData.date=moment(this.appointmentData.date+' '+this.appointmentData.start_time).tz(tz).format("YYYY-MM-DD")
	            this.appointmentData.start_time=moment(this.appointmentData.date+' '+this.appointmentData.start_time).tz(tz).format("H:mm:ss")
	            this.appointmentData.end_time=moment(this.appointmentData.date+' '+this.appointmentData.end_time).tz(tz).format("H:mm:ss")
	  			this.getReviews();
	  		}
	  		else{
	        this.langService.apiFailureAlert(result['message'])
	  		}
	  	})
	  }
	getReviews(){
	    let data={
	      user_id:this.consultant_id,
	      appointment_id:this.appointment_id
	    }
	    this.appoimentService.postData(data,'review/list').then((result)=>{
	      if(result['status_code']==200) {
	        this.Reviews=result['data'];
	        if(this.Reviews.length>0) {
	          for(let i=0;i<this.Reviews.length;i++){
	            var splitted_name=this.Reviews[i].profile_name.split(" ")
	            if(splitted_name.length==3) {
	              this.Reviews[i]['first_name']=splitted_name[0]
	              this.Reviews[i]['middle_name']=splitted_name[1]
	              this.Reviews[i]['last_name']=this.returnFistChar(splitted_name[2])
	            }
	            else{
	              this.Reviews[i]['first_name']=splitted_name[0]
	              this.Reviews[i]['last_name']=this.returnFistChar(splitted_name[1])
	            }
	            
	          }
	        }
	        this.getReviewsAverage();
	      }
	      else{
	        this.langService.apiFailureAlert(result['message'])
	      }
	    })
	}
	returnFistChar(myStr){
    	return myStr.match(/\b(\w)/g);
  	}
	getReviewsAverage(){
      let data={
        user_id:this.consultant_id,
        appointment_id:this.appointment_id
      }
      this.appoimentService.postData(data,'review/average').then((result)=>{
        if(result['status_code']==200) {
          this.communication=parseFloat(result['data'].communication).toFixed(2)
          this.empathy_and_flexibility=parseFloat(result['data'].empathy_and_flexibility).toFixed(2)
          this.rating=result['data'].rating=parseFloat(result['data'].rating).toFixed(2)
          this.reliable_and_trustworthy=parseFloat(result['data'].reliable_and_trustworthy).toFixed(2)
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
   }
}
