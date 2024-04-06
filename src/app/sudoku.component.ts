import { Component, effect, inject } from '@angular/core';
import { SudokuService } from './sudoku.service';

@Component({
  selector: 'app-sudoku',
  standalone: true,
  imports: [],
  template: `
    @if (service.board().length) {
      <div class="flex flex-col gap-4">
        <div
          class="grid h-96 w-96 grid-cols-9 grid-rows-9 gap-0.5 border-2 border-black bg-black"
        >
          @for (row of service.board(); track rowIndex; let rowIndex = $index) {
            @for (col of row; track colIndex; let colIndex = $index) {
              <input
                type="number"
                [value]="col !== 0 ? col : ''"
                class="border-black bg-white text-center font-mono outline-none"
                [min]="1"
                [max]="9"
                [class.border-b-2]="rowIndex === 2 || rowIndex === 5"
                [class.border-r-2]="colIndex === 2 || colIndex === 5"
                [readOnly]="service.isReadonly(col, rowIndex, colIndex)"
                (change)="onChange($event, rowIndex, colIndex)"
              />
            }
          }
        </div>
        <div class="flex items-center justify-between">
          <button
            (click)="service.validate()"
            class="rounded bg-green-100 p-3 text-sm text-green-800"
          >
            Check
          </button>
          <button
            (click)="service.solve()"
            class="rounded bg-blue-100 p-3 text-sm text-blue-800"
          >
            Solve
          </button>
          <button
            (click)="service.clear()"
            class="rounded bg-orange-100 p-3 text-sm text-orange-800"
          >
            Clear
          </button>

          <code class="text-sm">Status: {{ service.status() }}</code>
        </div>
      </div>
    } @else {
      <div>Loading...</div>
    }
  `,
  host: {
    class: 'flex justify-center items-center w-full h-full',
  },
})
export class SudokuComponent {
  protected service = inject(SudokuService);

  constructor() {
    effect(() => {
      console.log(this.service.board());
    });
  }

  onChange(event: Event, rowIndex: number, colIndex: number) {
    const value = (event.target as HTMLInputElement).valueAsNumber;

    this.service.updateBoard(value, rowIndex, colIndex);
  }
}
