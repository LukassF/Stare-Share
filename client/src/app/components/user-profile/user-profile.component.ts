import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, mergeMap, switchMap } from 'rxjs';
import { CreatepostService } from 'src/app/services/createPost/createpost.service';
import { GetpostsService } from 'src/app/services/getPosts/getposts.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userId: number | undefined;
  userPosts$: Observable<Post[]> | undefined;
  subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private getPostsS: GetpostsService,
    private createPostS: CreatepostService,
    private router: Router
  ) {}

  get liked() {
    return this.createPostS.likedPosts.value;
  }

  ngOnInit(): void {
    this.onRouterEvents();
    // .pipe(mergeMap(() => this.route.paramMap))
    // .subscribe((value) => {
    //   console.log(value);
    //   // let id = value.get('id');
    //   // this.userId = Number(id);
    // });

    // console.log(this.userId);
  }

  onRouterEvents() {
    this.subscription = this.router.events
      .pipe(
        filter((event) => event.type === 15),
        switchMap(() => this.route.paramMap)
      )
      .subscribe((item) => {
        // console.log(item);
        // @ts-ignore
        this.userId = Number(item.params.id);
        this.getUserPosts();
      });
    // .pipe(mergeMap(() => this.route.paramMap))
    // .subscribe((value) => {
    //   console.log(value);
    //   // let id = value.get('id');
    //   // this.userId = Number(id);
    // });

    // console.log(this.userId);

    // this.getUserPosts();
  }

  getUserPosts() {
    if (this.userId)
      this.userPosts$ = this.getPostsS.getPostsByUserId(this.userId);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
