import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from '../components/post/post.component';

import { Tab6Page } from './tab6.page';

const routes: Routes = [
  {
    path: '',
    component: Tab6Page
  },
  {
    path: 'post/:id',
    component: PostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab6PageRoutingModule {}
