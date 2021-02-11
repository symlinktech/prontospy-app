import { Injectable } from '@angular/core';

import * as OT from '@opentok/client';
import config from '../config';
import { LanguageService } from './i18n/language.service';
declare var require;
const apiKey='46953654';
const apiSecret='b4afeb029f9a76de7e1d569fc40f6bfc19a5745b';
var OpenTok=require('opentok')
@Injectable({
  providedIn: 'root'
})
export class OpentokService {
 session: OT.Session;
 token: string;
 sessionData={'sessionId':'','token':''}
 publisher:any;
 subscriber:any;
 media_allow='false';
  constructor(public langService:LanguageService) { }

  getOT() {
    return OT;
  }

   async initSession(session,token) {
     if(session && token) {
        this.session = await this.getOT().initSession(config.API_KEY, session);
        this.token = token;
        return Promise.resolve(this.session);
     }
     else{
       this.langService.failureAlert('session_expire')
     }
  }
  async createSessionFun(){
    // Set the following constants with the API key and API secret
    // that you receive when you sign up to use the OpenTok API:
    var opentok = new OpenTok(config.API_KEY,config.API_SECRET);
    //Generate a basic session. Or you could use an existing session ID.
    var sessionId;
    var token
    var _this=this
    return new Promise((resolve, reject) =>{
      opentok.createSession({}, function(error, session) {
        if (error) {
          console.log("Error creating session:", error)
        } 
        else {
          sessionId = session.sessionId;
          //console.log("Session ID: " + sessionId);
          //  Use the role value appropriate for the user:
          // Generate a token.
          token = opentok.generateToken(sessionId);
          //console.log(token);
          _this.sessionData.sessionId=sessionId
          _this.sessionData.token=token
        }
        resolve(_this.sessionData)
      });
    })
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
  disconnectSession(){
    this.session.disconnect();
  }
  setPublisherData(data){
    this.publisher=data
  }
  setSubscriberData(data){
    this.subscriber=data
  }
  setMediaVariable(value){
    this.media_allow=value
  }
  getMediaVariable(){
    return this.media_allow
  }
}
