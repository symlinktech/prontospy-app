import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from '../../opentok.service';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})

export class SubscriberComponent implements AfterViewInit {
  @ViewChild('subscriberDiv',{static:false}) subscriberDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() stream: OT.Stream;
  @Input() media: any;
  @Input() data: any;
  subscriber:any;
  appointment_data={user_image:'',user_id:'',consultant_image:'',consultant_id:''}
  constructor(public commonService:CommonService,public opentokService:OpentokService) { }

  ngAfterViewInit() {
    this.getCredentials()
    this.subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {}, (err) => {
      if (err) {
        alert(err.message);
      }
    });
    this.opentokService.setSubscriberData(this.subscriber)
  }
    getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
      }
    }
  getCredentials(){
    if(this.media=='voice') {
      let data={
        appointment_id:this.getUrlParameter('appointment_id')
      }
      this.commonService.postData(data,'profile/appointment/get').then((result)=>{
        if(result['status_code']==200) {
          this.appointment_data.consultant_image=result['data'].consultant_image
          this.appointment_data.consultant_id=result['data'].consultant_id
          this.appointment_data.user_id=result['data'].user_id
          this.appointment_data.user_image=result['data'].user_image
          var image=(this.appointment_data.user_id==localStorage.getItem('user_id'))?this.appointment_data.user_image:this.appointment_data.consultant_image
          this.subscriber.setStyle('backgroundImageURI',
            image
          );
          
        }
        else{
          //this.langService.apiFailureAlert(result['message'])
        }
      })
    }
  }
}