import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit{
  registrarUsuario: FormGroup;
  loading:boolean=false;

  constructor(
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService, 
    private router:Router,
    private firebaseError: CrudService
    ) {
    this.registrarUsuario = this.fb.group({
      email: ['',Validators.required], 
      password: ['',Validators.required], 
      r_password: ['',Validators.required], 
    })
  }

  ngOnInit(): void {
    
  }

  registar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const r_password = this.registrarUsuario.value.r_password;

    if(password !== r_password){
      this.toastr.error(
        'Las contraseñas ingresadas deben ser las mismas', 
        'Error'
      );
      return; 
    }

    this.loading = true;

      this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.loading = false;
        this.toastr.success('El usuario fue registrado con exito!', 'Usuario registrado');
        this.router.navigate(['/login']); 
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code),' Error')
      })
  }
    
}