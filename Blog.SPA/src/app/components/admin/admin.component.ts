import { Component } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddblogpostComponent } from './addblogpost/addblogpost.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  blogs: Blog[] = [];
  displayedColumns: string[] = ['id', 'title', 'content', 'actions'];
  title: string = 'Blog.SPA';

  constructor(
    private blogService: BlogService,
    private dialog: MatDialog,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.blogService.getBlogPosts().subscribe((blogs: Blog[]) => { this.blogs = blogs; });
  }

  public deleteBlog(blog: Blog): void {
    this.blogService.deleteBlogPost(blog.id).subscribe(() => {
      console.log('Deleting blog post:', blog);
      this.blogs.splice(this.blogs.indexOf(blog), 1);
    });
  }

  public editBlog(blog: Blog): void {
    console.log('Editing blog post:', blog);
  }

  public openDialog(): void {
    this.dialog.open(AddblogpostComponent);
  }

  public validateToken(): void {
    console.log('Validating token...');
    this.UserService.isLoggedIn().subscribe((response) => {
      console.log(response);
    });
  }

  public logout(): void {
    this.UserService.logout();
  }
}
