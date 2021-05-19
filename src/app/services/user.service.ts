import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public identity;
	public token;
	public url: string; //aqui vamos a guardar la url de la api rest

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	signup(user_to_login, gethash = null){ //este metodo, nada mas cargar un compoenente ejecuta un codigo que nosotros queremos
  	// var texto = this._userService.singup();
  	// console.log(texto);
  	if(gethash != null){
  		user_to_login.gethash = gethash;
  	}

  	let json = JSON.stringify(user_to_login); //creamos una variable json y vamos a convertir a string la variable que vamos a recibir
  	let params = json; //aqui le pasamos el valor de json

  	let headers = new Headers({'Content-Type':'application/json'});

  	return this._http.post(this.url+'login', params, {headers: headers})
  	.map(res => res.json());

		//ahora vamos a cargar este servicio dentro de un componente
	}

	register(user_to_register){
	let params = JSON.stringify(user_to_register); //creamos una variable json y vamos a convertir a string la variable que vamos a recibir
  	let headers = new Headers({'Content-Type':'application/json'});



  	return this._http.post(this.url+'register', params, {headers: headers})
  							.map(res => res.json());
	}

	updateUser(user_to_update){
	let params = JSON.stringify(user_to_update); //creamos una variable json y vamos a convertir a string la variable que vamos a recibir
  	let headers = new Headers({
  			'Content-Type':'application/json', 
  			'Authorization': this.getToken()
  		});



  	return this._http.put(this.url+'update-user/'+user_to_update._id,
  		 params, {headers: headers})
  							.map(res => res.json());
	}


	//estos metodos que vamos a crear: acceder a localstorage, conseguir el elemento que queremos y devolvernoslo procesado 
	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
	}
	getToken(){
		let token = localStorage.getItem('token');
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}
}


