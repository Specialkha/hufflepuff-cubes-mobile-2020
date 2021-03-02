import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCreationComponent } from '../components/blog-creation/blog-creation.component';
import { BlogComponent } from '../components/blog/blog.component';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'blog-creation',
    component: BlogCreationComponent
  },
  {
    path: 'blog/:id',
    component: BlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule { }
