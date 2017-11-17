import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiceWorkerModule, SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'search/:term', component: HomeComponent },
      { path: 'about', loadChildren: './about/about.module#AboutModule' },
    ]),
    (environment.production && !environment.server)
      ? ServiceWorkerModule.register('ngsw-worker.js')
      : [],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    const swPush = injector.get(SwPush, null);
    if (swPush) {
      // swPush.requestSubscription({ serverPublicKey: 'MYKEY' });
      swPush.messages.subscribe(msg => {
        console.log('got a push notification', msg);
      });
    }
  }
}
