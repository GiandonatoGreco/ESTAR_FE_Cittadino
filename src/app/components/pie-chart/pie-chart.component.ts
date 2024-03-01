import { Component, Input } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { PieChartDataI } from 'models/charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  @Input() data!: PieChartDataI[];
  customLabels: { [k: string]: string } = {};

  //dimensions
  view: [number, number] = [400, 300];

  // options
  legend = true;
  labels = true;
  doughnut = true;
  arcWidth = 0.4;
  legendPosition: LegendPosition = LegendPosition.Right;

  colorScheme: Color = {
    name: 'Nome',
    selectable: false,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#0066CC'],
  };

  onSelect(event: any) {
    console.log(event);
  }
}
