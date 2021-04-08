import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { Label } from 'ng2-charts';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-graph-mech',
  templateUrl: './graph-mech.component.html',
  styleUrls: ['./graph-mech.component.scss']
})
export class GraphMechComponent implements OnInit {

  

  namesM = [] //JSON
  carsRepairedM = [] //json

  names = [];
  carsRepaired = [];

  constructor(private _fst: AngularFirestore) { }

  ngOnInit(): void {
    this.getMechNames();
    this.getCarsR();
  }

  async getMechNames() {
    await this._fst.collection('users', ref => ref.where("carsRepaired", ">", 0)).snapshotChanges().subscribe(x => {
      this.namesM = x.map((e: any) => {
        return {
          name: e.payload.doc.data().name
        }
      })
    })
  }

  async getCarsR() {
    await this._fst.collection('users', ref => ref.where("carsRepaired", ">", 0)).snapshotChanges().subscribe(x => {
      this.carsRepairedM = x.map((e: any) => {
        return {
          carsRepaired: e.payload.doc.data().carsRepaired
        }
      })
    })
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = this.names;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: this.carsRepaired, label: 'Carros Reparados' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public randomize(): void {
    if (this.carsRepaired.length == 0) {
      this.refresh();
    }
    else {
      this.carsRepaired.length = 0;
      this.names.length = 0;
      this.refresh();
    }
  }

  public refresh() {
    for (let i in this.namesM) {
      this.names.push(this.namesM[i].name)
    }
    for (let i in this.carsRepairedM) {
      this.carsRepaired.push(this.carsRepairedM[i].carsRepaired)
    }
    console.log(this.carsRepaired)
    console.log(this.names)
  }

}
