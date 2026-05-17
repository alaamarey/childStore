import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class StatsComponent implements OnInit, AfterViewInit {

  adminService = inject(AdminService);

  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('usersChart')   usersChartRef!:   ElementRef<HTMLCanvasElement>;
  @ViewChild('ordersChart')  ordersChartRef!:  ElementRef<HTMLCanvasElement>;
  @ViewChild('productsChart') productsChartRef!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  ngOnInit(): void {
    this.adminService.getStats().subscribe();
  }

  ngAfterViewInit(): void {
    this.buildCharts();
  }

  private buildCharts(): void {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const gridColor  = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
    const labelColor = '#888780';

    const baseScales = {
      x: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 11 } } },
      y: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 11 } } }
    };

    
    this.charts.push(new Chart(this.revenueChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          data: [420, 610, 380, 750, 890, 970],
          backgroundColor: '#7F77DD',
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: baseScales.x,
          y: {
            ...baseScales.y,
            ticks: {
              color: labelColor,
              font: { size: 11 },
              callback: (v) => '$' + v
            }
          }
        }
      }
    }));

    // Users line chart
    this.charts.push(new Chart(this.usersChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          data: [5, 7, 9, 11, 14, 17],
          borderColor: '#185FA5',
          backgroundColor: isDark ? 'rgba(24,95,165,0.15)' : 'rgba(24,95,165,0.08)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#185FA5',
          pointRadius: 3,
          pointHoverRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: baseScales
      }
    }));

    // Orders doughnut
    this.charts.push(new Chart(this.ordersChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Delivered', 'Pending', 'Processing'],
        datasets: [{
          data: [2, 1, 1],
          backgroundColor: ['#3B6D11', '#854F0B', '#534AB7'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: { legend: { display: false } }
      }
    }));

    // Products bar chart
    this.charts.push(new Chart(this.productsChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Electronics', 'Clothing', 'Home', 'Other'],
        datasets: [{
          data: [12, 10, 8, 3],
          backgroundColor: ['#185FA5', '#3B6D11', '#854F0B', '#73726c'],
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          ...baseScales,
          y: { ...baseScales.y, beginAtZero: true }
        }
      }
    }));
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
  }
}