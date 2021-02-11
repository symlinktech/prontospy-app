import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './template/default/default.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConsultantsComponent } from './components/consultants/consultants.component';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CmsComponent } from './components/cms/cms.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConsultantDetailsComponent } from './components/consultant-details/consultant-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ListComponent } from './components/emails/list/list.component';
import { DetailsComponent } from './components/emails/details/details.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { SubscriberComponent } from './components/subscriber/subscriber.component';

import { AuthGuardService } from './auth-guard.service';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { FaqComponent } from './components/faq/faq.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FiscalInfoComponent } from './components/userinfo/fiscal-info/fiscal-info.component';
import { PaymentInfoComponent } from './components/userinfo/payment-info/payment-info.component';
import { AccountInfoComponent } from './components/userinfo/account-info/account-info.component';
import { MembershipInfoComponent } from './components/userinfo/membership-info/membership-info.component';
import { InsuranceInfoComponent } from './components/userinfo/insurance-info/insurance-info.component';
import { BiographyInfoComponent } from './components/userinfo/biography-info/biography-info.component';
import { InterventionSpecializationInfoComponent } from './components/userinfo/intervention-specialization-info/intervention-specialization-info.component';
import { LanguageInfoComponent } from './components/userinfo/language-info/language-info.component';
import { ServiceOfferedInfoComponent } from './components/userinfo/service-offered-info/service-offered-info.component';
import { DailyTimeComponent } from './components/userinfo/daily-time/daily-time.component';
import { UserSidebarComponent } from './common/user-sidebar/user-sidebar.component';
import { UserHeaderComponent } from './common/user-header/user-header.component';
import { UserTabComponent } from './common/user-tab/user-tab.component';
import { ReviewAddComponent } from './components/review-add/review-add.component';
import { MediaComponent } from './template/media/media.component';
import { VideoComponent } from './components/video/video.component';
import { ChatComponent } from './components/chat/chat.component';
import { VoiceComponent } from './components/voice/voice.component';

import { VideoScheduleComponent } from './components/schedule/video/video-schedule.component';
import { ChatScheduleComponent } from './components/schedule/chat/chat-schedule.component';
import { VoiceScheduleComponent } from './components/schedule/voice/voice-schedule.component';

import { InvoiceComponent } from './components/invoice/invoice.component';
import { MyClientsComponent } from './components/userinfo/my-clients/my-clients.component';
import { ClientNotesComponent } from './components/userinfo/client-notes/client-notes.component';

import { MediaHeaderComponent } from './common/media-header/media-header.component';
import { MediaFooterComponent } from './common/media-footer/media-footer.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { I18nModule } from './i18n/i18n.module';
import { OpentokService } from './opentok.service';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
// import { HttpcancelService } from './httpcancel.service';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ManageHttpInterceptor } from './managehttp.interceptor';

const socketConfig: SocketIoConfig = { 
  url: 'https://prontopsy.com:3036', options: {} 
};

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ConsultantsComponent,
    HomeComponent,
    BlogsComponent,
    CmsComponent,
    ContactComponent,
    ConsultantDetailsComponent,
    DashboardComponent,
    AppointmentsComponent,
    MyaccountComponent,
    ForgotPasswordComponent,
    OtpVerificationComponent,
    ChangePasswordComponent,
    BlogDetailsComponent,
    FaqComponent,
    ReviewsComponent,
    FiscalInfoComponent,
    PaymentInfoComponent,
    AccountInfoComponent,
    MembershipInfoComponent,
    InsuranceInfoComponent,
    BiographyInfoComponent,
    InterventionSpecializationInfoComponent,
    LanguageInfoComponent,
    ServiceOfferedInfoComponent,
    DailyTimeComponent,
    UserSidebarComponent,
    UserHeaderComponent,
    UserTabComponent,
    ReviewAddComponent,
    MediaComponent,
    VideoComponent,
    ChatComponent,
    VoiceComponent,
    MediaHeaderComponent,
    MediaFooterComponent,
    WishlistComponent,
    ListComponent,
    DetailsComponent,
    AppointmentDetailsComponent,
    ReviewListComponent,
    PublisherComponent,
    SubscriberComponent,
    VideoScheduleComponent,
    ChatScheduleComponent,
    VoiceScheduleComponent,
    InvoiceComponent,
    MyClientsComponent,
    ClientNotesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    I18nModule,
		TooltipModule,
		NgxSliderModule,
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'},AuthGuardService,DatePipe,
    //HttpcancelService,
    //{ provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
