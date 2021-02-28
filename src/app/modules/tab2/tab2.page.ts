import { Component } from '@angular/core';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { Blog } from 'src/app/core/model/blog';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  blogs: Blog;

  constructor(private blogHttp: HttpBlogService) {
    blogHttp.getBlogs().subscribe((data: any) => {
      console.log(data);
      this.blogs = data;
    })
  }

}
