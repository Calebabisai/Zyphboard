import { 
  Component, 
  signal, 
  computed, 
  effect,
  viewChild,
  ElementRef,
  OnDestroy 
} from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts';

@Component({
  selector: 'app-analytics',
  standalone: true,
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css'],
})
export class Analytics implements OnDestroy {
  /** References to chart container elements */
  private chart1El = viewChild<ElementRef<HTMLDivElement>>('chart1');
  private chart2El = viewChild<ElementRef<HTMLDivElement>>('chart2');
  /**Referencias a instancias de graficos */
  private chart1?: ApexCharts 
  private chart2?: ApexCharts 

  // Signals base
  revenueData = signal([4500, 4700, 5200, 5800, 6000, 6300, 7000]);
  sessionData = signal([3000, 3200, 3500, 4000, 4200, 4500, 4800]);

  totalRevenue = computed(() => 
    this.revenueData().reduce((sum, val) => sum + val, 0)
  );

  totalSessions = computed(() => 
    this.sessionData().reduce((sum, val) => sum + val, 0)
  );

  averageRevenue = computed(() => {
    const data = this.revenueData();
    return data.reduce((sum, val) => sum + val, 0) / data.length;
  });

  averageSessions = computed(() => {
    const data = this.sessionData();
    return data.reduce((sum, val) => sum + val, 0) / data.length;
  });

  // Chart options
  chart1Options = computed((): ApexOptions => ({
    chart: { 
      type: 'area', 
      height: 320, 
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    series: [{ name: 'Ingresos', data: this.revenueData() }],
    xaxis: { 
      categories: ['Ene','Feb','Mar','Abr','May','Jun','Jul'] 
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    },
    colors: ['#6366F1'],
    grid: { borderColor: '#e5e7eb' },
    tooltip: { 
      theme: 'light',
      y: { formatter: (val) => `$${val.toLocaleString()}` }
    }
  }));

  chart2Options = computed((): ApexOptions => ({
    chart: { 
      type: 'bar', 
      height: 320, 
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    series: [{ name: 'Sesiones', data: this.sessionData() }],
    xaxis: { 
      categories: ['Directo','Orgánico','Referido','Email','Social','Ads','Otro'] 
    },
    colors: ['#10B981'],
    plotOptions: { bar: { borderRadius: 6, columnWidth: '60%' } },
    grid: { borderColor: '#e5e7eb' },
    tooltip: { 
      theme: 'light',
      y: { formatter: (val) => `${val.toLocaleString()} sesiones` }
    },
    dataLabels: { enabled: false }
  }));

  constructor() {
    effect(() => {
      const el1 = this.chart1El();
      const el2 = this.chart2El();
      
      if (el1 && !this.chart1) {
        this.chart1 = new ApexCharts(el1.nativeElement, this.chart1Options());
        this.chart1.render();
      }
      
      if (el2 && !this.chart2) {
        this.chart2 = new ApexCharts(el2.nativeElement, this.chart2Options());
        this.chart2.render();
      }
    });

    effect(() => {
      const revenue = this.revenueData();
      const sessions = this.sessionData();
      
      this.chart1?.updateSeries([{ name: 'Ingresos', data: revenue }]);
      this.chart2?.updateSeries([{ name: 'Sesiones', data: sessions }]);
    });
  }

  ngOnDestroy(): void {
    this.chart1?.destroy();
    this.chart2?.destroy();
  }

  updateRevenue() {
    this.revenueData.update(arr => 
      arr.map(v => v + Math.floor(Math.random() * 300))
    );
  }

  updateSessions() {
    this.sessionData.update(arr => 
      arr.map(v => v + Math.floor(Math.random() * 200))
    );
  }

  updateBoth() {
    this.updateRevenue();
    this.updateSessions();
  }

  resetData() {
    this.revenueData.set([4500, 4700, 5200, 5800, 6000, 6300, 7000]);
    this.sessionData.set([3000, 3200, 3500, 4000, 4200, 4500, 4800]);
  }
}

