import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthGuardService } from '../../../auth-guard.service';
import { UserinfoService } from '../userinfo.service';
import { LanguageService } from '../../../i18n/language.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin} from "rxjs";
import { tap } from "rxjs/operators";
declare var $;
@Component({
  selector: 'app-intervention-specialization-info',
  templateUrl: './intervention-specialization-info.component.html',
  styleUrls: ['./intervention-specialization-info.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class InterventionSpecializationInfoComponent implements OnInit {
//====================Intervention
intervention_ids:any;
therapeutic_ids:any;
mental_ids:any;
psycho_ids:any;
others_ids:any;
InterventionList:any;
SpecializationList:any;
TherapeuticList:any=[];
MentalList:any=[];
PsychologicalList:any=[];
OthersList:any=[];
first_name:any;
last_name:any;
personal_email:any;
intervention_text:any='';
specialization_therapeutic_text:any='';
specialization_mental_text:any='';
specialization_psycho_text:any='';
specialization_others_text:any='';
int_count=0;
spec_count=0;
title_intervention_value='';
intervention_toggle=false;
title_therapeutic_value='';
therapeutic_toggle=false;
mental_count=0;
title_mental_value='';
mental_toggle=false;
title_psycho_value='';
psycho_count=0;
psycho_toggle=false;
other_count=0;
other_toggle=false;
title_other_value='';
  constructor(public userinfoService:UserinfoService,public authGuard:AuthGuardService,public langService:LanguageService) { }

  	ngOnInit() {
      $('.preloader').fadeIn(300);
      this.getInterventionList();
      this.getSpecializationList();
  	}
    autoSearch(event,class_name){
      var input, filter, ul, li, i, txtValue;
      input = $('.dropdown-menu.'+class_name+' .form-control');
      filter = input.val().toLowerCase();
      ul = $('.dropdown-menu.'+class_name+' .dropdown-list');
      li = $('.dropdown-menu .dropdown-list .item');
      for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {  
          li[i].style.display = "none";
        }
      }
    }
    otherIntervention(){
      if(this.intervention_toggle==false) {
        $('.intervention').removeClass('d-none')
        this.intervention_toggle=true
      }
      else{
        $('.intervention').addClass('d-none')
        this.intervention_toggle=false
      }
    }
    otherTherapeutic(){
      if(this.therapeutic_toggle==false) {
        $('.therapeutic').removeClass('d-none')
        this.therapeutic_toggle=true
      }
      else{
        $('.therapeutic').addClass('d-none')
        this.therapeutic_toggle=false
      }
    }
    otherMental(){
      if(this.mental_toggle==false) {
        $('.mental').removeClass('d-none')
        this.mental_toggle=true
      }
      else{
        $('.mental').addClass('d-none')
        this.mental_toggle=false
      }
    }
    otherPsycho(){
      if(this.psycho_toggle==false) {
        $('.psychological').removeClass('d-none')
        this.psycho_toggle=true
      }
      else{
        $('.psychological').addClass('d-none')
        this.psycho_toggle=false
      }
    }
    otherOtherAdd(){
      if(this.other_toggle==false) {
        $('.others').removeClass('d-none')
        this.other_toggle=true
      }
      else{
        $('.others').addClass('d-none')
        this.other_toggle=false
      }
    }
    initializeInterventionFun(){
      if(this.int_count==0) {
        var _this=this
        $('.select-dropdown .dropdown-menu').on('click', function(){
          event.stopPropagation();
        });
        $('.select-dropdown .dropdown-list .custom-radio.intervention').on('click', function(){
          var selected = [];
          var selectedHtml = [];
          _this.intervention_ids=[]
          var container = $(this).parents('.select-dropdown');
          var checkedList = container.find('.custom-radio-input:checked');
          var display = $(this).parents('.dropdown-menu').siblings('.data-toggle');
          checkedList.each(function() {
            console.log($(this).val())
            selected.push($(this).val());
            _this.intervention_ids.push($(this).val())
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
        });
        this.int_count++
      }
    }
    initializeTherapeuticFun(){
      if(this.spec_count==0) {
        var _this=this
        $('.select-dropdown .dropdown-menu').on('click', function(){
          event.stopPropagation();
        });
        $('.select-dropdown .dropdown-list .custom-checkbox.therapeutic').on('click', function(){
          var selected = [];
          var selectedHtml = [];
          _this.therapeutic_ids=[];
          var container = $(this).parents('.select-dropdown');
          var checkedList = container.find('.custom-checkbox-input:checked');
          var display = $(this).parents('.dropdown-menu').siblings('.data-toggle');
          checkedList.each(function() {
            selected.push($(this).val());
            _this.therapeutic_ids.push($(this).val())
            if($(this).data('parent')) {
              if(_this.therapeutic_ids.indexOf($(this).data('parent').toString())===-1) {
                _this.therapeutic_ids.push($(this).data('parent').toString())
              }
            }
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
        });
        this.spec_count++
      }
    }
    initializeMentalFun(){
      if(this.mental_count==0) {
        var _this=this
        $('.select-dropdown .dropdown-menu').on('click', function(){
          event.stopPropagation();
        });
        $('.select-dropdown .dropdown-list .custom-checkbox.mental').on('click', function(){
          var selected = [];
          var selectedHtml = [];
          _this.mental_ids=[];
          var parent_id=[]
          var container = $(this).parents('.select-dropdown');
          var checkedList = container.find('.custom-checkbox-input:checked');
          var display = $(this).parents('.dropdown-menu').siblings('.data-toggle');
          checkedList.each(function() {
            selected.push($(this).val());
            _this.mental_ids.push($(this).val())
            if($(this).data('parent')) {
              if(_this.mental_ids.indexOf($(this).data('parent').toString())===-1) {
                _this.mental_ids.push($(this).data('parent').toString())
              }
            }
            
            //parent_id.push($(this).data('parent'))
            selectedHtml.push('<span>'+$(this).data('value')+'</span>');
          });
          //console.log(parent_id)
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
        });
        this.mental_count++
      }
    }
    initializePsychoFun(){
      if(this.psycho_count==0) {
        var _this=this
        $('.select-dropdown .dropdown-menu').on('click', function(){
          event.stopPropagation();
        });
        $('.select-dropdown .dropdown-list .custom-checkbox.psychological').on('click', function(){
          var selected = [];
          var selectedHtml = [];
          _this.psycho_ids=[];
          var parent_id=[]
          var container = $(this).parents('.select-dropdown');
          var checkedList = container.find('.custom-checkbox-input:checked');
          var display = $(this).parents('.dropdown-menu').siblings('.data-toggle');
          checkedList.each(function() {
            selected.push($(this).val());
            _this.psycho_ids.push($(this).val())
            if($(this).data('parent')) {
              if(_this.psycho_ids.indexOf($(this).data('parent').toString())===-1) {
                _this.psycho_ids.push($(this).data('parent').toString())
              }
            }
            
            //parent_id.push($(this).data('parent'))
            selectedHtml.push('<span>'+$(this).data('value')+'</span>');
          });
          //console.log(parent_id)
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
        });
        this.psycho_count++
      }
    }
    initializeOtherFun(){
      if(this.other_count==0) {
        var _this=this
        $('.select-dropdown .dropdown-menu').on('click', function(){
          event.stopPropagation();
        });
        $('.select-dropdown .dropdown-list .custom-checkbox.others').on('click', function(){
          var selected = [];
          var selectedHtml = [];
          _this.others_ids=[];
          var parent_id=[]
          var container = $(this).parents('.select-dropdown');
          var checkedList = container.find('.custom-checkbox-input:checked');
          var display = $(this).parents('.dropdown-menu').siblings('.data-toggle');
          checkedList.each(function() {
            console.log($(this).data('parent'))
            selected.push($(this).val());
            _this.others_ids.push($(this).val())
            if($(this).data('parent')) {
              if(_this.others_ids.indexOf($(this).data('parent'))===-1) {
              _this.others_ids.push($(this).data('parent'))
              }
            }
            //parent_id.push($(this).data('parent'))
            selectedHtml.push('<span>'+$(this).data('value')+'</span>');
          });
          //console.log(parent_id)
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
        });
        this.other_count++
      }
    }
    ngAfterViewInit(){
     //this.getProfileDetails();
    }

    otherText(){
      console.log('hi')
    }
    logout(){
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_id');
      this.authGuard.isLogged();
    }
    getProfileDetails(){
      let data={
        id:localStorage.getItem('user_id')
      }
      return this.userinfoService.postData(data,'profile/get').then((result)=>{
        if(result['status_code']==200){
          this.first_name=result['data'].firstname;
          this.last_name=result['data'].lastname;
          this.personal_email=result['data'].personal_email;
//=================================Intervention & Specialization Info=================================
        if(result['data'].intervention_ids) {
          this.intervention_ids=result['data'].intervention_ids.split(",");
          var selectedHtml = [];
          var selectName=[]
          for(let i=0;i<this.InterventionList.length;i++){
            if(this.intervention_ids.indexOf(this.InterventionList[i].id.toString())!=-1) {
              this.InterventionList[i]['checked']=true
              selectName.push(this.InterventionList[i].name);
              selectedHtml.push('<span>'+this.InterventionList[i].name+'</span>');
            }
          }
          if(selectedHtml.length>5) {
            $('#intervention_name').html(selectedHtml.length+' Selected');
          }
          else{
            $('#intervention_name').html(selectedHtml);
          }
          
          this.title_intervention_value=selectName.join(",")
        }

        if(result['data'].specialization_therapeutic_ids) {
          this.therapeutic_ids=result['data'].specialization_therapeutic_ids.split(",");
          var selectedHtml = [];
          var selectName=[]
          for(let i=0;i<this.SpecializationList.length;i++){
            if(this.therapeutic_ids.indexOf(this.SpecializationList[i].id.toString())!=-1) {
              this.SpecializationList[i]['checked']=true
              selectName.push(this.SpecializationList[i].name);
              selectedHtml.push('<span>'+this.SpecializationList[i].name+'</span>');
            }
          }
          if(selectedHtml.length>5) {
            $('#therapeutic_name').html(selectedHtml.length+' Selected');
          }
          else{
            $('#therapeutic_name').html(selectedHtml);
          }
          this.title_therapeutic_value=selectName.join(",")
        }


        if(result['data'].specialization_mental_ids) {
          this.mental_ids=result['data'].specialization_mental_ids.split(",");
          var selectedHtml = [];
          var selectName=[];
          for(let i=0;i<this.SpecializationList.length;i++){
            if(this.SpecializationList[i].type==2) {
              if(this.SpecializationList[i].sub.length>0) {
                for (var j = 0; j < this.SpecializationList[i].sub.length; j++) {
                  if(this.mental_ids.indexOf(this.SpecializationList[i].sub[j].id.toString())!=-1) {
                    this.SpecializationList[i].sub[j]['mental_checked']=true
                    selectName.push(this.SpecializationList[i].sub[j].name);
                    selectedHtml.push('<span>'+this.SpecializationList[i].sub[j].name+'</span>');
                  }
                  else{
                    this.SpecializationList[i].sub[j]['mental_checked']=false
                  }
                }
              }
              else{
                  if(this.mental_ids.indexOf(this.SpecializationList[i].id.toString())!=-1) {
                    this.SpecializationList[i]['mental_checked']=true
                    selectName.push(this.SpecializationList[i].name);
                    selectedHtml.push('<span>'+this.SpecializationList[i].name+'</span>');
                  }
                  else{
                    this.SpecializationList[i]['mental_checked']=false
                  }
              }
            }
          }
          if(selectedHtml.length>5) {
            $('#mental_name').html(selectedHtml.length+' Selected');
          }
          else{
            $('#mental_name').html(selectedHtml);
          }
          this.title_mental_value=selectName.join(",")
        }

        if(result['data'].specialization_psycho_ids) {
          this.psycho_ids=result['data'].specialization_psycho_ids.split(",");
          var selectedHtml = [];
          var selectName=[];
          for(let i=0;i<this.SpecializationList.length;i++){
            if(this.SpecializationList[i].type==3) {
              if(this.SpecializationList[i].sub.length>0) {
                for (var j = 0; j < this.SpecializationList[i].sub.length; j++) {
                  if(this.psycho_ids.indexOf(this.SpecializationList[i].sub[j].id.toString())!=-1) {
                    this.SpecializationList[i].sub[j]['psycho_checked']=true
                    selectName.push(this.SpecializationList[i].sub[j].name);
                    selectedHtml.push('<span>'+this.SpecializationList[i].sub[j].name+'</span>');
                  }
                  else{
                    this.SpecializationList[i].sub[j]['psycho_checked']=false
                  }
                }
              }
              else{
                  if(this.psycho_ids.indexOf(this.SpecializationList[i].id.toString())!=-1) {
                    this.SpecializationList[i]['psycho_checked']=true
                    selectName.push(this.SpecializationList[i].name);
                    selectedHtml.push('<span>'+this.SpecializationList[i].name+'</span>');
                  }
                  else{
                    this.SpecializationList[i]['psycho_checked']=false
                  }
              }
            }
          }
          //console.log(selectedHtml)
          if(selectedHtml.length>5) {
            $('#psycho_name').html(selectedHtml.length+' Selected');
          }
          else{
            $('#psycho_name').html(selectedHtml);
          }
          this.title_psycho_value=selectName.join(",")
          // for(let k=0;k<this.psycho_ids.length;k++){
          //   $("#psycho_ids option[value=" + this.psycho_ids[k] + "]").prop("selected", true).trigger("change")
          // }
        }
        if(result['data'].specialization_others_ids) {
          this.others_ids=result['data'].specialization_others_ids.split(",");
          var selectedHtml = [];
          var selectName=[];
          for(let i=0;i<this.SpecializationList.length;i++){
            if(this.SpecializationList[i].type==4) {
              if(this.SpecializationList[i].sub.length>0) {
                for (var j = 0; j < this.SpecializationList[i].sub.length; j++) {
                  if(this.others_ids.indexOf(this.SpecializationList[i].sub[j].id.toString())!=-1) {
                    this.SpecializationList[i].sub[j]['other_checked']=true
                    selectName.push(this.SpecializationList[i].sub[j].name);
                    selectedHtml.push('<span>'+this.SpecializationList[i].sub[j].name+'</span>');
                  }
                  else{
                    this.SpecializationList[i].sub[j]['other_checked']=false
                  }
                }
              }
              else{
                  if(this.others_ids.indexOf(this.SpecializationList[i].id.toString())!=-1) {
                    this.SpecializationList[i]['other_checked']=true
                    selectName.push(this.SpecializationList[i].name);
                    selectedHtml.push('<span>'+this.SpecializationList[i].name+'</span>');
                  }
                  else{
                    this.SpecializationList[i]['other_checked']=false
                  }
              }
            }
          }
          if(selectedHtml.length>5) {
            $('#other_name').html(selectedHtml.length+' Selected');
          }
          else{
            $('#other_name').html(selectedHtml);
          }
          this.title_other_value=selectName.join(",")
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
  	updateInterventionInfo(){
      console.log(this.others_ids)
	    let data={
	      id:localStorage.getItem('user_id'),
	      intervention_ids:this.intervention_ids,
	      specialization_therapeutic_ids:this.therapeutic_ids,
	      specialization_mental_ids:this.mental_ids,
	      specialization_psycho_ids:this.psycho_ids,
	      specialization_others_ids:this.others_ids,
        intervention_text:this.intervention_text,
        specialization_mental_text:this.specialization_mental_text, 
        specialization_psycho_text:this.specialization_psycho_text,
        specialization_others_text:this.specialization_others_text,
        specialization_therapeutic_text:this.specialization_therapeutic_text 
	    }
      //console.log(data)
	    this.userinfoService.postData(data,'profile/intervention-specialization-information/update').then((result)=>{
	      if(result['status_code']==200) {
	        this.langService.apiSuccessAlert(result['message'])
	      }
	      else{
	        this.langService.apiFailureAlert(result['message'])
	      }
	    })
  	}
    getInterventionList(){
      let data={
        user_id:localStorage.getItem('user_id')
      }
      return this.userinfoService.postData(data,'intervention/list').then(async(result)=>{
        if(result['status_code']==200) {
          this.InterventionList=await result['data'];
          //$('.preloader').fadeOut(300);
        }
        else{
          $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
  	}
  	getSpecializationList(){
      let data={
        user_id:localStorage.getItem('user_id')
      }
      return this.userinfoService.postData(data,'specialization/list').then(async(result)=>{
        if(result['status_code']==200) {
          this.SpecializationList=await result['data'];
          this.getProfileDetails();
        }
        else{
          $('.preloader').fadeOut(300);
          this.langService.apiFailureAlert(result['message'])
        }
      })
  	}
}
