import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { Blog } from 'src/app/core/model/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  blogId: string;
  blog: Blog;

  constructor(private route: ActivatedRoute, private httpBlog: HttpBlogService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.blogId = params.id;
      this.httpBlog.getSingleBlog(this.blogId).subscribe((blog: Blog) => {
        this.blog = blog;
      });
    });
  }

}
