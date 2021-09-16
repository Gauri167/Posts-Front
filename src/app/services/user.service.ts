import { Injectable } from '@angular/core'
import { AppHttpService } from './app-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { User } from '../models/user';


@Injectable()
export class UserService {

    constructor(private http : HttpClient) { }

    getUserDetails(user_id: String) : Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get("http://localhost:8800/api/user/" + user_id, {headers : headers});
    }

    login(user : User) : Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8800/api/auth/login", JSON.stringify(user), {headers : headers});
    }
}

