import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab6PageRoutingModule } from './tab6-routing.module';

import { Tab6Page } from './tab6.page';
import { BlogComponent } from '../components/blog/blog.component';
import { PostComponent } from '../components/post/post.component';
import { PostCreationComponent } from '../components/post-creation/post-creation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Tab6PageRoutingModule
  ],
  declarations: [Tab6Page, BlogComponent, PostCreationComponent]
})
export class Tab6PageModule { }
