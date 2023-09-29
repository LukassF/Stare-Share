import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  Observable,
  Subscription,
  filter,
  map,
  mergeMap,
  switchMap,
} from 'rxjs';
import { CreatepostService } from 'src/app/services/createPost/createpost.service';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';
import { GetpostsService } from 'src/app/services/getPosts/getposts.service';
import { GetusersService } from 'src/app/services/getUsers/getusers.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userId: number | undefined;
  userPosts: Post[] | undefined;
  subscription: Subscription | undefined;
  userInfo$: Observable<User> | undefined;
  subscriptionRouter: Subscription | undefined;
  showLiked: boolean = false;
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

  constructor(
    private route: ActivatedRoute,
    private getPostsS: GetpostsService,
    private createPostS: CreatepostService,
    private getUserS: GetusersService,
    private currentUserS: CurrentuserService,
    private router: Router
  ) {
    if (window.innerWidth > 1400) this.colsAsIterable = [1, 2, 3];
    else if (window.innerWidth <= 1400 && window.innerWidth > 1000)
      this.colsAsIterable = [1, 2];
    else this.colsAsIterable = [1];
  }

  get liked() {
    return this.createPostS.likedPosts.value;
  }

  get isMine() {
    return this.userId === this.currentUserS.currentUser.value?.id;
  }

  ngOnInit(): void {
    this.onRouterEvents();
  }

  onRouterEvents() {
    this.subscriptionRouter = this.router.events
      .pipe(
        filter((event) => event.type === 15),
        switchMap(() => this.route.paramMap)
      )
      .subscribe((item) => {
        this.userId = Number((item as any).params.id);
        this.getUserInfo(this.userId);
        this.getUserPosts();
      });
  }

  getUserPosts() {
    this.loading = true;
    if (this.userId)
      this.subscription = this.getPostsS
        .getPostsByUserId(this.userId)
        .subscribe((data) => {
          this.userPosts = data;
          this.loading = false;
        });
  }

  getUserInfo(id: number) {
    this.userInfo$ = this.getUserS.getOneUser(id).pipe(
      map((item) => ({
        ...item[0],
        liked: item[0].liked.split(',').length - 1,
      }))
    );
  }

  toggleShowLiked(): void {
    this.showLiked = !this.showLiked;
  }

  private compareArrays = (a: number[], b: number[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  private reloadMasonryLayout(array: number[]) {
    this.colsAsIterable = array;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionRouter?.unsubscribe();
  }
}
