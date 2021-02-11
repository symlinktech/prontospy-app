import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from './blog.service';
import { LanguageService } from '../../i18n/language.service';
declare var $;
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
blogList:any;
  constructor(public blogService:BlogService,public router:Router,public langService:LanguageService) { }

  ngOnInit() {
     $('.preloader').fadeIn(300);
  	this.getBLogs();
  }
  getBLogs(){
  	let data={
  		
  	}
  	this.blogService.postData(data,'blog/list').then((result)=>{
  		if(result['status_code']==200) {
  			this.blogList=result['data'];
         $('.preloader').fadeOut(300);
  		}
  		else{
  			this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }
  blogDetails(data){
  	this.router.navigate(['/blog-details'],{queryParams:{id:data.id}})
  }
}
