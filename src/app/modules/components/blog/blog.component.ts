import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id);
    })
  }

}
