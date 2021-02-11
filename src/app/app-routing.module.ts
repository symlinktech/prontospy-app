import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './template/default/default.component';
import { MediaComponent } from './template/media/media.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { ConsultantsComponent } from './components/consultants/consultants.component';
import { CmsComponent } from './components/cms/cms.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConsultantDetailsComponent } from './components/consultant-details/consultant-details.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { FaqComponent } from './components/faq/faq.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewAddComponent } from './components/review-add/review-add.component';

import { VideoScheduleComponent } from './components/schedule/video/video-schedule.component';
import { ChatScheduleComponent } from './components/schedule/chat/chat-schedule.component';
import { VoiceScheduleComponent } from './components/schedule/voice/voice-schedule.component';

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
import { VideoComponent } from './components/video/video.component';
import { ChatComponent } from './components/chat/chat.component';
import { VoiceComponent } from './components/voice/voice.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ListComponent } from './components/emails/list/list.component';
import { DetailsComponent } from './components/emails/details/details.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { MyClientsComponent } from './components/userinfo/my-clients/my-clients.component';
import { ClientNotesComponent } from './components/userinfo/client-notes/client-notes.component';

import { AuthGuardService as AuthGuard  } from './auth-guard.service'

const routes: Routes = [
{ 
	path: '', 
	component: DefaultComponent,
	children: [
		{ path: '', component: HomeComponent},
		{ path: 'home', component: HomeComponent},
		{ path: 'forgot-password', component: ForgotPasswordComponent},
		{ path: 'verification', component: OtpVerificationComponent},
		{ path: 'change-password', component: ChangePasswordComponent},
		{ path: 'login', component: LoginComponent},
		{ path: 'register', component: RegisterComponent},
		{ path: 'blogs', component: BlogsComponent},
		{ path: 'blog-details', component: BlogDetailsComponent},
		{ path: 'consultants', component: ConsultantsComponent},
		{ path: 'consultant-details', component: ConsultantDetailsComponent},
		{ path: 'account/consultant/reviews', component: ReviewsComponent,canActivate:[AuthGuard]},
		{ path: 'review-add', component: ReviewAddComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/appointments', component: AppointmentsComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/appointments', component: AppointmentsComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/appointment-details', component: AppointmentDetailsComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/appointment-details', component: AppointmentDetailsComponent,canActivate:[AuthGuard]},
		
		{ path: 'about-us', component: CmsComponent},
		{ path: 'terms-conditions', component: CmsComponent},
		{ path: 'privacy-policy', component: CmsComponent},
		{ path: 'how-it-works', component: CmsComponent},
		{ path: 'faq', component: FaqComponent},
		{ path: 'contact', component: ContactComponent},
		{ path: 'account/client/wishlist', component: WishlistComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/wishlist', component: WishlistComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/email/list', component: ListComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/email/details', component: DetailsComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/personal-info', component: MyaccountComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/fiscal-info', component: FiscalInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/payment-info', component: PaymentInfoComponent},
		{ path: 'account/consultant/myprofile/payment-info/:code', component: PaymentInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/account-info', component: AccountInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/member-info', component: MembershipInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/insurance-info', component: InsuranceInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/biography-info', component: BiographyInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/intervention-specialization', component: InterventionSpecializationInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/language-info', component: LanguageInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/service-info', component: ServiceOfferedInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/myprofile/schedule', component: DailyTimeComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/my-clients', component: MyClientsComponent,canActivate:[AuthGuard]},
		{ path: 'account/consultant/client-notes', component: ClientNotesComponent,canActivate:[AuthGuard]},

		{ path: 'account/client/email/list', component: ListComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/email/details', component: DetailsComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/personal-info', component: MyaccountComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/fiscal-info', component: FiscalInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/payment-info', component: PaymentInfoComponent},
		{ path: 'account/client/myprofile/payment-info/:code', component: PaymentInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/account-info', component: AccountInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/member-info', component: MembershipInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/insurance-info', component: InsuranceInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/biography-info', component: BiographyInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/intervention-specialization', component: InterventionSpecializationInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/language-info', component: LanguageInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile/service-info', component: ServiceOfferedInfoComponent,canActivate:[AuthGuard]},
		{ path: 'account/client/myprofile//schedule', component: DailyTimeComponent,canActivate:[AuthGuard]},
		{ path: 'review/list', component: ReviewListComponent},
		{ path: 'invoice', component: InvoiceComponent},

	],
},
// {
// 	path:'account',
// 	component: DefaultComponent,
// 	children: [
// 		{ path: 'personal-info', component: MyaccountComponent,canActivate:[AuthGuard]},
// 		{ path: 'fiscal-info', component: FiscalInfoComponent,canActivate:[AuthGuard]},
// 		{ path: 'payment-info', component: PaymentInfoComponent},
// 		{ path: 'payment-info/:code', component: PaymentInfoComponent,canActivate:[AuthGuard]},
// 		{ path: 'account-info', component: AccountInfoComponent,canActivate:[AuthGuard]},
// 		{ path: 'member-info', component: MembershipInfoComponent,canActivate:[AuthGuard]},
// 		{ path: 'insurance-info', component: InsuranceInfoComponent,canActivate:[AuthGuard]},
// 		{ path: 'biography-info', component: BiographyInfoComponent,canActivate:[AuthGuard]},
// 		{ path: 'intervention-specialization', component: InterventionSpecializationInfoComponent,canActivate:[AuthGuard]},
// 		{ path: 'language-info', component: LanguageInfoComponent,canActivate:[AuthGuard]},
// 		{ path: 'service-info', component: ServiceOfferedInfoComponent,canActivate:[AuthGuard]},
// 		{ path: 'schedule', component: DailyTimeComponent,canActivate:[AuthGuard]},
// 	]
// },
{
	path:'media',
	component: MediaComponent,
	children: [
		{path:'video',component: VideoComponent,canActivate:[AuthGuard]},
		{path:'chat',component: ChatComponent,canActivate:[AuthGuard]},
		{path:'voice',component: VoiceComponent,canActivate:[AuthGuard]},
		{path:'schedule/video',component: VideoScheduleComponent,canActivate:[AuthGuard]},
		{path:'schedule/chat',component: ChatScheduleComponent,canActivate:[AuthGuard]},
		{path:'schedule/voice',component: VoiceScheduleComponent,canActivate:[AuthGuard]},
	]
},
];

@NgModule({
	imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'ignore',scrollPositionRestoration:'top'})],
  //imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
