import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogDetailService } from './blog-detail.service';
import { LanguageService } from '../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
BlogDetails={alias:'',image: '',long_description: '',short_description: '',title: '',created_at:''};
id:any;
  constructor(public blogDetailService:BlogDetailService,public router:Router,public activatedRoute:ActivatedRoute,public langService:LanguageService) { }

  ngOnInit() {
  	this.activatedRoute.queryParams.subscribe((res)=>{
  		this.id=res.id
  		this.getBlogDetails();
  	})
  }

  getBlogDetails(){
  	let data={
  		
  		id:this.id
  	}
  	this.blogDetailService.postData(data,'blog/details').then((result)=>{
  		if(result['status_code']) {
  			 this.BlogDetails.alias=result['data'].alias;
         this.BlogDetails.image=result['data'].image;
         this.BlogDetails.long_description=result['data'].long_description;
         this.BlogDetails.short_description=result['data'].short_description;
         this.BlogDetails.title=result['data'].title;
         this.BlogDetails.created_at =result['data'].created_at ;
  		}
  		else{
  			this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }

}
