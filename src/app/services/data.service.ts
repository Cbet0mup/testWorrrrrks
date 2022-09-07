import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {delay, Observable, retry} from "rxjs";
import {BerryModel} from "../models/berry.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getBerries(): Observable<BerryModel[]> {
    return this.http.get<BerryModel[]>(`https://pokeapi.co/api/v2/berry/?limit=10`,
      {
        params: new HttpParams({
          fromObject: {limit: 10}
        })
      })
  }
  getMoreData(addr: string){
    return this.http.get(`${addr}`)
  }
}


