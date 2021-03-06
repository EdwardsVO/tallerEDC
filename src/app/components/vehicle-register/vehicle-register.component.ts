import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.scss']
})
export class VehicleRegisterComponent implements OnInit {

  collection = { count:5, data: []}
  registrarVehiculoForm: FormGroup;

  

  constructor(
    public fb: FormBuilder,
   
    
  ) { }

  ngOnInit(): void {

    this.registrarVehiculoForm = this.fb.group({
      serial: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      year: ['', Validators.required],
      placa: ['', Validators.required],
      foto: ['', Validators.required]
    })

    for(var i = 0; i < this.collection.count; i++){
      this.collection.data.push({
        serial: i,
        marca: "marca"+i,
        modelo: "modelo" +i,
        year: "year" +i,
        placa: "placa" +i,
        foto: "foto" +i
      })
    }
  }

  
  

  delete(item:any):void{

    //this.firebaseServiceService.deleteEstudiante(item.idFirebase);

    this.collection.data.pop();

  }

  saveCar():void {

    // this.firebaseServiceService.createEstudiante(this.estudianteForm.value).then(resp => {
    //   this.estudianteForm.reset();
    //   this.modalService.dismissAll();
    // }).catch(error => {
    //   console.error(error)
    // })

    this.collection.data.push(this.registrarVehiculoForm.value);
    this.registrarVehiculoForm.reset();

  }

  // actualizarStudent(){

  //   if(!isNullOrUndefined(this.idFirebaseActualizar)){
  //     this.firebaseServiceService.updateEstudiante(this.idFirebaseActualizar, this.estudianteForm.value).then(resp => {
  //     this.estudianteForm.reset();
  //     this.modalService.dismissAll();
  //     }).catch(error => {
  //       console.error(error)
  //     })

  //   }
    
  // }

  

  brands = [
    {
      "num_models": 3,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Chrysler-logo-1.jpg",
      "max_car_id": 104,
      "id": 1,
      "name": "chrysler",
      "avg_horsepower": 291.3333333333333,
      "avg_price": 32971.666666666664
    },
    {
      "num_models": 8,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Honda-logo-1.jpg",
      "max_car_id": 152,
      "id": 2,
      "name": "honda",
      "avg_horsepower": 190.625,
      "avg_price": 27965
    },
    {
      "num_models": 18,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Mercedes-Benz-logo-1.jpg",
      "max_car_id": 270,
      "id": 3,
      "name": "mercedes-benz",
      "avg_horsepower": 333.94444444444446,
      "avg_price": 80681.94444444444
    },
    {
      "num_models": 6,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Ram-logo-1.jpg",
      "max_car_id": 307,
      "id": 4,
      "name": "ram",
      "avg_horsepower": 299.8333333333333,
      "avg_price": 31406.666666666668
    },
    {
      "num_models": 19,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Ford-logo-1.jpg",
      "max_car_id": 125,
      "id": 5,
      "name": "ford",
      "avg_horsepower": 281.2631578947368,
      "avg_price": 34998.68421052631
    },
    {
      "num_models": 9,
      "img_url": "http://ts2.mm.bing.net/th?id=OIP.M6d3b221e6c330e62efcd088e220170bcH0&pid=15.1",
      "max_car_id": 146,
      "id": 6,
      "name": "gmc",
      "avg_horsepower": 292.3333333333333,
      "avg_price": 40609.444444444445
    },
    {
      "num_models": 22,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Audi-logo-1.jpg",
      "max_car_id": 21,
      "id": 7,
      "name": "audi",
      "avg_horsepower": 340.59090909090907,
      "avg_price": 66631.81818181818
    },
    {
      "num_models": 7,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Subaru-logo-1.jpg",
      "max_car_id": 330,
      "id": 8,
      "name": "subaru",
      "avg_horsepower": 192.14285714285714,
      "avg_price": 27159.285714285714
    },
    {
      "num_models": 6,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Rolls-Royce-logo-1.jpg",
      "max_car_id": 315,
      "id": 9,
      "name": "rolls-royce",
      "avg_horsepower": 518.1666666666666,
      "avg_price": 394858.3333333333
    },
    {
      "num_models": 8,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Porsche-logo-1.jpg",
      "max_car_id": 301,
      "id": 10,
      "name": "porsche",
      "avg_horsepower": 475.25,
      "avg_price": 203787.5
    },
    {
      "num_models": 31,
      "img_url": "http://ts3.mm.bing.net/th?id=OIP.M599f5f2d4af1c69e6d3889e235b214beH0&pid=15.1",
      "max_car_id": 64,
      "id": 11,
      "name": "bmw",
      "avg_horsepower": 379.2258064516129,
      "avg_price": 74501.6129032258
    },
    {
      "num_models": 7,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Volvo-logo-1.jpg",
      "max_car_id": 371,
      "id": 12,
      "name": "volvo",
      "avg_horsepower": 285.2857142857143,
      "avg_price": 45967.857142857145
    },
    {
      "num_models": 5,
      "img_url": "http://ts1.mm.bing.net/th?id=OIP.Mce36a6de2b649f08b6c612c1bcfbcf58H2&pid=15.1",
      "max_car_id": 236,
      "id": 13,
      "name": "lincoln",
      "avg_horsepower": 324.6,
      "avg_price": 45836
    },
    {
      "num_models": 4,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Maserati-logo-1.jpg",
      "max_car_id": 245,
      "id": 14,
      "name": "maserati",
      "avg_horsepower": 444,
      "avg_price": 139934
    },
    {
      "num_models": 4,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Acura-logo-1.jpg",
      "max_car_id": 3,
      "id": 15,
      "name": "acura",
      "avg_horsepower": 286.75,
      "avg_price": 45752.5
    },
    {
      "num_models": 2,
      "img_url": "http://ts4.mm.bing.net/th?id=OIP.Mc8b9a49eb7febd5471812578a1c2e300o0&pid=15.1",
      "max_car_id": 254,
      "id": 16,
      "name": "mclaren",
      "avg_horsepower": 641,
      "avg_price": 272862.5
    },
    {
      "num_models": 8,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Infiniti-logo-1.jpg",
      "max_car_id": 177,
      "id": 17,
      "name": "infiniti",
      "avg_horsepower": 311.375,
      "avg_price": 45612.5
    },
    {
      "num_models": 3,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Fiat-logo-1.jpg",
      "max_car_id": 115,
      "id": 18,
      "name": "fiat",
      "avg_horsepower": 158.33333333333334,
      "avg_price": 24535
    },
    {
      "num_models": 6,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Scion-logo-1.jpg",
      "max_car_id": 319,
      "id": 19,
      "name": "scion",
      "avg_horsepower": 145.66666666666666,
      "avg_price": 20232.5
    },
    {
      "num_models": 7,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Dodge-logo-1.jpg",
      "max_car_id": 112,
      "id": 20,
      "name": "dodge",
      "avg_horsepower": 352.14285714285717,
      "avg_price": 42466.42857142857
    },
    {
      "num_models": 3,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Bentley-logo-1.jpg",
      "max_car_id": 67,
      "id": 21,
      "name": "bentley",
      "avg_horsepower": 540.3333333333334,
      "avg_price": 235800
    },
    {
      "num_models": 5,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Aston-Martin-logo-1.jpg",
      "max_car_id": 11,
      "id": 22,
      "name": "aston-martin",
      "avg_horsepower": 531,
      "avg_price": 199819
    },
    {
      "num_models": 19,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Chevrolet-logo-1.jpg",
      "max_car_id": 100,
      "id": 23,
      "name": "chevrolet",
      "avg_horsepower": 250.8421052631579,
      "avg_price": 33572.36842105263
    },
    {
      "num_models": 6,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Land-Rover-logo-1.jpg",
      "max_car_id": 206,
      "id": 24,
      "name": "land-rover",
      "avg_horsepower": 304,
      "avg_price": 60779.166666666664
    },
    {
      "num_models": 7,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Mitsubishi-logo-1.jpg",
      "max_car_id": 274,
      "id": 25,
      "name": "mitsubishi",
      "avg_horsepower": 152.14285714285714,
      "avg_price": 23680.714285714286
    },
    {
      "num_models": 12,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Volkswagen-logo-1.jpg",
      "max_car_id": 363,
      "id": 26,
      "name": "volkswagen",
      "avg_horsepower": 203.08333333333334,
      "avg_price": 29929.583333333332
    },
    {
      "num_models": 21,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Toyota-logo-1.jpg",
      "max_car_id": 339,
      "id": 27,
      "name": "toyota",
      "avg_horsepower": 209.23809523809524,
      "avg_price": 36709.76190476191
    },
    {
      "num_models": 6,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Jeep-logo-1.jpg",
      "max_car_id": 187,
      "id": 28,
      "name": "jeep",
      "avg_horsepower": 239.83333333333334,
      "avg_price": 33440.833333333336
    },
    {
      "num_models": 14,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Hyundai-logo-1.jpg",
      "max_car_id": 160,
      "id": 29,
      "name": "hyundai",
      "avg_horsepower": 246.5,
      "avg_price": 32676.428571428572
    },
    {
      "num_models": 13,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Cadillac-logo-1.jpg",
      "max_car_id": 76,
      "id": 30,
      "name": "cadillac",
      "avg_horsepower": 372.15384615384613,
      "avg_price": 61818.46153846154
    },
    {
      "num_models": 2,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Lamborghini-logo-1.jpg",
      "max_car_id": 199,
      "id": 31,
      "name": "lamborghini",
      "avg_horsepower": 665,
      "avg_price": 393025
    },
    {
      "num_models": 25,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Lexus-logo-1.jpg",
      "max_car_id": 222,
      "id": 32,
      "name": "lexus",
      "avg_horsepower": 290.32,
      "avg_price": 52488.2
    },
    {
      "num_models": 2,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Alfa-Romeo-logo-1.jpg",
      "max_car_id": 6,
      "id": 33,
      "name": "alfa-romeo",
      "avg_horsepower": 237,
      "avg_price": 59900
    },
    {
      "num_models": 6,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Mini-logo-1.jpg",
      "max_car_id": 242,
      "id": 34,
      "name": "mini",
      "avg_horsepower": 154.33333333333334,
      "avg_price": 27158.333333333332
    },
    {
      "num_models": 9,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Kia-logo-1.jpg",
      "max_car_id": 191,
      "id": 35,
      "name": "kia",
      "avg_horsepower": 216.11111111111111,
      "avg_price": 28725.555555555555
    },
    {
      "num_models": 4,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Ferrari-logo-1.jpg",
      "max_car_id": 118,
      "id": 36,
      "name": "ferrari",
      "avg_horsepower": 633,
      "avg_price": 276428
    },
    {
      "num_models": 6,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Mazda-logo-1.jpg",
      "max_car_id": 251,
      "id": 37,
      "name": "mazda",
      "avg_horsepower": 163.5,
      "avg_price": 22278.333333333332
    },
    {
      "num_models": 19,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Nissan-logo-1.jpg",
      "max_car_id": 283,
      "id": 38,
      "name": "nissan",
      "avg_horsepower": 251.21052631578948,
      "avg_price": 36314.73684210526
    },
    {
      "num_models": 3,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Buick-logo-1.jpg",
      "max_car_id": 68,
      "id": 39,
      "name": "buick",
      "avg_horsepower": 236.33333333333334,
      "avg_price": 31050
    },
    {
      "num_models": 6,
      "img_url": "http://www.carlogos.org/uploads/car-logos/Jaguar-logo-1.jpg",
      "max_car_id": 183,
      "id": 40,
      "name": "jaguar",
      "avg_horsepower": 327.5,
      "avg_price": 63783.333333333336
    }
  ]

  carBrand: string;

  onClick (name: string): string {

    this.carBrand = name;
    let x = (<HTMLInputElement>document.getElementById('brandChosen')).value = name.toUpperCase();
    return x;
 }



}
