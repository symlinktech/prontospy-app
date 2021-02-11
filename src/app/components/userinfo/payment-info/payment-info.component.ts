import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef, ElementRef  } from '@angular/core';
import { AuthGuardService } from '../../../auth-guard.service';
import { NgForm } from "@angular/forms"
import { UserinfoService } from '../userinfo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../i18n/language.service';
import { TranslateService } from '@ngx-translate/core';

declare var $;
declare var Stripe;
@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
@ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
card_number:any;
card_holder:any;
expiration_day:any;
stripe:any;
card: any;
iban:any;
Usermsg:any;
role:any=localStorage.getItem('role');
first_name:any;
last_name:any;
personal_telephone:any;
email:any;
personal_dob:any;
code:any;
state:any;
checkStripe:any=true;
originalUrl:any;
last4Digit:any;
CardBrand:any;
  constructor(public authGuard:AuthGuardService,public translate: TranslateService,public userinfoService:UserinfoService,private cd: ChangeDetectorRef, public activatedRoute:ActivatedRoute,public langService:LanguageService, public router:Router) { }

  ngOnInit() {
    $('.preloader').fadeIn(300);
    this.originalUrl = window.location.origin;
     if(localStorage.getItem('user_id')) {
        this.activatedRoute.queryParams.subscribe((res)=>{
          //this.role=((localStorage.getItem('role')=='consultant' && res.show=='1')?'user':localStorage.getItem('role'))
          if(res.code && res.state) {
            this.connectStripeApi(res.code,res.state);
          }
          this.getCardDetails()
          this.getProfileDetails();
          this.StripeCheck();
       })
      }
      else{
        this.router.navigate(['/login'])
      }
      if(this.role=='user') {
      this.setupStripe();
    }
  }
  // ngAfterViewInit() {
  //   if(this.role=='user') {
  //     this.setupStripe();
  //   }
  //   // else{
  //   //   this.setUpIban();
  //   // }
  // }
  getCardDetails(){
    let data={
        id:localStorage.getItem('user_id')
    }
    this.userinfoService.postData(data,'profile/stripe-customer/get').then((result)=>{
      if(result['status_code']==200) {
        if(result['data'].length>0) {
          this.last4Digit=result['data'][0].last4
          this.CardBrand=result['data'][0].brand
        }
        const currentLang = this.translate.currentLang;
        const returnValue = this.translate.translations[currentLang]['user_card_added_msg'];
        this.Usermsg=returnValue
        $('#user_msg').html(this.Usermsg)
      }
      else{
        // $.dialog({
        //     title: 'Failure',
        //     content: result['message'],
        // });
      }
    })
  }
  setupStripe() {
    this.stripe=Stripe('pk_test_51GxqGLGRfcBcvK9WTraDAbrRRTA7POPrTYc3fIq1L6CncO7ei5aGBbHudCeKje13HTTyHwGa78X1OZUOWfdkIcCx001yuEfXA1');
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });
    //var auBankAccountElement = elements.create('auBankAccount');

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(event)

      this.stripe.createToken(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
          //this.makePayment(result.source.id);
        }
      });
    });
  }
  stripePayment(){
    this.stripe.createToken(this.card).then(result => {
      if (result.error) {
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        console.log(result);
        this.CardUpdate(result.token.id);
      }
    });
  }
  CardUpdate(id){
    let data={
      id:localStorage.getItem('user_id'),
      token:id
    }
    this.userinfoService.postData(data,'profile/stripe-card/update').then((result)=>{
      if(result['status_code']==200) {
        this.langService.apiSuccessAlert(result['message'])
        window.location.reload()
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
      if(result['status_code']==200) {
        this.first_name=result['data'].firstname;
        this.last_name=result['data'].lastname;
        this.personal_telephone=result['data'].personal_telephone
        this.personal_dob=result['data'].personal_dob;
        this.email=localStorage.getItem('user_email');
        $('.preloader').fadeOut(300);
      }
      else{
        $('.preloader').fadeOut(300);
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
  StripeCheck(){
    let data={
      id:localStorage.getItem('user_id'),
    }
    this.userinfoService.postData(data,'profile/stripe-account/get').then((result)=>{
      if(result['status_code']==200) {
        const currentLang = this.translate.currentLang;
        const returnValue = this.translate.translations[currentLang]['stripe_account_connected'];
        console.log(returnValue)
        $('#user_msg').html(returnValue)
        this.checkStripe=true
      }
      else{
        this.checkStripe=false
      }
    })
  }
  connectStripe(){
    //ca_H2tJbrdiGhDTUCGDeS916phnHBLAvbrF doomcare
    //ca_HQWacU3dWPCanMZ7CtBUYX77xbR7YHpl prontopsy
    //ca_HYNXq5R8FCunnbu3bg5dMmzY2km9GhHB global
    var url="https://connect.stripe.com/express/oauth/authorize?redirect_uri="+this.originalUrl+"/account/consultant/myprofile/payment-info&client_id=ca_HYNXq5R8FCunnbu3bg5dMmzY2km9GhHB&state="+localStorage.getItem('user_id')+"&suggested_capabilities[]=card_payments&suggested_capabilities[]=transfers"
    // var url="https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:4200/payment-info&client_id=ca_HQWacU3dWPCanMZ7CtBUYX77xbR7YHpl&state"+localStorage.getItem('user_id')+"&stripe_user[country]=IT&suggested_capabilities[]=card_payments&suggested_capabilities[]=transfers"

    // var url="https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:4200/payment-info&client_id=ca_HQWacU3dWPCanMZ7CtBUYX77xbR7YHpl&stripe_user[email]="+this.email+"&state="+localStorage.getItem('user_id')+"&stripe_user[phone_number]="+((this.personal_telephone)?this.personal_telephone:'')+"&stripe_user[first_name]="+this.first_name+"&stripe_user[last_name]="+this.last_name+"&stripe_user[dob_day]="+date+"&stripe_user[dob_month]="+month+"&stripe_user[dob_year]="+year+""
    // console.log(url)
    window.open(url, "_self");
  }
  connectStripeApi(code,state){
    let data={
      code:code,
      id:state,
      //token_user_id:this.userData.user_id
    }
    this.userinfoService.postData(data,'profile/connect-stripe-account').then((result)=>{
      if(result['status_code']==200) {
        this.langService.apiSuccessAlert(result['message'])
        this.router.navigate(['/account/consultant/myprofile/payment-info'])
        this.checkStripe=false
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
}
