import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthGuardService } from '../../auth-guard.service';
import { HeaderService } from './header.service';
import { TranslateService } from '@ngx-translate/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../common.service';
declare var $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
isLoggedInCheck:boolean;
language_name:any;
Settings={customer_support:'',email:'',facebook_link:'',google_plus_link:'',instagram_link:'',twitter_link:'',title:'',company_history:''}
notificationList:any=[];
baseUrl:any=environment.baseUrl;
flag_image:any;
count=1;
role=localStorage.getItem('role')
image:any;
  constructor(public authGuard:AuthGuardService,public headerService:HeaderService,public translate: TranslateService,public socket:Socket,public commService:CommonService,public router:Router,public activatdRoute:ActivatedRoute) { }

  ngOnInit() {
    var image=this.commService.getImage()
    console.log(this.commService.getImage())
    if(image) {
      this.image=image
    }
    else{
      this.image=localStorage.getItem('image')
    }
    //this.getNotification();
  	this.getSiteSettings();
  	this.language_name=(this.translate.currentLang=='en')?'English':(this.translate.currentLang=='es')?'Spanish':(this.translate.currentLang=='it')?'Italian':'English';
    this.flag_image=(this.translate.currentLang=='en')?'assets/img/gb.svg':(this.translate.currentLang=='es')?'assets/img/es.svg':(this.translate.currentLang=='it')?'assets/img/it.svg':'assets/img/gb.svg';
  	
    console.log(this.translate.currentLang)
  }
    get isLoggedStorage(): any {
  		//alert(this.authGuard.isLoggedStorage)
        return (localStorage.getItem('login_status')=='true')?'true':'false'
    }
    get userRole(): any {
      //alert(this.authGuard.isLoggedStorage)
        return (localStorage.getItem('role'))
    }
    get userImage(): any {
      //alert(this.authGuard.isLoggedStorage)
        return (localStorage.getItem('image'))
    }
    ngDoCheck(){
      if(this.count==1) {
        if(localStorage.getItem('user_id') && this.isLoggedStorage=='true') {
          this.role=localStorage.getItem('role')
          this.getNotification()
          this.count++
        }
      }
    }
    changeLanguage(lang){
      // var html=document.getElementById(lang);
      //  $("#dropdown-toggle").html(html);
    	this.translate.use(lang)
    	this.translate.setDefaultLang(lang);
    	this.language_name=(lang=='en')?'English':(lang=='es')?'Spanish':(lang=='it')?'Italian':'English'
      this.flag_image=(lang=='en')?'assets/img/gb.svg':(lang=='es')?'assets/img/es.svg':(lang=='it')?'assets/img/it.svg':'assets/img/gb.svg';
      setTimeout(function(){
        window.location.reload();
      },500)
      
    	
    }
    getSiteSettings(){
	    let data={
	      
	    }
	    this.headerService.postData(data,'site/settings').then((result)=>{
	      if(result['status_code']==200) {
	      	this.Settings.customer_support=result['data'].customer_support;
	      	this.Settings.email=result['data'].email;
	      	this.Settings.facebook_link=result['data'].facebook_link;
	      	this.Settings.google_plus_link=result['data'].google_plus_link;
	      	this.Settings.instagram_link=result['data'].instagram_link;
	      	this.Settings.twitter_link=result['data'].twitter_link;
	      	this.Settings.title=result['data'].title;
	      	this.Settings.company_history=result['data'].company_history;
          this.commService.setBannerData(result['data'])
	        //this.Settings=result['data'];
	        
	      }
	      else{
	         $.dialog({
	            title: 'Failure',
	            content: result['message']
	        });
	      }
	    })
  	}
  	getNotification(){
  		if (localStorage.getItem('user_id')) {
        console.log('emit')
  			this.socket.emit('getNotification', {
  				user_id: localStorage.getItem('user_id'),
  				last_id: 0,
  				first_time:1,
          lang_code:this.translate.currentLang
  			});
  		}
      var that=this
  		this.socket.on('get-notification', (data) =>{
  			if (data.result.length > 0 && data.user_id == localStorage.getItem('user_id')) {
  				var last_id = data.result[0].id;
  				if (this.notificationList.length>0) {
            data.result.reverse()
            var that=this
            $.each(data.result,function(index,value){
              that.notificationList.unshift(value)
            })
  				}
          else{
            this.notificationList=data.result
          }
  				this.socket.emit('getNotification', {
  					user_id: localStorage.getItem('user_id'),
  					last_id: last_id,
  					first_time:2,
            lang_code:this.translate.currentLang
  				});
  			} 
        else {
  				this.socket.emit('getNotification', {
  					user_id: localStorage.getItem('user_id'),
  					last_id: data.last_id,
  					first_time:2,
            lang_code:this.translate.currentLang
  				});
  			}
  		});
  	}

		clearNoti(id,i) {
			this.socket.emit('clearNotification', {
				user_id: localStorage.getItem('user_id'),
				id: id
			});
			if (id == 0) {
        this.notificationList=[]
			} 
      else {
				this.notificationList.splice(i,1)
			}
		}
}
