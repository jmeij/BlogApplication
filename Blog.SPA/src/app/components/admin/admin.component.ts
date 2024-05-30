import { Component } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  blogs: Blog[] = [];
  displayedColumns: string[] = ['id', 'title', 'content', 'actions'];
  title: string = 'Blog.SPA';
  form = new FormGroup({
    title: new FormControl('', Validators.minLength(2)),
    content: new FormControl(''),
  });

  constructor(
    private blogService: BlogService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.blogService.getBlogPosts().subscribe((blogs: Blog[]) => { this.blogs = blogs; });
  }

  public Submit(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }

    const newBlog: Blog = {
      id: '',
      title: this.form?.get('title')?.value ?? '',
      content: this.form?.get('content')?.value ?? '',
    };
    this.blogService.addBlogPost(newBlog).subscribe(() => {
      this.form.reset();
      formDirective.resetForm();
    });
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
