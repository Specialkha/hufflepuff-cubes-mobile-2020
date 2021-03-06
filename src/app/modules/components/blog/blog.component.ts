import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpBlogService } from 'src/app/core/http/blog/httpBlog.service';
import { HttpUserService } from 'src/app/core/http/user/httpUser.service';
import { Blog } from 'src/app/core/model/blog';
import { Post } from 'src/app/core/model/post';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  blogId: string;
  blog: Blog;
  isLoaded: boolean = false;
  onCreateOpen: boolean = false;
  isBlogOwner: boolean = false;

  constructor(private route: ActivatedRoute, private httpBlog: HttpBlogService, private httpUser: HttpUserService, private router: Router, private blogService: BlogService, private auth: AuthService) {
    this.route.params.subscribe(params => {
      this.blogId = params.id;
      this.httpBlog.getSingleBlog(this.blogId).subscribe((blog: Blog) => {
        this.blog = blog;
        this.httpUser.getSingleUserWithId(this.blog.authorId).subscribe((user: User) => {
          httpUser.getUserWithToken(auth.authToken).subscribe((userLoggedIn: User) => {
            if (blog.authorId === userLoggedIn._id) {
              this.isBlogOwner = true;
              this.blog.authorId = user.lastName + ' ' + user.firstName;
              this.isLoaded = true;
            } else {
              this.blog.authorId = user.lastName + ' ' + user.firstName;
              this.isLoaded = true;
            }
          }, err => {
            this.blog.authorId = user.lastName + ' ' + user.firstName;
            this.isLoaded = true;
          });
        });
      });
    });
  }

  ngOnInit() {

  }

  onNavigate(blogId: string, post: Post) {
    this.blogService.blogId = blogId;
    this.router.navigate(['/tabs', 'tab7', 'post', post._id]);
  }

  dataFromChild(event) {
    this.onCreateOpen = event;
  }

}
