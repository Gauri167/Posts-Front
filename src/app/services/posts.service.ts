import { Injectable } from '@angular/core'
import { AppHttpService } from './app-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Post } from '../models/post';


@Injectable()
export class PostsService {

    constructor(private http : HttpClient) { }

    create(post: Post) : Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8800/api/posts/post", JSON.stringify(post), {headers : headers});
    }

    getAll() : Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get("http://localhost:8800/api/posts/", {headers : headers});
    }
}

