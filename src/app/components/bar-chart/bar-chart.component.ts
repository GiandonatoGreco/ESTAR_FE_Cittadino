import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { BarChartDataI } from 'models/charts';
import { routes } from '../../../utils/routes';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  @Input() data!: BarChartDataI[];

  // dimensions: if left undefined, the chart will fit to the parent container size
  view: [number, number] = [400, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme: Color = {
    name: 'Nome',
    selectable: false,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#0066CC'],
  };

  constructor(private router: Router) {}

  onSelect(event: any) {
    this.router.navigate(['/', routes.documents.path]);
    console.log(event);
  }
}
