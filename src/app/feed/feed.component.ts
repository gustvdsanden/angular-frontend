import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post, User, UserComment } from '../models';
import { FormBuilder } from '@angular/forms';
import { AuthService, loginDetails } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../comment/comment.component';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  postingForm = this.formBuilder.group({
    postContent: '',
  })
  posts: Post[] = [];
  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private postService: PostService, private formBuilder: FormBuilder,) { }
  login: loginDetails = new loginDetails;
  user: User = new User;
  ngOnInit(): void {
    this.authService.getLogDetails().subscribe(async result => {
      this.login = { ...result }
      if (result.isLogged) {
        this.authService.fetchMyUser().subscribe((user) => {
          this.user = user;
        });
      }
    })
    this.getPosts();

  }
  submitPost() {
    if (this.postingForm.value.postContent != '') {
      this.postService.createPost(this.postingForm.value.postContent, this.user).subscribe(result => {
        this.posts.unshift(result);
        this.postingForm.reset();
      });
    }

  }
  deletePost(_id: string) {
    this.postService.deletePost(_id).subscribe(() => this.getPosts());
  }
  getPosts() {
    this.postService.getPosts().subscribe(result => {
      this.posts = [...result];
    });
  }
  toggleLike(_id: string) {
    this.postService.likePost(_id).subscribe(() => this.getPosts());
  }
  didILikeIt(likes: User[]): boolean {

    return likes.find(user => user._id = this.user._id) ? true : false;
  }
  navToProfile(userId: string): void {
    this.router.navigate(['/user/profile'], { queryParams: { userId: userId } })
  }
  commentDialog(postId: string) {
    const editDialog = this.dialog.open(CommentComponent, {
      width: '65vw',
    });

    editDialog.afterClosed().subscribe(result => {
      if (result != '') {
        let comment = new UserComment;
        comment.Content = result;
        if (result != undefined) {
          this.postService.addComment(postId, comment).subscribe(() => {
            this.getPosts()
          })
        }
      }
    });
  }

}
