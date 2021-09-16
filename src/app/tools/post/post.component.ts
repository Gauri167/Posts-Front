import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/posts/posts.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ReplyComponent } from '../reply/reply.component';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() postData: PostData;
  creatorName: string;
  creatorDescription: string;
  comments: CommentData [] = [];
  comment : Comment;

  constructor(private dialog: MatDialog, 
    private userService : UserService,
    private commentService : CommentsService) { }

  ngOnInit() {
    this.getCreatorInfo(this.postData.creatorId);
    this.getComments();
  }

  getCreatorInfo(userId){

    this.userService.getUserDetails(userId).subscribe(
      response => {

        this.creatorName = response.username;

      },
      error => {
          console.log(<any>error);
      }
    );
  }

  onReplyClick(comment : CommentData){
    this.dialog.open(ReplyComponent, {data: comment});
  }

  onCommentClick(){
    this.dialog.open(ReplyComponent, {data: this.postData.postId});
  }

  getComments(){

    this.comments = [];
    this.commentService.getAllPostComments(this.postData.postId).subscribe(
      response => {

        response.forEach(
          postCommentDoc => {
            let comment = <CommentData>postCommentDoc;
            comment.commentId = postCommentDoc._id;
            comment.creatorId = postCommentDoc.userId;
            comment.comment = postCommentDoc.desc;
            comment.depth = postCommentDoc.depth;
            comment.parentId = (postCommentDoc.parentId === "undefined") ? "" : postCommentDoc.parentId;
            comment.comments = [];


            this.userService.getUserDetails(postCommentDoc.userId).subscribe(
              response => {
        
                comment.creatorName = response.username;
        
              },
              error => {
                  console.log(<any>error);
              }
            );

            this.comments.push(<CommentData>postCommentDoc);
          }
        ); 

        if(this.comments.length > 0)
         return this.displayComments(this.comments);
      },
      error => {
          console.log(<any>error);
      }
    )
  }

  displayComments(postComments) {
    const indexedComments = postComments.reduce((previous, current) => {
      // create a coppy of comment so we do not modify original comments
      // if you want to preserve, just use `= current` instead
      previous[current.commentId] = { ...current };
      return previous;
    }, <{ [key: number]: CommentData }>{});

    for (const comment of postComments) {
      if (comment.depth !== 0) {
        console.log(indexedComments[comment.parentId]);
        indexedComments[comment.parentId].comments.push(comment);
      }
    }

    const ThreeD = Object.values(indexedComments).filter(
      (comment) => comment.parentId === ""
    );
    
    console.log(ThreeD);
    
  }

}


export interface CommentData {
  creatorId: string;
  creatorName: string;
  comment: string;
  commentId: string;
  postId: string;
  depth: number;
  parentId: string;
  comments : CommentData[]
}