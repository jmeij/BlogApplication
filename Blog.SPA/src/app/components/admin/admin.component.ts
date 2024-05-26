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
  title: string = 'Blog.SPA';
  form = new FormGroup({
    title: new FormControl('', Validators.minLength(2)),
    content: new FormControl(''),
  });

  constructor(
    private blogService: BlogService,
    private UserService: UserService
  ) { }

  public Submit(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }

    const newBlog: Blog = {
      title: this.form?.get('title')?.value ?? '',
      content: this.form?.get('content')?.value ?? '',
    };
    this.blogService.addBlogPost(newBlog).subscribe(() => {
      this.form.reset();
      formDirective.resetForm();
    });
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
