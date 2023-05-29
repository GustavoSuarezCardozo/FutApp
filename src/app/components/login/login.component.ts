import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario : FormGroup;

  constructor(
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService, 
    private router:Router,
    private firebaseError: CrudService 
  ){ 
    this.loginUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  ngOnInit(): void { }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
      this.afAuth.signInWithEmailAndPassword(email, password).then((user)=>{
        console.log(user);
        this.router.navigate(['/dashboard']);
      }).catch((error)=>{
        this.toastr.error(this.firebaseError.codeError(error.code),'Error');
      })
  }
}