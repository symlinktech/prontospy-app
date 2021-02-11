import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../../auth-guard.service';
import { UserinfoService } from '../userinfo.service';
import { LanguageService } from '../../../i18n/language.service';
import { TranslateService } from '@ngx-translate/core';
declare var $;
@Component({
  selector: 'app-service-offered-info',
  templateUrl: './service-offered-info.component.html',
  styleUrls: ['./service-offered-info.component.scss']
})
export class ServiceOfferedInfoComponent implements OnInit {
//====================service
services_offered:any;
services_mode:any;
services_currrency:any;
service_price:any;
service_duration:any;
ServiceOfferList:any;
CurrencyList:any;
formAppendCount:any=1;
consultantService:any;
first_name:any;
last_name:any;
personal_email:any;
apiCount:any=0;
new_languages:any=[];
  constructor(public userinfoService:UserinfoService,public authGuard:AuthGuardService,public langService:LanguageService,public translate:TranslateService) { }

	ngOnInit() {
		$('.preloader').fadeIn(300);
		let languages: string[] = ["service", "mode", "currency","audio","chat","video","price","minute"];
		for(let i=0;i<languages.length;i++){
			this.translate.get(languages[i]).subscribe((data:any)=> {
				this.new_languages.push(data)
      		});
		}
		//console.log(this.new_languages);
	  	this.getCurrencyList();
	  	this.getServiceOfferList();
	  	//this.getProfileDetails();
	  	
	}
	ngAfterViewInit(){
		
	}
	ngDoCheck(){
		if(this.apiCount==1) {
			this.getProfileDetails();
		}
	}
	onChange(event){
		console.log(event)
	}
	logout(){
	  	localStorage.removeItem('user_email');
	    localStorage.removeItem('user_name');
	    localStorage.removeItem('user_id');
	    this.authGuard.isLogged();
	  }
	getProfileDetails(){
	this.apiCount=this.apiCount+1;
      let data={
        id:localStorage.getItem('user_id'),
        
      }
      if(this.apiCount==2) {
      this.userinfoService.postData(data,'profile/consultant-sevice/get').then((result)=>{
        if(result['status_code']==200){
   //      	this.first_name=result['data'].firstname;
			// this.last_name=result['data'].lastname;
			// this.personal_email=result['data'].personal_email;
//======================================Service Offered Info==========================================
        this.consultantService=result['data'].consultantService;
        this.formAppendCount=(this.consultantService.length==0)?this.formAppendCount:this.consultantService.length;
        var optionValue='';
	      var currencyValue=''
	      for(let i=0;i<this.ServiceOfferList.length;i++){
	        var optionValue=optionValue+'<option value='+this.ServiceOfferList[i].id+'>'+this.ServiceOfferList[i].name+'</option>';
	      }
	      for(let i=0;i<this.CurrencyList.length;i++){
	        var currencyValue=currencyValue+'<option value='+this.CurrencyList[i].code+'>'+this.CurrencyList[i].code+'</option>';
	      }
	      var html='';
	    if(this.consultantService.length>0) {
	        for (let i = 0; i < this.consultantService.length; ++i) {
	        	var mode=(this.consultantService[i].mode)?this.consultantService[i].mode.split(","):''
	        	html+='<div class="service_list"><input type="hidden" class="form-control" value="'+this.consultantService[i].id+'" name="id"><div class="form-row"><div class="col-md-12"><div class="form-group"><label class="control-label">'+this.new_languages[0]+'</label><a href="javascript:void(0)" class="btn-action service_remove float-right" data-value="'+this.consultantService[i].id+'"><i class="fal fa-fw fa-trash-alt"></i></a><select id="services_offered_'+this.consultantService[i].id+'"'+' class="form-control select2-nosearch_'+this.consultantService[i].id+'"' +'name="services">'+optionValue+'</select></div></div></div><div class="form-row"><div class="col-md-6"><div class="form-group"><label class="control-label">'+this.new_languages[1]+'</label><select id="services_mode'+this.consultantService[i].id+'"' +' class="form-control select2-nosearch_'+this.consultantService[i].id+'"' +'name="service_mode" multiple><option value="2">'+this.new_languages[3]+'</option><option value="1">'+this.new_languages[4]+'</option><option value="3">'+this.new_languages[5]+'</option></select></div></div><div class="col-6 col-md-3"><div class="form-group"><label class="control-label">'+this.new_languages[2]+'</label><select id="services_currrency'+this.consultantService[i].id+'"' +' class="form-control select2-nosearch_'+this.consultantService[i].id+'"' +'name="service_currrency">'+currencyValue+'</select></div></div><div class="col-6 col-md-3"><div class="form-group"><label class="control-label">'+this.new_languages[6]+'/'+this.new_languages[7]+'</label><input type="text" class="form-control" placeholder='+this.new_languages[6]+' value="'+this.consultantService[i].price+'" name="service_price" id="service_price_'+this.consultantService[i].id+'"' +'"></div></div><div class="col-md-6"><div class="form-group"><input type="hidden" class="form-control" placeholder="Duration"  name="service_duration" value="1" id="service_duration_'+this.consultantService[i].id+'"' +'"></div></div></div></div></div><script>$(".select2-nosearch_'+this.consultantService[i].id+'").select2();$(".select2_'+this.consultantService[i].id+'").select2();$("#services_offered_'+this.consultantService[i].id+'").val("'+this.consultantService[i].service_id+'").trigger("change");$("#services_mode'+this.consultantService[i].id+'").val(['+this.consultantService[i].mode+']).trigger("change");$("#services_currrency'+this.consultantService[i].id+'").val("'+this.consultantService[i].currency+'").trigger("change")</script>'
						/*html+='<div class="service_list"><input type="hidden" class="form-control" value="'+this.consultantService[i].id+'" name="id"><div class="form-row"><div class="form-group col-md-12"><label class="control-label">'+this.new_languages[0]+'</label><select id="services_offered_'+this.consultantService[i].id+'"'+' class="form-control select2_'+this.consultantService[i].id+'"' +'name="services">'+optionValue+'</select></div></div><div class="form-row"><div class="form-group col-md-6"><label class="control-label">'+this.new_languages[1]+'</label><select id="services_mode'+this.consultantService[i].id+'"' +' class="form-control select2_'+this.consultantService[i].id+'"' +'name="service_mode" multiple><option value="1">'+this.new_languages[3]+'</option><option value="2">'+this.new_languages[4]+'</option><option value="3">'+this.new_languages[5]+'</option></select></div><div class="form-group col-md-6"><label class="control-label">'+this.new_languages[2]+'</label><select id="services_currrency'+this.consultantService[i].id+'"' +' class="form-control select2_'+this.consultantService[i].id+'"' +'name="service_currrency">'+currencyValue+'</select></div></div><div class="form-row"><div class="form-group col-md-6"><input type="text" class="form-control" placeholder='+this.new_languages[6]+' value="'+this.consultantService[i].price+'" name="service_price" id="service_price_'+this.consultantService[i].id+'"' +'"></div><div class="form-group col-md-6"><input type="hidden" class="form-control" placeholder="Duration"  name="service_duration" value="1" id="service_duration_'+this.consultantService[i].id+'"' +'"></div></div></div><script>$(".select2_'+this.consultantService[i].id+'").select2();$("#services_offered_'+this.consultantService[i].id+'").val("'+this.consultantService[i].service_id+'").trigger("change");$("#services_mode'+this.consultantService[i].id+'").val(['+this.consultantService[i].mode+']).trigger("change");$("#services_currrency'+this.consultantService[i].id+'").val("'+this.consultantService[i].currency+'").trigger("change")</script>'*/
	        }
        	$('#service_form').html(html);
        	var _this=this
        	$('.btn-action.service_remove').on('click', function(){
        		_this.removeService($(this).data('value'))
				//console.log($(this).data('value'))
			})
        }
        else{
        	var _this=this
        	setTimeout(function(){ $('.select2').select2();
	    	$('.select2-nosearch').select2({ minimumResultsForSearch: -1});
	    	$('.btn-action.service_del').on('click', function(){
	    		if(_this.ServiceOfferList.length==_this.formAppendCount) {
		          	var myobj = document.getElementById($(this).data('delvalue'));
					myobj.remove();
					_this.formAppendCount--
	    		}
	    		else{
	    			_this.langService.failureAlert('service_delete_not_possible')
	    		}
			}) }, 1000);
        	
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
    }
    delService(id){
	    var myobj = document.getElementById(id);
		myobj.remove();
    }
  	addServiceForm(){
	    if(this.ServiceOfferList.length!=this.formAppendCount) {
	      var optionValue='';
	      var currencyValue=''
	      for(let i=0;i<this.ServiceOfferList.length;i++){
	        var optionValue=optionValue+'<option value='+this.ServiceOfferList[i].id+'>'+this.ServiceOfferList[i].name+'</option>';
	      }
	      for(let i=0;i<this.CurrencyList.length;i++){
	        var currencyValue=currencyValue+'<option value='+this.CurrencyList[i].code+'>'+this.CurrencyList[i].code+'</option>';
	      }
	    $("#service_form").append('<div class="service_list" id="#2"><input type="hidden" class="form-control" value="" name="id"><div class="form-row"><div class="col-md-12"><div class="form-group"><label class="control-label">'+this.new_languages[0]+'</label><a href="javascript:void(0)" class="btn-action service_del_2 float-right"  data-delvalue="#2"><i class="fal fa-fw fa-trash-alt"></i></a><select id="services_offered_'+this.ServiceOfferList[this.formAppendCount].id+'"'+' class="form-control select2_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'name="services">'+optionValue+'</select></div></div></div><div class="form-row"><div class="col-md-6"><div class="form-group"><label class="control-label">'+this.new_languages[1]+'</label><select id="services_mode'+this.ServiceOfferList[this.formAppendCount].id+'"' +' class="form-control select2_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'name="service_mode" multiple><option value="2">'+this.new_languages[3]+'</option><option value="1">'+this.new_languages[4]+'</option><option value="3">'+this.new_languages[5]+'</option></select></div></div><div class="col-6 col-md-3"><div class="form-group"><label class="control-label">'+this.new_languages[2]+'</label><select id="services_currrency'+this.ServiceOfferList[this.formAppendCount].id+'"' +' class="form-control select2_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'name="service_currrency">'+currencyValue+'</select></div></div><div class="col-6 col-md-3"><div class="form-group"><label class="control-label">'+this.new_languages[6]+'/'+this.new_languages[7]+'</label><input type="text" class="form-control" placeholder='+this.new_languages[6]+'  name="service_price" id="service_price_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'"></div></div><div class="col-6 col-md-3"><input type="hidden" class="form-control" placeholder="{{"duration" | translate}}"  name="service_duration" value="1" id="service_duration_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'"></div></div></div>'+'<script>$(".select2_'+this.ServiceOfferList[this.formAppendCount].id+'").select2();</script>');
				
				/*$("#service_form").append('<div class="service_list"><input type="hidden" class="form-control" value="" name="id"><div class="form-row"><div class="form-group col-md-12"><label class="control-label">'+this.new_languages[0]+'</label><select id="services_offered_'+this.ServiceOfferList[this.formAppendCount].id+'"'+' class="form-control select2_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'name="services">'+
	      optionValue+
	      '</select></div></div><div class="form-row"><div class="form-group col-md-6"><label class="control-label">'+this.new_languages[1]+'</label><select id="services_mode'+this.ServiceOfferList[this.formAppendCount].id+'"' +' class="form-control select2_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'name="service_mode" multiple><option value="1">'+this.new_languages[3]+'</option><option value="2">'+this.new_languages[4]+'</option><option value="3">'+this.new_languages[5]+'</option></select></div><div class="form-group col-md-6"><label class="control-label">'+this.new_languages[2]+'</label><select id="services_currrency'+this.ServiceOfferList[this.formAppendCount].id+'"' +' class="form-control select2_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'name="service_currrency">'+currencyValue+'</select></div></div><div class="form-row"><div class="form-group col-md-6"><input type="text" class="form-control" placeholder='+this.new_languages[6]+'  name="service_price" id="service_price_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'"></div><div class="form-group col-md-6"><input type="hidden" class="form-control" placeholder="{{"duration" | translate}}"  name="service_duration" value="1" id="service_duration_'+this.ServiceOfferList[this.formAppendCount].id+'"' +'"></div></div></div>'+
	      '<script>$(".select2_'+this.ServiceOfferList[this.formAppendCount].id+'").select2();</script>');*/
	    this.formAppendCount++
	    	var _this=this
	    	$('.btn-action.service_del_2').on('click', function(){
	    		if(_this.ServiceOfferList.length==_this.formAppendCount) {
		          	var myobj = document.getElementById($(this).data('delvalue'));
					myobj.remove();
					_this.formAppendCount--
	    		}
	    		else{
	    			_this.langService.failureAlert('service_delete_not_possible')
	    		}
			})
	    }

  	}
  	removeService(id){
  		let data={
  			id:localStorage.getItem('user_id'),
  			service_id:id
  		}
  		this.userinfoService.postData(data,'profile/consultant-sevice/delete').then((result)=>{
  			if(result['status_code']==200) {
		       	this.langService.apiSuccessAlert(result['message'])
		       	window.location.reload();
		      }
		      else{
		        this.langService.apiFailureAlert(result['message'])
		      }
  		})
  	}
  	updateServiceOfferedInfo(){
	    this.services_mode=[];
	    this.services_currrency=[];
	    this.services_offered=[];
	    this.service_price=[];
	    this.service_duration=[];
	    var id=[]
	    var that=this
	    $( ".service_list" ).each(function( index ) {
	      that.services_offered.push($(this).find('select[name="services"]').val())

	      var mode=$(this).find('select[name="service_mode"]').val()
	      that.services_mode.push(mode.join(","))

	      var currency=$(this).find('select[name="service_currrency"]').val()
	      that.services_currrency.push(currency)

	      that.service_price.push($(this).find('input[name="service_price"]').val())

	      that.service_duration.push($(this).find('input[name="service_duration"]').val())

	      id.push($(this).find('input[name="id"]').val())
	    });
   		var valueArr = this.services_offered.map(function(item){ return item });
		var isDuplicate = valueArr.some(function(item, idx){ 
		    return valueArr.indexOf(item) != idx 
		});
		if(isDuplicate==true) {
			this.langService.failureAlert('sorry_you_have_added_duplicate_service')
		}
		else{
			let data={
		      user_id:localStorage.getItem('user_id'),
		      id:id,
		      service_id:this.services_offered,
		      mode:this.services_mode,
		      currency:this.services_currrency,
		      price:this.service_price,
		      duration:this.service_duration
		    }
		    this.userinfoService.postData(data,'profile/service-information/update').then((result)=>{
		      if(result['status_code']==200) {
		       	this.langService.apiSuccessAlert(result['message'])
		       	window.location.reload();
		      }
		      else{
		        this.langService.apiFailureAlert(result['message'])
		      }
		    })
		}
		
	    
  	}
  	getCurrencyList(){
      let data={
        
      }
      this.userinfoService.postData(data,'currency/list').then((result)=>{
        if(result['status_code']==200) {
          this.CurrencyList=result['data'];
          this.apiCount=this.apiCount+1
          
        }
        else{
           	this.langService.apiFailureAlert(result['message'])
        }
      })
  	}
  	getServiceOfferList(){
      let data={
        
      }
      this.userinfoService.postData(data,'service/list').then((result)=>{
        if(result['status_code']==200) {
          this.ServiceOfferList=result['data'];
          this.apiCount=this.apiCount+1
        }
        else{
           this.langService.apiFailureAlert(result['message'])
        }
      })
  }
}
