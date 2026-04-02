import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

// ── Shared dark theme palette ─────────────────────────────────────────
const ACCENT       = '#4a7cff';
const SUCCESS      = '#34d399';
const AMBER        = '#fbbf24';
const TEXT_MUTED   = '#454d5e';
const TEXT_SEC     = '#7a8394';
const BORDER       = '#272c36';
const SURFACE      = '#1a1e25';

const BASE_OPTIONS: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: TEXT_SEC,
        font: { family: "'IBM Plex Mono', monospace", size: 11 },
        boxWidth: 12,
        padding: 16,
      }
    },
    tooltip: {
      backgroundColor: '#13161b',
      borderColor: BORDER,
      borderWidth: 1,
      titleColor: '#e8eaf0',
      bodyColor: TEXT_SEC,
      titleFont: { family: "'IBM Plex Mono', monospace", size: 11 },
      bodyFont:  { family: "'IBM Plex Mono', monospace", size: 11 },
      padding: 12,
    }
  },
  scales: {
    x: {
      ticks: { color: TEXT_MUTED, font: { family: "'IBM Plex Mono', monospace", size: 10 } },
      grid:  { color: 'rgba(39,44,54,0.8)' },
      border:{ color: BORDER },
    },
    y: {
      ticks: { color: TEXT_MUTED, font: { family: "'IBM Plex Mono', monospace", size: 10 } },
      grid:  { color: 'rgba(39,44,54,0.8)' },
      border:{ color: BORDER },
    }
  }
};

@Component({
  selector: 'app-analytics',
  imports: [FormsModule, CommonModule, BaseChartDirective],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics implements OnInit {

  topProductsChart?: ChartConfiguration<'bar'>;
  activeUsersChart?: ChartConfiguration<'line'>;
  stockTrendsChart?: ChartConfiguration<'line'>;

  peakMonth = '—';

  barOptions:  ChartOptions<'bar'>  = { ...BASE_OPTIONS } as ChartOptions<'bar'>;
  lineOptions: ChartOptions<'line'> = { ...BASE_OPTIONS } as ChartOptions<'line'>;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadTopProducts();
    this.loadActiveUsers();
    this.loadStockTrends();
  }

  loadTopProducts() {
    this.analyticsService.topProducts().subscribe((res: any) => {
      this.topProductsChart = {
        type: 'bar',
        data: {
          labels: res.map((item: any) => item.name),
          datasets: [{
            label: 'Total Moved',
            data: res.map((item: any) => item.totalProductsMoved),
            backgroundColor: 'rgba(74, 124, 255, 0.25)',
            borderColor: ACCENT,
            borderWidth: 1.5,
            borderRadius: 4,
            hoverBackgroundColor: 'rgba(74, 124, 255, 0.4)',
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
          datasets: [{
            label: 'Total Movements',
            data: res.map((item: any) => item.totalMovements),
            borderColor: SUCCESS,
            backgroundColor: 'rgba(52, 211, 153, 0.08)',
            borderWidth: 2,
            pointBackgroundColor: SUCCESS,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4,
          }]
        }
      };
    });
  }

  loadStockTrends() {
    this.analyticsService.stockTrends().subscribe((res: any) => {
      const labels = res.map((item: any) => `${item.year}-${String(item.month).padStart(2, '0')}`);
      const data   = res.map((item: any) => item.totalMoved);

      // Compute peak month for metric card
      const maxVal  = Math.max(...data);
      const maxIdx  = data.indexOf(maxVal);
      this.peakMonth = labels[maxIdx] ?? '—';

      this.stockTrendsChart = {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Stock Flow',
            data,
            borderColor: AMBER,
            backgroundColor: 'rgba(251, 191, 36, 0.08)',
            borderWidth: 2,
            pointBackgroundColor: AMBER,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4,
          }]
        }
      };
    });
  }
}