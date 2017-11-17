import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, startWith, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  repos;
  storage = !environment.server ? localStorage : {};
  constructor(http: HttpClient, route: ActivatedRoute) {
    const path = 'https://api.github.com/search/repositories?q=';
    this.repos = route.params.pipe(
      switchMap(params => {
        const term = params['term'] ? params['term'] : 'angular';
        return http.get<any>(`${path}${term}`);
      }),
      map(results => results.items),
      shareReplay(1)
    );

    this.repos.subscribe(list => {
      this.storage['listCache'] = JSON.stringify(list);
    });
    this.repos = this.repos.pipe(
      startWith(JSON.parse(this.storage['listCache'] || '[]'))
    );
  }

  ngOnInit() {}
}
