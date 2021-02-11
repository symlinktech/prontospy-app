import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../auth-guard.service';
import { HeaderService } from '../header/header.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
role:any=localStorage.getItem('role');
user_id=localStorage.getItem('user_id');
active_status:any;
  constructor(public authGuard:AuthGuardService, public headerService:HeaderService, public router:Router) { }

  ngOnInit() {
    this.getStatus()
    console.log('sidebar')
  }
  navigatePage(){
    this.router.navigate(['/consultant-details'],{queryParams:{id:this.user_id}})
  }
  logout(){
    this.autoStatusChange()
  }
  changeStatus(){
    if(this.active_status!='3') {
      let data={
        id:localStorage.getItem('user_id'),
        status:(this.active_status=='2' || this.active_status=='3')?'1':'2'
      }
      this.headerService.postData(data,'profile/update-status').then((result)=>{
        if(result['status_code']==200) {
          this.getStatus()
          localStorage.setItem('active_status',status)
        }
        else{

        }
      })
    }
      
  }
  autoStatusChange(){
    let data={
      id:localStorage.getItem('user_id'),
      status:'2'
    }
    this.headerService.postData(data,'profile/update-status').then((result)=>{
      if(result['status_code']==200) {
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role');
        localStorage.removeItem('count');
        localStorage.removeItem('user_timezone')
        localStorage.removeItem('user_offset')
        localStorage.removeItem('image')
        this.authGuard.isLogged();
        this.router.navigate(['']).then(()=>{
          window.location.reload()
        })
      }
      else{

      }
    })
  }
  getStatus(){
    let data={
      id:localStorage.getItem('user_id')
    }
    this.headerService.postData(data,'consultant/status').then((result)=>{
      if(result['status_code']==200) {
        this.active_status=result['data'].active_status
      }
      else{

      }
    })
  }
}
