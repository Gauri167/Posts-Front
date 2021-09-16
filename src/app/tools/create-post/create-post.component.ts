import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  token :String;
  post : Post

  constructor(private dialog: MatDialogRef<CreatePostComponent>, private postService:PostsService) { }

  ngOnInit() {
  }

  onPostClick(commentInput: HTMLTextAreaElement) {
    let comment = commentInput.value;
    if(comment.length <= 0 ) return;
    
    let author = JSON.parse(localStorage.getItem('token'));
    this.post = new Post("", author, comment);
    this.postService.create(this.post).subscribe(
      response => {
        if (response._id) {
          console.error('success');
        } else {
          console.log('error');
        }
        this.dialog.close();
      },
      error => {
          console.log(<any>error);
      }
    )
   
  }

}
