import { Component, OnInit } from '@angular/core';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nexus-dashboard',
  templateUrl: './nexus-dashboard.component.html',
  styleUrls: ['./nexus-dashboard.component.scss']
})
export class NexusDashboardComponent implements OnInit {
  kpis: any = {};

  constructor(private nexusProjectService: NexusProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadKpis();
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

  renderCharts(): void {
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
  }


    navigateToProjects(): void {
      this.router.navigate(['pages/agile/nexus/project']); 
    }

  }

