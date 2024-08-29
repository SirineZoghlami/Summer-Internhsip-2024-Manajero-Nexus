import { Component, OnInit } from '@angular/core';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'ngx-nexus-dashboard',
  templateUrl: './nexus-dashboard.component.html',
  styleUrls: ['./nexus-dashboard.component.scss']
})
export class NexusDashboardComponent implements OnInit {
  projects: any[] = [];
  kpis: any = {};
  performanceData: any = {};
  efficiencyData: any = {};

  statusChartOption: EChartsOption = {};
  goalsChartOption: EChartsOption = {};
  performanceChartOption: EChartsOption = {};
  efficiencyChartOption: EChartsOption = {};

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
        this.updateCharts();
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
        this.updateCharts();
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
        this.updateCharts();
      },
      (error) => {
        console.error('Error loading efficiency data', error);
      }
    );
  }
  
  updateCharts(): void {
    // Status Chart
    this.statusChartOption = {
      tooltip: {},
      legend: {
        data: ['Status']
      },
      series: [
        {
          name: 'Status',
          type: 'pie',
          radius: '50%',
          data: Object.entries(this.kpis.statusCount || {}).map(([key, value]) => ({
            name: key,
            value: value
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  
    // Goals Chart
    this.goalsChartOption = {
      tooltip: {},
      legend: {
        data: ['Goals Count']
      },
      xAxis: {
        type: 'category',
        data: Object.keys(this.kpis.goalsCount || {})
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Goals Count',
          type: 'bar',
          data: Object.values(this.kpis.goalsCount || {}),
          itemStyle: {
            color: '#4BC0C0'
          }
        }
      ]
    };
  
    // Performance Chart
    this.performanceChartOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Performance Data']
      },
      xAxis: {
        type: 'category',
        data: Object.keys(this.performanceData || {})
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Performance Data',
          type: 'line',
          data: Object.values(this.performanceData || {}),
          itemStyle: {
            color: '#FF5733'
          },
          areaStyle: {}
        }
      ]
    };
  
   
  // Efficiency Chart (Radar Chart)
this.efficiencyChartOption = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Efficiency']
  },
  xAxis: {
    type: 'category',
    data: Object.keys(this.efficiencyData)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Efficiency',
      type: 'line',
      data: Object.values(this.efficiencyData),
      itemStyle: {
        color: '#FF5733'
      }
    }
  ]
};

  
  }

  navigateToProjects(): void {
    this.router.navigate(['pages/agile/nexus/project']); 
  }
}