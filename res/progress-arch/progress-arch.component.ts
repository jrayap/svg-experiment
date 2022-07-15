import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Arch } from './arch';

const ALPHA_DEG = 60;

const NO_DATA = '- - ';

@Component({
  selector: 'app-at-progress-arch',
  templateUrl: './progress-arch.component.html',
  styleUrls: ['./progress-arch.component.scss']
})
export class ProgressArchComponent implements OnInit, OnChanges {
  @Input() overdueValue: number;
  @Input() dueValue: number;
  @Input() completedValue: number;
  @Input() totalValue: number;
  @Input() width: number;
  @Input() strokeWidth: number;

  arch: Arch;

  noData: string = NO_DATA;

  constructor() {
    // width and strokeWidth default values
    this.width = this.width || 200;
    this.strokeWidth = this.strokeWidth || this.width / 20;
  }

  ngOnInit() {
    this.arch = new Arch(this.width, this.strokeWidth, this.calcPercent(), ALPHA_DEG);
  }

  ngOnChanges() {
    this.arch = new Arch(this.width, this.strokeWidth, this.calcPercent(), ALPHA_DEG);
  }

  calcPercent() {
    return Math.round((this.completedValue * 100) / this.totalValue);
  }

  isDataLoaded(): boolean {
    return this.overdueValue && this.dueValue && this.completedValue ? true : false;
  }
}
