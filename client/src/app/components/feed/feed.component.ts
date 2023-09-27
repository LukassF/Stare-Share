import { Observable, Subscription } from 'rxjs';
import { GetusersService } from 'src/app/services/getUsers/getusers.service';
import { GetpostsService } from './../../services/getPosts/getposts.service';
import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnDestroy {
  subscription: Subscription | undefined;
  posts: Post[] | undefined;
  colsAsIterable: number[] = [1, 2, 3];
  loading: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (
      event.target.innerWidth > 1400 &&
      !this.compareArrays(this.colsAsIterable, [1, 2, 3])
    ) {
      this.reloadMasonryLayout([1, 2, 3]);
    } else if (
      event.target.innerWidth <= 1400 &&
      event.target.innerWidth > 1000 &&
      !this.compareArrays(this.colsAsIterable, [1, 2])
    ) {
      this.reloadMasonryLayout([1, 2]);
    } else if (
      event.target.innerWidth <= 1000 &&
      !this.compareArrays(this.colsAsIterable, [1])
    ) {
      this.reloadMasonryLayout([1]);
    }
  }

  constructor(private getPostsS: GetpostsService) {
    this.loading = true;
    this.subscription = this.getPostsS.getAllPosts().subscribe((data) => {
      this.posts = data;
      this.sortPosts();
      this.loading = false;
    });
  }

  sortPosts() {
    this.posts?.sort(
      (a, b) =>
        Number(new Date(b.upload_date)) - Number(new Date(a.upload_date))
    );
  }

  compareArrays = (a: number[], b: number[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  reloadMasonryLayout(array: number[]) {
    this.colsAsIterable = array;
    this.posts = this.posts;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
