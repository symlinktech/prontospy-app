import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from './wishlist.service';
import { LanguageService } from '../../i18n/language.service';

declare var $;
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
id:any;
Wishlist:any;
name='wishlist'
  constructor(public router:Router, public wishlistService:WishlistService, public activatedRoute:ActivatedRoute,public langService:LanguageService) { }

  ngOnInit() {
    $('.preloader').fadeIn(300);
  	this.activatedRoute.queryParams.subscribe((res)=>{
  		this.id=res.id
  		this.getWislist()
  	})
  }
    navigatePage(data){
      this.router.navigate(['/consultant-details'],{queryParams:{id:data.id}})
    }
    getWislist(){
    	let data={
    		
        user_id:localStorage.getItem('user_id')
    	}
    	this.wishlistService.postData(data,'wishlist/list').then((result)=>{
    		if(result['status_code']) {
    			this.Wishlist=result['data']
          $('.preloader').fadeOut(300);
    		}
    		else{
          $('.preloader').fadeOut(300);
    			this.langService.apiFailureAlert(result['message'])
    		}
    	})
   }
   removeWishlist(consultant_id,index){
     let data={
        user_id:localStorage.getItem('user_id'),
        consultant_id:consultant_id
      }
      this.wishlistService.postData(data,'wishlist/add').then((result)=>{
        if(result['status_code']==200) {
          this.Wishlist.splice(index,1)
          this.langService.apiSuccessAlert(result['message'])
        }
        else{
          this.langService.apiFailureAlert(result['message'])
        }
      })
   }
}

