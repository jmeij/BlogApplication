import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule
  ],
  selector: 'app-addblogpost',
  templateUrl: './addblogpost.component.html',
  styleUrl: './addblogpost.component.scss'
})
export class AddblogpostComponent {
  @Input() selectedBlog: Blog | undefined;

  form = new FormGroup({
    title: new FormControl('', Validators.minLength(2)),
    content: new FormControl(''),
  });

  constructor(
    private blogService: BlogService,
    private dialogRef: MatDialogRef<AddblogpostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.selectedBlog) {
      this.form.get('title')?.setValue(data.selectedBlog.title);
      this.form.get('content')?.setValue(data.selectedBlog.content);
    }
  }

  public Submit(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }
    const blog: Blog = {
      id: this.data.selectedBlog ? this.data.selectedBlog.id : '',
      title: this.form.get('title')?.value ?? '',
      content: this.form.get('content')?.value ?? '',
    };

    const saveObservable = this.data.selectedBlog
      ? this.blogService.updateBlogPost(blog)
      : this.blogService.addBlogPost(blog);

    saveObservable.subscribe(() => {
      this.form.reset();
      formDirective.resetForm();
      this.dialogRef.close(blog);
    });
  }
}
