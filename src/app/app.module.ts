import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';

import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpService } from './services/app-http.service';
import { AuthService } from './services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PostsComponent } from './pages/posts/posts.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';
import { PageNotFound } from './pages/page-not-found/page-not-found.component';
import { PostsService } from './services/posts.service';
import { PostComponent } from './tools/post/post.component';
import { UserService } from './services/user.service';
import { ReplyComponent } from './tools/reply/reply.component';
import { CommentsService } from './services/comments.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent,
    PostsComponent,
    CreatePostComponent,
    PageNotFound,
    PostComponent,
    ReplyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    routing,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    AppHttpService,
    AuthService,
    PostsService,
    UserService,
    CommentsService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreatePostComponent,
    ReplyComponent
  ]
})
export class AppModule { }
