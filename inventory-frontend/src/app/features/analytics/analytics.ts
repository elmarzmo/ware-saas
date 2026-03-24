import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  ChartConfiguration } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-analytics',
  imports: [FormsModule, CommonModule, BaseChartDirective],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics implements OnInit {

  topProductsChart!: ChartConfiguration<'bar'>;
  activeUsersChart!: ChartConfiguration<'bar'>;
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
         
          labels: res.map((item: any) => item.productName),
          datasets: [
            {
              label: 'Total Moved',
              data: res.map((item: any) => item.totalMoved),
            }]
        }
      };
    });
  }

  loadActiveUsers() {
    this.analyticsService.activeUsers().subscribe((res: any) => {
      this.activeUsersChart = {
        type: 'bar',
        data: {
          labels: res.map((item: any) => item.username),
          datasets: [
            {
              label: 'Active Sessions',
              data: res.map((item: any) => item.activeSessions),
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
         
          labels: res.map((item: any) => item.date),
          datasets: [
            {
              label: 'Stock Level',
              data: res.map((item: any) => item.stockLevel),
            }]
        }
      };
    }
    );






  }
}