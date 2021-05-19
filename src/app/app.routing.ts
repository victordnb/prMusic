import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import Homee
import { HomeComponent } from './components/home.component';

//import user
import { UserEditComponent } from './components/user-edit.component';

//import Artist:
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';


const appRoutes: Routes = [
	//{ //esto es para redireccionar
	//	path:'',
	//	redirectTo: '/artists/1',
	//	pathMatch: 'full'
	//},
	{path: '', component: HomeComponent},
	{path: 'artistas/:page', component: ArtistListComponent},
	{path: 'crear-artista/', component: ArtistAddComponent},
	{path: 'editar-artista/:id', component: ArtistEditComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
