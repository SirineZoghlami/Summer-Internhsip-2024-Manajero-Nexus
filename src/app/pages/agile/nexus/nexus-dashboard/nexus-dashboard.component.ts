// nexus-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-nexus-dashboard',
  templateUrl: './nexus-dashboard.component.html',
  styleUrls: ['./nexus-dashboard.component.scss']
})
export class NexusDashboardComponent implements OnInit {
  projects: any[] = [];
  kpis: any = {};
  performanceData: any = {};
  efficiencyData: any = {};

  constructor(private nexusProjectService: NexusProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadKpis();
    this.loadPerformanceData();
    this.loadEfficiencyData();
  }

  loadProjects(): void {
    this.nexusProjectService.getAllProjects().subscribe(
      (projects) => {
        this.projects = projects;
        this.renderCharts();
      },
      (error) => {
        console.error('Error loading projects', error);
      }
    );
  }

  loadKpis(): void {
    this.nexusProjectService.getProjectKpis().subscribe(
      (data) => {
        this.kpis = data;
        this.renderCharts();
      },
      (error) => {
        console.error('Error loading KPIs', error);
      }
    );
  }

  loadPerformanceData(): void {
    this.nexusProjectService.getPerformanceData().subscribe(
      (data) => {
        this.performanceData = data;
        this.renderCharts();
      },
      (error) => {
        console.error('Error loading performance data', error);
      }
    );
  }

  loadEfficiencyData(): void {
    this.nexusProjectService.getEfficiencyData().subscribe(
      (data) => {
        this.efficiencyData = data;
        this.renderCharts();
      },
      (error) => {
        console.error('Error loading efficiency data', error);
      }
    );
  }

  renderCharts(): void {
    // Status Chart
    const statusChartCtx = (document.getElementById('statusChart') as HTMLCanvasElement).getContext('2d');
    if (statusChartCtx) {
      new Chart(statusChartCtx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.kpis.statusCount || {}),
          datasets: [{
            data: Object.values(this.kpis.statusCount || {}),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }]
        }
      });
    }

    // Goals Chart
    const goalsChartCtx = (document.getElementById('goalsChart') as HTMLCanvasElement).getContext('2d');
    if (goalsChartCtx) {
      new Chart(goalsChartCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.kpis.goalsCount || {}),
          datasets: [{
            label: 'Goals Count',
            data: Object.values(this.kpis.goalsCount || {}),
            backgroundColor: '#4BC0C0'
          }]
        }
      });
    }

    // Performance Chart
    const performanceChartCtx = (document.getElementById('performanceChart') as HTMLCanvasElement).getContext('2d');
    if (performanceChartCtx) {
      new Chart(performanceChartCtx, {
        type: 'line',
        data: {
          labels: Object.keys(this.performanceData || {}),
          datasets: [{
            label: 'Performance Data',
            data: Object.values(this.performanceData || {}),
            borderColor: '#FF5733',
            backgroundColor: 'rgba(255, 87, 51, 0.2)',
            fill: true
          }]
        }
      });
    }

    // Efficiency Chart
    const efficiencyChartCtx = (document.getElementById('efficiencyChart') as HTMLCanvasElement).getContext('2d');
    if (efficiencyChartCtx) {
      new Chart(efficiencyChartCtx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(this.efficiencyData || {}),
          datasets: [{
            data: Object.values(this.efficiencyData || {}),
            backgroundColor: ['#FFC300', '#FF5733']
          }]
        }
      });
    }


    
  }




  navigateToProjects(): void {
    this.router.navigate(['pages/agile/nexus/project']); 
}

}
