import { Observable, Subscription } from 'rxjs';
import { GetusersService } from 'src/app/services/getUsers/getusers.service';
import { GetpostsService } from './../../services/getPosts/getposts.service';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnDestroy {
  subscription: Subscription | undefined;
  posts: Post[] = [];
  auxilliary: any = [];
  colsAsIterable: number[] = [1, 2, 3];
  loading: boolean = false;
  intersectionQuantity: number = 0;
  @ViewChild('endOfPosts') endOfPosts: any;

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

    if (window.innerWidth > 1400) this.colsAsIterable = [1, 2, 3];
    else if (window.innerWidth <= 1400 && window.innerWidth > 1000)
      this.colsAsIterable = [1, 2];
    else this.colsAsIterable = [1];
  }

  sortPosts() {
    this.posts?.sort((a, b) => b.likes + b.comments - (a.likes + a.comments));
  }

  private compareArrays = (a: number[], b: number[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  private reloadMasonryLayout(array: number[]) {
    this.colsAsIterable = array;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
