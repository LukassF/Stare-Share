import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
})
export class IndividualComponent {
  @Input() comment: Comment | undefined;
  @Input() post: Post | undefined;
  isExpanded: boolean = false;

  commentDate(comment: Comment) {
    if (comment)
      return (
        new Date(comment.comment_date).toDateString().slice(4) +
        ', ' +
        new Date(comment.comment_date).getHours() +
        ':' +
        new Date(comment.comment_date).getMinutes().toString().padStart(2, '0')
      );
    else return undefined;
  }

  expandComment() {
    this.isExpanded = !this.isExpanded;
  }
}
