import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  isLoading = 0;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((data) => {
      this.isLoading = data;
    });
  }
}
