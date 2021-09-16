import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  comments: CommentData [] = [];
  comment : Comment;

  constructor(
    @Inject(MAT_DIALOG_DATA) private postId: string,
    @Inject(MAT_DIALOG_DATA) private commentData: CommentData,
    private commentService : CommentsService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(){

    this.comments = [];
    this.commentService.getAllPostComments(this.commentData.postId).subscribe(
      response => {

        response.forEach(
          postCommentDoc => {
            console.log(postCommentDoc);
            let comment = <CommentData>postCommentDoc;
            comment.commentId = postCommentDoc._id;
            comment.creatorId = postCommentDoc.userId;
            comment.comment = postCommentDoc.desc;
            this.comments.push(<CommentData>postCommentDoc);
          }
        ); 

      },
      error => {
          console.log(<any>error);
      }
    )
  }

  isCommentCreator(comment: CommentData){
    try {
      return comment.creatorId == JSON.parse(localStorage.getItem('token'));
    } catch (err) {
      
    }
  }

  onSendClick(commentInput: HTMLInputElement){
    if(!(commentInput.value.length > 0)) return;

    let author = JSON.parse(localStorage.getItem('token'));
    console.log(this.commentData.commentId);
    console.log(this.postId);
    if(this.commentData.commentId != null && this.commentData.commentId != "undefined")
    {
      this.comment = new Comment("", author, this.commentData.postId, commentInput.value, (this.commentData.depth + 1), this.commentData.commentId);
    }
    else if(this.postId != null && this.postId != "undefined")
    {
      this.comment = new Comment("", author, this.postId, commentInput.value, 0, "");
    }
    else
    {
      return;
    } 
    this.commentService.create(this.comment).subscribe(      
      response => {
        if (response._id) {
          console.error('success');
        } else {
          console.log('error');
        }
        commentInput.value = "";
        
        // this.getComments();
      },
      error => {
          console.log(<any>error);
      }
    );
  }

}

export interface CommentData {
  creatorId: string;
  creatorName: string;
  comment: string;
  commentId: string;
  postId: string;
  depth: number;
}

