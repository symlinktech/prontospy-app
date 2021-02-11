import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsService } from './cms.service';
import { LanguageService } from '../../i18n/language.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin} from "rxjs";
import {tap} from "rxjs/operators";
declare var $;
@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {
currentUrl=this.router.url;
CMSData:any={name:'',description:''};
WebCount:any={appointment:'',consultant:'',intervention:'',user:''};
OfferedList:any;
OnlineServiceList:any;
  constructor(public router:Router, public cmsService:CmsService,public langService:LanguageService) { }

    ngOnInit() {
      $('.preloader').fadeIn(300);
      //console.log(this.router.url)
        if(this.router.url=='/about-us') {
          this.requestDataFromMultipleSources().subscribe(responseList => {
            if(responseList.length==4) {
              $('.preloader').fadeOut(300);
            }
          })
        }
        else{
          //console.log('hi')
          this.getCMS()
        }
    }
     public requestDataFromMultipleSources(): Observable<any[]> {
      
      if(this.router.url=='/about-us') {
         let response1 =this.getWebCount();
         let response2 =this.getOnlineServices();
         let response3 =this.getOffers();
         let response4 =this.getCMS();
          return forkJoin([response1,response2,response3,response4]);
      }
      else{
         let response1 =this.getCMS();
         return forkJoin([response1]);
      }
      //this.currentUrl=this.router.url;
    }
  getCMS(){
    let data={
      alias:(this.router.url=='/about-us')?'home':this.router.url.replace("/", "")
    }
    this.cmsService.postData(data,'page/details').then((result)=>{
      if(result['status_code']==200) {
        this.CMSData.name=result['data'].name
        this.CMSData.description=result['data'].description
        $('.preloader').fadeOut(300);
      }
      else{

      }
    })
  }
  getOnlineServices(){
    let data={

    }
    return this.cmsService.postData(data,'online-service/list').then((result)=>{
      if(result['status_code']==200) {
        this.OnlineServiceList=result['data'];
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
  getOffers(){
    let data={

    }
    return this.cmsService.postData(data,'offer-service/list').then((result)=>{
      if(result['status_code']==200) {
        this.OfferedList=result['data'];
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
  getWebCount(){
    let data={

    }
    return this.cmsService.postData(data,'home/count').then((result)=>{
      if(result['status_code']==200) {
        this.WebCount.appointment=result['data'].appointment;
        this.WebCount.consultant=result['data'].consultant;
        this.WebCount.intervention=result['data'].intervention;
        this.WebCount.user=result['data'].user;
      }
      else{
        this.langService.apiFailureAlert(result['message'])
      }
    })
  }
}
