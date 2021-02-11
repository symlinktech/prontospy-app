import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var $;
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(public translate: TranslateService) { }

  	successAlert(msg){
	  	const currentLang = this.translate.currentLang;
	  	const returnValue = this.translate.translations[currentLang][msg];
	  	console
	  	$.dialog({
	      title: 'Success',
	      content: returnValue,
	    });
  	}
  	failureAlert(msg){
	  	const currentLang = this.translate.currentLang;
	  	const returnValue = this.translate.translations[currentLang][msg];
	  	$.dialog({
	      title: 'Failure',
	      content: returnValue,
	    });
  	}
  	apiSuccessAlert(msg){
  		$.dialog({
	      title: 'Success',
	      content: msg,
	    });
  	}
  	apiFailureAlert(msg){
  		$.dialog({
	      title: 'Failure',
	      content: msg,
	    });
  	}
}
