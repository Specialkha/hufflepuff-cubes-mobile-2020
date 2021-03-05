import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCommentService } from 'src/app/core/http/comment/httpComment.service';
import { HttpPostService } from 'src/app/core/http/post/http-post.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { Comment } from 'src/app/core/model/comment'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  post: any;
  postId: string;

  onShow: boolean = false;

  commentCreationForm: FormGroup;

  isLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private httpPost: HttpPostService, private blogService: BlogService, private httpUser: HttpUserService, public auth: AuthService, private httpComment: HttpCommentService) {
    this.route.params.subscribe((params) => {
      this.httpPost.getSinglePost(this.blogService.getBlogId, params.id).subscribe((data: any) => {
        this.post = data[0];
        this.isLoaded = true;
        this.postId = this.post._id;
      });
    });
  }

  ngOnInit() {
    this.commentCreationForm = this.createNewFormGroup();
  }

  createNewFormGroup() {
    return new FormGroup({
      content: new FormControl('', Validators.required)
    });
  }

  async onCreateComment() {
    let userName: string;
    let userId: string
    await this.httpUser.getUserWithToken(this.auth.authToken).subscribe((user: User) => {
      userName = user.lastName + ' ' + user.firstName;
      userId = user._id;
      const payload: Comment = {
        author: user.lastName + ' ' + user.firstName,
        authorId: user._id,
        content: this.commentCreationForm.value.content,
        date: new Date
      }
      this.httpComment.createComment(this.blogService.getBlogId, this.postId, payload).subscribe((data) => {
        if (data) {
          this.commentCreationForm.reset();
          this.httpPost.getSinglePost(this.blogService.getBlogId, this.postId).subscribe((data: any) => {
            this.post = data[0];
            this.onShow = false;
          });
        }
      });
    });

  }

}
