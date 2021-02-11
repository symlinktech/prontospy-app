import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateCacheModule, TranslateCacheSettings, TranslateCacheService } from 'ngx-translate-cache';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage:'en'
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings]
      },
      cacheMechanism: 'Cookie'
    })
  ],
  exports: [TranslateModule]
})
export class I18nModule {
  constructor(translate: TranslateService,
    translateCacheService: TranslateCacheService) {
    translateCacheService.init();
    translate.addLangs(['en', 'es', 'it']);
    const browserLang = translateCacheService.getCachedLanguage() || translate.getBrowserLang();;
    translate.use(browserLang.match(/en|es|it/) ? browserLang : 'en');
    translate.setDefaultLang(browserLang.match(/en|es|it/) ? browserLang : 'en');
  }
}

export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
export function translateCacheFactory(
  translateService: TranslateService,
  translateCacheSettings: TranslateCacheSettings
) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}