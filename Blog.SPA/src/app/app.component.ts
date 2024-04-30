import { Component } from '@angular/core';
import { BlogService } from './blog.service';
import { Blog } from './models/blog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'Blog.SPA';
  blog: Blog = {
    Title: '',
    Content: ''
  }

  constructor(private blogService: BlogService) { }

  public Submit() {
    this.blogService.addBlogPost(this.blog)
  }
}
