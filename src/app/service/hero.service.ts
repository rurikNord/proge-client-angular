import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Axios from  'axios-observable';
export interface Hero {
  id: Number;
  nickname: string;
  real_name: string;
  superpowers: string;
  catch_phrase: string;
  isUpdating: boolean;
}

const API_URL = "http://127.0.0.1:8000/api";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: Http) {
  }

  getHeroAxios(): void {
    Axios.get(API_URL + '/heroes')
  .subscribe(
    response => console.log(response),
    error => console.log(error)
  );
  }

  getHero(): Observable<Hero[]> {
    return this.http.get(API_URL + '/heroes'
    ).pipe(map(res => {
      console.log(res);
      let modifiedResult = res.json().data;
      modifiedResult = modifiedResult.map(function (hero) {
        hero.isUpdating = false;
        return hero;
      });
      return modifiedResult;
    }));
  }

  addHero(hero): Observable<Hero> {
    return this.http.post(API_URL + '/api/heroes', hero,
      new RequestOptions()
    ).pipe(map(res => res.json().data));
  }

  deleteHero(id): Observable<any> {
    return this.http.delete(API_URL + '/api/heroes/' + id,
      new RequestOptions()
    );
  }
}
