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
  blogs: Blog[] = [];
  newBlog: Blog = {
    title: '',
    content: ''
  }

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getBlogPosts().subscribe((blogs: Blog[]) => { this.blogs = blogs; });
  }

  public Submit() {
    this.blogService.getBlogPosts().subscribe((blogs: Blog[]) => { this.blogs = blogs; });
  }
}
