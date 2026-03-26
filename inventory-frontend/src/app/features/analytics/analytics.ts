import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  ChartConfiguration } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);


@Component({
  selector: 'app-analytics',
  imports: [FormsModule, CommonModule, BaseChartDirective],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics implements OnInit {
 
  topProductsChart!: ChartConfiguration<'bar'>;
  activeUsersChart!: ChartConfiguration<'line'>;
  stockTrendsChart!: ChartConfiguration<'line'>;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadTopProducts();
    this.loadActiveUsers();
    this.loadStockTrends();
  }

  loadTopProducts() {
    this.analyticsService.topProducts().subscribe((res: any) => {
      this.topProductsChart  = {
        type: 'bar',
         data: {
         
          labels: res.map((item: any) => item.name),
          datasets: [
            {
              label: 'Total Moved',
              data: res.map((item: any) => item.totalProductsMoved),
            }]
        }
      };
    });
  }

  loadActiveUsers() {
    this.analyticsService.activeUsers().subscribe((res: any) => {
      this.activeUsersChart = {
        type: 'line',
        data: {
          labels: res.map((item: any) => item.name),
          datasets: [
            {
              label: 'Active Sessions',
              data: res.map((item: any) => item.totalMovements),
            }]
        }   

      };
    }); 
  }

  loadStockTrends() {
    this.analyticsService.stockTrends().subscribe((res: any) => {
      this.stockTrendsChart = {
       
        type: 'line',
        data: {
         
          labels: res.map((item: any) => `${item.year}-${String(item.month).padStart(2, '0')}`),
          datasets: [
            {
              label: 'Stock Level',
              data: res.map((item: any) => item.totalMoved),
            }]
        }
      };
    }
    );






  }
}
