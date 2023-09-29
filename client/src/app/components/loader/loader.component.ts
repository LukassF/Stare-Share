import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  colsAsIterable: number[] = [1, 2, 3];
  boxes: number[] = Array(9).fill(1);
}
