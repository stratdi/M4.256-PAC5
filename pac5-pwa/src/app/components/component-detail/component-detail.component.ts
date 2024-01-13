import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { ComponentService } from 'src/app/services/component.service';
import { Chart } from 'chart.js/auto';
import { Stats } from 'src/app/models/stats.interface';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css'],
})
export class ComponentDetailComponent {
  constructor(private service: ComponentService, private activatedRoute: ActivatedRoute) { }

  pokemon!: Pokemon;
  chart: any = [];
  panelOpenState = false;
  basicLoading = true;
  detailLoading = false;
  detailLoaded = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        console.log(params);

        this.basicLoading = true;
        this.detailLoaded = false;
        this.detailLoading = false;
        this.panelOpenState = false;

        console.log(this.panelOpenState);
        this.service
          .getPokemonById(params.id ? params.id : '0')
          .subscribe((poke) => { this.pokemon = poke; this.basicLoading = false });
      });

    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.service
    //   .getPokemonById(id ? id : '0')
    //   .subscribe((poke) => this.pokemon = poke);
  }

  loadDetail() {
    if (!this.detailLoaded) {
      this.detailLoading = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.service
        .getPokemonDetailsById(id ? id : '0')
        .subscribe((poke) => {
          this.pokemon = poke;
          this.loadChart(poke.stats);
          this.detailLoading = false;
          this.detailLoaded = true;
        });
    }
  }

  private loadChart(stats?: Stats) {
    console.log(stats);
    if (this.chart) this.chart = null; //destroy prev chart instance
    this.chart = new Chart('canvas', {
      type: 'radar',
      data: {
        labels: ['Punts de vida', 'Atac', 'Defensa', 'Atac especial', 'Defensa especial', 'Velocitat'],
        datasets: [
          {
            label: '',
            data: [stats?.hp, stats?.attack, stats?.defense, stats?.specAttack, stats?.specDefense, stats?.speed],
            fill: true,
            borderWidth: 1,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        elements: {
          line: {
            borderWidth: 3
          }
        }, scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 0,
            suggestedMax: 80,
            ticks: {
              callback: (val, index) => {
                return index % 2 === 0 ? val : undefined;
              },
            },
          }
        }
      }
    });
  }
}
