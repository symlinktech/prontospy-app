import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../../auth-guard.service';
import { UserinfoService } from '../userinfo.service';
import { LanguageService } from '../../../i18n/language.service';
declare var $;

@Component({
  selector: 'app-biography-info',
  templateUrl: './biography-info.component.html',
  styleUrls: ['./biography-info.component.scss']
})
export class BiographyInfoComponent implements OnInit {
//=====================Biography
biography_short_description:any;
biography_long_description:any;
first_name:any;
last_name:any;
personal_email:any;
  constructor(public userinfoService:UserinfoService,public authGuard:AuthGuardService,public langService:LanguageService) { }

  ngOnInit() {
    this.getProfileDetails();
  }
   logout(){
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    this.authGuard.isLogged();
  }
  getProfileDetails(){
       $('.preloader').fadeIn(300);
      let data={
        id:localStorage.getItem('user_id'),
        
      }
      this.userinfoService.postData(data,'profile/get').then((result)=>{
        if(result['status_code']==200){
          this.first_name=result['data'].firstname;
          this.last_name=result['data'].lastname;
          this.personal_email=result['data'].personal_email;
  //=====================================Biography Info=================================================
        this.biography_long_description=result['data'].biography_long_description
        this.biography_short_description=result['data'].biography_short_description
        $('.preloader').fadeOut(300);
//====================================================================================================
        }
        else{
          $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
  }
  updateBiographyInfo(){
     let data={
      id:localStorage.getItem('user_id'),
      biography_short_description:this.biography_short_description,
      biography_long_description:this.biography_long_description
    }
    this.userinfoService.postData(data,'profile/biography-information/update').then((result)=>{
      if(result['status_code']==200) {
        this.langService.apiSuccessAlert(result['message'])
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
}
