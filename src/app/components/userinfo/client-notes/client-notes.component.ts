import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../i18n/language.service';
declare var $;

@Component({
  selector: 'app-client-notes',
  templateUrl: './client-notes.component.html',
  styleUrls: ['./client-notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientNotesComponent implements OnInit {
  noteList:any=[];
  user_id:any;
  client_id:any;
  note:any;
  constructor(public userService:UserinfoService,public router:Router,public activatedRoute:ActivatedRoute,public langService:LanguageService) { }

  ngOnInit() {
    this.user_id=localStorage.getItem('user_id')
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.client_id=res.id;
      this.getNotes();
    })
  }

  getNotes(){
    $('.preloader').fadeIn(300);
    let data={
      consultant_id:localStorage.getItem('user_id'),
      user_id:this.client_id
  	}
    this.userService.postData(data,'note/list').then((result)=>{
  		if(result['status_code']==200){
  			this.noteList=result['data']
        console.log(this.noteList);
        $('.preloader').fadeOut(300);
  		}
  		else{
        $('.preloader').fadeOut(300);
  			this.langService.apiFailureAlert(result['message'])
  		}
  	})
  }

  saveNote(){
    let data={
      consultant_id:localStorage.getItem('user_id'),
      user_id:this.client_id,
      note:this.note
  	}
    this.userService.postData(data,'note/add').then((result)=>{
  		if(result['status_code']==200){
  			this.langService.apiSuccessAlert(result['message'])
        $('#noteModal').hide();
  		} else{
  			this.langService.apiFailureAlert(result['message'])
  		}
      this.getNotes();
  	})
  }

  addNote(){
    this.note = '';
    $('#noteModal').show();
  }

  closeModal(){
    $('#noteModal').hide();
  }

}
