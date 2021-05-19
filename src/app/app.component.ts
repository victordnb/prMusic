import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]//aqui se cargan todos los servicios que queramos
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = 'MUSIFY';
  public user: User;
  public user_register: User;
  public identity; //sirve para comprobar los datos del usuario identificado. debe de estar en true para estar logueado
  public token;
  public errorMessage;
  public alertRegister;
  public url: string;

  constructor(
  		private _route: ActivatedRoute,
		  private _router: Router,
  		private _userService:UserService
  	){
  		this.user = new User('','','','','','ROLE_USER','');
  		this.user_register = new User('','','','','','ROLE_USER','');
  		this.url = GLOBAL.url;
  	}
  ngOnInit(){ //este metodo, nada mas cargar un compoenente ejecuta un codigo que nosotros queremos
  	// var texto = this._userService.signup();
  	// console.log(texto);
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();

  	console.log(this.identity);
  	console.log(this.token);

  }


	public onSubmit(){
		console.log(this.user);

		//aqui conseguimos los datos del usuario identificado
		this._userService.signup(this.user).subscribe(
			response => {
				//console.log(response);
				let identity = response.user;
				this.identity = identity;

				if(!this.identity._id){
					alert("El usuario no se ha identificado");
				}else{
					//vamos a crear una sesion en el local storage (un elemento para tener al usuario en sesion)
					localStorage.setItem('identity', JSON.stringify(identity));

					//vamos a conseguir el token para enviarselo a cada peticion http
					this._userService.signup(this.user, 'true').subscribe(
						response => {
							//console.log(response);
							let token = response.token;
							this.token = token;

							if(this.token.length <= 0){
								alert("El token no se ha generado");
							}else{
								//vamos a crear una sesion en el local storage (un elemento para tener al usuario en sesion)
								localStorage.setItem('token', token);

								//console.log(token);
								//console.log(identity);
								this.user = new User('','','','','','ROLE_USER','');
							}
						},
						error => {
							var errorMessage = <any>error;

							if(errorMessage != null){
								var body = JSON.parse(error._body);
								this.errorMessage = body.message;

								console.log(error);
							}
						}
					);
				}
			},
			error => {
				var errorMessage = <any>error;

				if(errorMessage != null){
					var body = JSON.parse(error._body);
					this.errorMessage = body.message;

					console.log(error);
				}
			}
		);
	}

	

	onSubmitRegister(){
		console.log(this.user_register);

		this._userService.register(this.user_register).subscribe(
			response => {
				let user = response.user;
				this.user_register = user;

				if(!user._id){
					this.alertRegister = 'Error al registrarse';
				}else{
					this.alertRegister = 'El registro se ha realizado correctamente, identificate con '+this.user_register.email;
					this.user_register = new User('','','','','','ROLE_USER','');
				}
			},
			error => {
				var errorMessage = <any>error;

				if(errorMessage != null){
					var body = JSON.parse(error._body);
					this.alertRegister = body.message;

					console.log(error);
				}
			}
			);
	}



	logout(){
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.clear();
		this.identity = null;
		this.token = null;
		this._router.navigate(['/']);
	}

}
