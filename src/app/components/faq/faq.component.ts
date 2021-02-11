import { Component, OnInit } from '@angular/core';
import { FaqService } from './faq.service';
import { LanguageService } from '../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
FaqData:any;
count:number=0;
  constructor(public faqService:FaqService,public languageService:LanguageService) {
  
}
  ngOnInit() {
    this.getFaqs();
  }
  ngAfterViewInit(){
   
  }
   getFaqs(){
    let data={

    }
    this.faqService.postData(data,'faq/list').then(async(result)=>{
      if(result['status_code']==200) {
       this.FaqData= await result['data']
      }
      else{
        this.languageService.failureAlert(result['message'])
      }
    })
  }
  toggle(){
    if(this.count==0) {
      $('.custom-accrodion-btn').on('click', function(){
        $(this).parent().next().slideToggle();
        $(this).parent().parent().siblings().find('.accrodion-item-body').slideUp();
        $(this).parent().parent().toggleClass('show');
        $(this).parent().parent().siblings().removeClass('show');
    });
    console.log('hi')
    this.count++ 
    }
  }

}
