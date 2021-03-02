import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { Blog } from 'src/app/core/model/blog';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  blogs: Blog;

  constructor(private blogHttp: HttpBlogService, public auth: AuthService, private router: Router) {
    blogHttp.getBlogs().subscribe((data: any) => {
      console.log(data);
      this.blogs = data;
    })
  }

}
