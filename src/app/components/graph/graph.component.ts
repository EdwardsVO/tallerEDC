import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { Label } from 'ng2-charts';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  clients = []
  namesC = [] //JSON
  moneySpentC = [] //json

  names = [];
  moneySpent = [];

  constructor(private _fst: AngularFirestore) { }

  ngOnInit(): void {
    this.getClientsNames();
    this.getProfits();
  }

  async getClientsNames() {
    await this._fst.collection('users', ref => ref.where("moneySpent", ">", 0)).snapshotChanges().subscribe(x => {
      this.namesC = x.map((e: any) => {
        return {
          name: e.payload.doc.data().name
        }
      })
    })
  }

  async getProfits() {
    await this._fst.collection('users', ref => ref.where("moneySpent", ">", 0)).snapshotChanges().subscribe(x => {
      this.moneySpentC = x.map((e: any) => {
        return {
          moneySpent: e.payload.doc.data().moneySpent
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
    { data: this.moneySpent, label: 'Money' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public randomize(): void {
    if (this.moneySpent.length == 0) {
      this.refresh();
    }
    else {
      this.moneySpent.length = 0;
      this.names.length = 0;
      this.refresh();
    }
  }

  public refresh() {
    for (let i in this.namesC) {
      this.names.push(this.namesC[i].name)
    }
    for (let i in this.moneySpentC) {
      this.moneySpent.push(this.moneySpentC[i].moneySpent)
    }
  }

}
