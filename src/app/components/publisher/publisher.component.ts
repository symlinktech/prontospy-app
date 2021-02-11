import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Input  } from '@angular/core';
import { OpentokService } from '../../opentok.service';
import { CommonService } from '../../common.service';
import { Socket } from 'ngx-socket-io';
const publish = () => {

};
@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements AfterViewInit {

  @ViewChild('publisherDiv',{static:false}) publisherDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() media: any;
  @Input() data: any;
  publisher: OT.Publisher;
  publishing: Boolean;
  appointment_data={user_image:'',user_id:'',consultant_image:'',consultant_id:''}
  constructor(public commonService:CommonService,public opentokService:OpentokService,public socket:Socket) {
    this.publishing = false;
  }

  ngAfterViewInit() {
    this.getCredentials()
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {insertMode:'append'});
    var _this=this
    // this.publisher.on({
    //   accessAllowed: function (event) {
    //     let data={
    //       media_allowed:true,
    //       user_id:localStorage.getItem('user_id')
    //     }
    //     _this.socket.emit('mediaAllowed',data)
    //     _this.opentokService.setMediaVariable('true')
    //     // The user has granted access to the camera and mic.
    //     //console.log('The user has granted access to the camera and mic')
    //     //console.log(event)
    //   },
    //   accessDenied: function accessDeniedHandler(event) {
    //     let data={
    //       media_allowed:false,
    //       user_id:localStorage.getItem('user_id')
    //     }
    //     _this.socket.emit('mediaAllowed',data)
    //     _this.opentokService.setMediaVariable('false')
    //     // The user has denied access to the camera and mic.
    //     //console.log('The user has denied access to the camera and mic')
    //     //console.log(event)
    //   }
    // });
    this.opentokService.setPublisherData(this.publisher)
    if(this.media=='voice') {
      this.publisher.publishVideo(false);
    }
    if (this.session) {
      if (this.session['isConnected']()) {
        this.publish();
      }
      this.session.on('sessionConnected', () => this.publish());
    }
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
  publish() {
    this.session.publish(this.publisher, (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.publishing = true;
      }
    });
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
          var image=(this.appointment_data.user_id==localStorage.getItem('user_id'))?this.appointment_data.consultant_image:this.appointment_data.user_image
          this.publisher.setStyle('backgroundImageURI',
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
