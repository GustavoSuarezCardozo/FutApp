import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/service/crud.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
  export class DashboardComponent implements OnInit{
    title ='firebase';

    juego:any;
    canchaName:String='';
    descName:String='';
    horaName:String='';
    fechaName:String='';
    valorName:number=0; 

    jugador:any;
    nomJugador:String='';
    apeJugador:String='';
    posJugador:String='';

  constructor(private crudService:CrudService){}  

  ngOnInit() {
    this.crudService.read_Jugador().subscribe(data=>{
      this.jugador=data.map(e=>{
        return{
          Id:e.payload.doc.id,
          Data:e.payload.doc.data()
        };
      })
    });
    this.crudService.read_Juego().subscribe(data=>{
      this.juego=data.map(e=>{
        return{
          Id:e.payload.doc.id,
          Data:e.payload.doc.data()
        };
      })
    })
  }

  removeRecord(Id: string){
    this.crudService.delete_Juego(Id);
  }

  createRecord(){
    let record={
      Cancha:this.canchaName,
      Desc:this.descName,
      Fecha:this.fechaName,
      Hora:this.horaName,
      Valor:this.valorName
    };

    this.crudService.create_NewJuego(record).then(resp=>{
      this.canchaName='';
      this.descName='';
      this.fechaName='';
      this.horaName='';
      this.valorName=0;
      console.log(resp);
    }).catch(error=>{
      console.log(error);
    });
  }

  createJugador(){
    let record={
      Nombre:this.nomJugador,
      Apellido:this.apeJugador,
      Posicion:this.posJugador
    };

    this.crudService.create_NewJugador(record).then(resp=>{
      this.nomJugador='';
      this.apeJugador='';
      this.posJugador='';
      console.log(resp);
    }).catch(error=>{
      console.log(error);
    });
  }
}
   