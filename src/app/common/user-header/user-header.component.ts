import { Component, OnInit, Input } from '@angular/core';
import { UserinfoService } from '../../components/userinfo/userinfo.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
 url=this.router.url
private _name = '';

  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }

  get name(): string { return this._name; }
first_name:any;
last_name:any;
email:any;
image:any;
  constructor(public userinfoService:UserinfoService,public router:Router) { }

  ngOnInit() {
  	this.getProfileDetails();
  }
  ngAfterViewInit(){
    // $('#sideMenuTrigger').on('click', function(){
    //   $("#modSideMenu").animate({
    //     width: 'toggle'
    //   });
    // });
  }

  getProfileDetails(){
  	let data={
  		
  		id:localStorage.getItem('user_id')
  	}
  	this.userinfoService.postData(data,'profile/get').then((result)=>{
  		if(result['status_code']==200) {
  			this.first_name=result['data'].firstname;
          	this.last_name=result['data'].lastname;
          	this.image=result['data'].image
          	this.email=localStorage.getItem('user_email');
  		}
  		else{
  			$.dialog({
              title: 'Failure',
              content: result['message'],
          	});
  		}
  	})
  }
}
