import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpPostService } from 'src/app/core/http/post/http-post.service';
import { Post } from 'src/app/core/model/post';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  post: any;

  isLoaded:boolean = false;

  constructor(private route: ActivatedRoute, private httpPost: HttpPostService, private blogService: BlogService) {
    this.route.params.subscribe((params) => {
      this.httpPost.getSinglePost(this.blogService.getBlogId, params.id).subscribe((data: any) => {
        this.post = data[0];
        this.isLoaded = true;
      });
    });
  }

  ngOnInit() { }

}
