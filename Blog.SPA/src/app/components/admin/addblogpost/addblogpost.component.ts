import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-addblogpost',
  templateUrl: './addblogpost.component.html',
  styleUrl: './addblogpost.component.scss'
})
export class AddblogpostComponent {
  form = new FormGroup({
    title: new FormControl('', Validators.minLength(2)),
    content: new FormControl(''),
  });

  constructor(
    private blogService: BlogService
  ) { }

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
}
