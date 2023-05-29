import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireStore: AngularFirestore) { }

  codeError(code: string){
    switch(code){
      //El correo ya existe
      case 'auth/email-already-in-use':
      return 'El usuario ya existe';

      //contraseña debil
      case 'auth/weak-password':
      return 'La contraseña debe de tener mas de 6 Caracteres';
      
      //correo invaluido
      case 'auth/invalid-email':
      return 'Correo invalido';

      //contraseña incorrecta
      case'auth/wrong-password':
      return 'Contraseña incorrecta';

      //El usuario no existe
      case'auth/user-not-found':
      return 'El usuario no existe';

      default:
      return 'Error desconocido';
    }
  }

    create_NewJugador(record:{}){
      return this.fireStore.collection('jugador').add(record);
    }

    read_Jugador(){
      return this.fireStore.collection('jugador').snapshotChanges();
  }
    create_NewJuego(record:{}){
      return this.fireStore.collection('juegos').add(record);
    }

    read_Juego(){
      return this.fireStore.collection('juegos').snapshotChanges();
    }
    delete_Juego(id:string){
      return this.fireStore.doc('juegos/'+id).delete();
    }

    update_Juego(id:string, record:{}){
      return this.fireStore.doc('juegos/'+id).update(record);
    }
}
