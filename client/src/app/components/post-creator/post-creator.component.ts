import { FormGroup, FormBuilder } from '@angular/forms';
import { CreatepostService } from './../../services/createPost/createpost.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';

const ALLOWED_TYPES = ['png', 'jpeg'];

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.scss'],
})
export class PostCreatorComponent implements OnDestroy {
  error: string = '';
  imageBase64: string | undefined;
  subscription: Subscription | undefined;
  createPostForm: FormGroup = this.formB.group({
    file: '',
  });

  constructor(
    private createpostS: CreatepostService,
    private currentUserS: CurrentuserService,
    private formB: FormBuilder
  ) {}

  onFileChange(e: any) {
    if (e.target.files.length === 0) return;

    const extension = e.target.files[0].type.split('/')[1];
    if (!ALLOWED_TYPES.includes(extension)) {
      this.error = 'Incorrect file type!';
      this.imageBase64 = '';
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imageBase64 = reader.result ? (reader.result as string) : '';
    };
  }

  submitForm() {
    if (!this.imageBase64 || !this.currentUserS.currentUser.value) return;

    this.subscription = this.createpostS
      .uploadImage(
        this.imageBase64,
        'wehiwe',
        this.currentUserS.currentUser.value.id
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err),
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
