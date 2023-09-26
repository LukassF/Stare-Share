import { FormGroup, FormBuilder } from '@angular/forms';
import { CreatepostService } from './../../services/createPost/createpost.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentuserService } from 'src/app/services/currentUser/currentuser.service';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

const ALLOWED_TYPES = ['png', 'jpeg'];

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ scale: 0, opacity: 0 }),
        animate(200, style({ scale: 1, opacity: 1 })),
      ]),
      transition(':leave', [animate(200, style({ opacity: 0, scale: 0 }))]),
    ]),
  ],
})
export class PostCreatorComponent implements OnDestroy {
  error: string = '';
  imageBase64: string | undefined;
  subscription: Subscription | undefined;
  createPostForm: FormGroup = this.formB.group({
    file: '',
    desc: '',
  });

  constructor(
    private createpostS: CreatepostService,
    private currentUserS: CurrentuserService,
    private formB: FormBuilder,
    private toastr: ToastrService
  ) {}

  get userInitial() {
    return this.currentUserS.currentUser.value?.username[0].toUpperCase();
  }

  onFileChange(e: any) {
    if (e.target.files.length === 0) return;

    const extension = e.target.files[0].type.split('/')[1];
    if (!ALLOWED_TYPES.includes(extension)) {
      this.toastr.error('Only PNG and JPG files are allowed.');
      this.imageBase64 = '';
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // console.log(reader.result);
      this.imageBase64 = reader.result ? (reader.result as string) : '';
    };
  }

  submitForm() {
    if (
      !this.imageBase64 ||
      !this.currentUserS.currentUser.value ||
      !this.createPostForm.value.desc
    )
      return;

    this.subscription = this.createpostS
      .uploadImage(
        this.imageBase64,
        this.createPostForm.value.desc,
        this.currentUserS.currentUser.value.id
      )
      .subscribe({
        next: (res) =>
          res.success ? window.location.reload() : console.log(res.error),
        error: (err) => console.log(err),
      });
  }

  openFileInput() {
    const fileInput = document.querySelector('#file');
    if (fileInput) (fileInput as any).click();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
