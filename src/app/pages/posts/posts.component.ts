import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public token;
  posts: PostData [] = [];
  constructor(
    private dialog: MatDialog,
    private authService:AuthService,
    private postService:PostsService,
    private router:Router) { }

  ngOnInit() {
    this.getPosts();
  }

  onCreatePostClick(){
    this.dialog.open(CreatePostComponent);
  }

  getPosts(){
    let stats = JSON.parse(localStorage.getItem('token'));

    if (stats != null && stats != "undefined") {
      this.postService.getAll().subscribe(
        response => {
            response.forEach(
              doc => {
                let post = <PostData>doc;
                post.postId = doc._id;
                post.creatorId = doc.userId;
                post.comment = doc.desc;
                this.posts.push(post);
              }
            );

        },
        error => {
            console.log(<any>error);
        }
      )
    } else {
      this.router.navigate(["/"]);
    }
        
  }

}

export interface PostData {
  comment: string;
  creatorId: string;
  postId: string;
}
