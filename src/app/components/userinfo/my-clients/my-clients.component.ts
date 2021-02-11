import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../i18n/language.service';
declare var $;

@Component({
  selector: 'app-my-clients',
  templateUrl: './my-clients.component.html',
  styleUrls: ['./my-clients.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyClientsComponent implements OnInit {
name='my_clients';
appointmentList:any;
parent_id:any;
user_id:any;
    constructor(public userService:UserinfoService,public router:Router,public activatedRoute:ActivatedRoute,public langService:LanguageService) { }

    ngOnInit() {
    $('.preloader').fadeIn(300);
    this.user_id=localStorage.getItem('user_id')
    this.getAppointment();
  }

  getAppointment(){
  	let data={
      user_id:localStorage.getItem('user_id')
  	}
  	this.userService.postData(data,'profile/appointment/get').then((result)=>{
  		if(result['status_code']==200){
  			this.appointmentList=result['data']
  			for(let i=0;i<this.appointmentList.length;i++){
  				this.appointmentList[i].wishlist_id=null
  			}
        	$('.preloader').fadeOut(300);
  		}
  		else{
        $('.preloader').fadeOut(300);
  			this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
      addWishlist(consultant_id,index,type){
      if(localStorage.getItem('user_id')) {
          let data={
            user_id:localStorage.getItem('user_id'),
            consultant_id:consultant_id
          }
          this.userService.postData(data,'wishlist/add').then((result)=>{
            if(result['status_code']==200) {
              this.langService.apiSuccessAlert(result['message'])
              if(type==1) {
                this.appointmentList[index].wishlist_id=result['data'].id
              }
              else{
                this.appointmentList[index].wishlist_id=null
              }
            }
            else{
              this.langService.apiFailureAlert(result['message'])
            }
          })
      }
      else{
        this.langService.failureAlert('you_need_to_login')
      }
    }

}
