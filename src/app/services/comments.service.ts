import { Injectable } from '@angular/core'
import { AppHttpService } from './app-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Comment } from '../models/comment';


@Injectable()
export class CommentsService {

    constructor(private http : HttpClient) { }

    create(post: Comment) : Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post("http://localhost:8800/api/comments/comment", JSON.stringify(post), {headers : headers});
    }

    getAllPostComments(post_id : String) : Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get("http://localhost:8800/api/comments/comments/" + post_id, {headers : headers});
    }
}

