import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthGuardService } from '../../../auth-guard.service';
import { UserinfoService } from '../userinfo.service';
import { LanguageService } from '../../../i18n/language.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin} from "rxjs";
import { tap } from "rxjs/operators";
declare var $;
@Component({
  selector: 'app-language-info',
  templateUrl: './language-info.component.html',
  styleUrls: ['./language-info.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LanguageInfoComponent implements OnInit {
//====================Spoken Lang
spoken_lang:any=[];
LanguageList:any=[];
first_name:any;
last_name:any;
personal_email:any;
count=0;
display:any;
title_value=''
  constructor(public userinfoService:UserinfoService,public authGuard:AuthGuardService,public langService:LanguageService) { }

  	ngOnInit() {
      $('.preloader').fadeIn(300);
	  	// $('.select2').select2();
	   //  $('.select2-nosearch').select2({ minimumResultsForSearch: -1});
	  	this.getLanguageList();
      //this.getProfileDetails();
  	}
    ngAfterViewInit(){
      
  }
  initializeFun(){
    if(this.count==0) {
        var _this=this
        $('.select-dropdown .dropdown-menu').on('click', function(){
        event.stopPropagation();
        });
        $('.select-dropdown .dropdown-list .custom-radio').on('click', function(){
        var selected = [];
        var selectedHtml = [];
        var container = $(this).parents('.select-dropdown');
        _this.spoken_lang=[]
        var checkedList = container.find('.custom-radio-input:checked');
        var display = $(this).parents('.dropdown-menu').siblings('.data-toggle');
        console.log(_this.display)
        checkedList.each(function() {
        _this.spoken_lang.push($(this).val())
        selected.push($(this).val());
        selectedHtml.push('<span>'+$(this).data('value')+'</span>');
        });
        display.attr('title', selectedHtml);
        if(checkedList.length > 0){
          if(checkedList.length > 4){
            display.html('<span>'+checkedList.length+' Selected</span>');
          }
          else{
            display.html(selectedHtml);
          }
        }
        else{
          display.html('Select');
        }
      //console.log(selected);
      });
      this.count++
    }
  }
   

    getProfileDetails(){
      let data={
        id:localStorage.getItem('user_id'),
        
      }
      this.userinfoService.postData(data,'profile/get').then((result)=>{
        if(result['status_code']==200){
          this.first_name=result['data'].firstname;
          this.last_name=result['data'].lastname;
          this.personal_email=result['data'].personal_email;
//=======================================Langugae  Info===============================================
        if(result['data'].language_ids) {
          this.spoken_lang=result['data'].language_ids.split(",");
          var selectedHtml = [];
          var selectName=[]
          for(let i=0;i<this.LanguageList.length;i++){
            if(this.spoken_lang.indexOf(this.LanguageList[i].id.toString())!=-1) {
              this.LanguageList[i]['checked']=true
              selectName.push(this.LanguageList[i].name);
              selectedHtml.push('<span>'+this.LanguageList[i].name+'</span>');
            }
          }
          $('#lang_name').html(selectedHtml);
          this.title_value=selectName.join(",")
          //display.html(selectedHtml);
        }
        $('.preloader').fadeOut(300);
//====================================================================================================
        }
        else{
          $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
    }
  	updateSpokenLangInfo(){
	    //this.spoken_lang=$('#spoken_lang').val();
	    let data={
	      id:localStorage.getItem('user_id'),
	      language_ids:this.spoken_lang.join(",")
	    }
      console.log(data)
	    this.userinfoService.postData(data,'profile/language-information/update').then((result)=>{
	      if(result['status_code']==200) {
	        this.langService.apiSuccessAlert(result['message'])
	      }
	      else{
	        this.langService.apiFailureAlert(result['message'])
	      }
	    })
  	}
    async getLanguageList(){
      let data={
        
      }
      await this.userinfoService.postData(data,'language/list').then(async(result)=>{
        if(result['status_code']==200) {
          this.LanguageList=await result['data'];
          this.getProfileDetails()
          
        }
        else{
          //$('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
  }
}
