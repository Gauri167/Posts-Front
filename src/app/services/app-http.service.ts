import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http : HttpClient) { }

  get(url : string, data : any) {
    return this.http.get(url);
  }

  post(url : string, data : any) {
    return this.http.post(url, data);
  }
}
