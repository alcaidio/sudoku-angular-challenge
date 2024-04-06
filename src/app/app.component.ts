import { Component } from '@angular/core';
import { SudokuComponent } from './sudoku.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SudokuComponent],
  template: `<main class="h-screen w-screen">
    <app-sudoku />
  </main>`,
  styles: [],
})
export class AppComponent {}
