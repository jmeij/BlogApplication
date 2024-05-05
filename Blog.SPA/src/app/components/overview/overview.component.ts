import { Component } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getBlogPosts().subscribe((blogs: Blog[]) => { this.blogs = blogs; });
  }

}
