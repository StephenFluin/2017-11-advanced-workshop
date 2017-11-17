import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PreloadingStrategy, Route } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class AppCustomPreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    console.log("preload on a route");
    return route.data && route.data.preload ? load() : of(null);
  }
}


@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'about', loadChildren: './about/about.module#AboutModule', data: { preload: false } },
    ], {preloadingStrategy: AppCustomPreloader}),
  ],
  providers: [AppCustomPreloader],
  bootstrap: [AppComponent],
})
export class AppModule {}




