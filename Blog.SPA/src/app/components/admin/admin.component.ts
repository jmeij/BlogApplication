import { Component } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddblogpostComponent } from './addblogpost/addblogpost.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  blogs: Blog[] = [];
  displayedColumns: string[] = ['id', 'title', 'content', 'actions'];
  title: string = 'Blog.SPA';
  selectedBlog: Blog | undefined;

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
      this.blogService.getBlogPosts().subscribe((blogs: Blog[]) => { this.blogs = blogs; });
    });
  }

  public editBlog(blog: Blog): void {
    this.selectedBlog = blog;
    this.openDialog();
  }

  public openNewBlog(): void {
    this.selectedBlog = undefined;
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddblogpostComponent, {
      data: {
        selectedBlog: this.selectedBlog
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedBlog = undefined;
        this.blogService.getBlogPosts().subscribe((blogs: Blog[]) => { this.blogs = blogs; });
      }
    });
  }

  public logout(): void {
    this.UserService.logout();
  }
}
