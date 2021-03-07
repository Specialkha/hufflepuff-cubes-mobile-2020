import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpPostService } from 'src/app/core/http/post/http-post.service';
import { RandomGeneratorService } from 'src/app/core/services/random-generator.service';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  @Input() onCreateOpen: boolean;
  @Output() onCloseCreatePost: EventEmitter<{ boolean: boolean, postId: string }> = new EventEmitter();

  postCreationForm: FormGroup;

  idBlog: string;

  constructor(private random: RandomGeneratorService, private httpPost: HttpPostService, private httpBlog: HttpBlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idBlog = params.id;
    });
    this.postCreationForm = this.newFormGroupForPostCreation();
  }

  newFormGroupForPostCreation() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', [Validators.required, Validators.maxLength(20000)])
    });
  }

  onCreate() {
    const postToCreate = {
      _id: this.random.guidGenerator(),
      title: this.postCreationForm.value.title,
      content: this.postCreationForm.value.content,
      date: new Date,
      comments: []
    }
    this.httpBlog.getSingleBlog(this.idBlog).subscribe((data: any) => {
      this.httpPost.createPostInBlog(data._id, postToCreate).subscribe((data: any) => {
        if (data) {
          this.onCreateOpen = false;
          const event = {
            boolean: this.onCreateOpen,
            postId: postToCreate._id
          };
          this.onCloseCreatePost.emit(event);
        }
      });
    });

  }
}