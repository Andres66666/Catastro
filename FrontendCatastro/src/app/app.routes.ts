import { LoginComponent } from './components/Login/login/login.component';
import { Routes } from '@angular/router';
import { IndexComponent } from './components/Index/index/index.component';
import { PanelDeControlComponent } from './components/panel-de-control/panel-de-control.component';

import { authGuard } from './guards/auth.guard';
import { RegistrarCatastroComponent } from './components/GestionDeCatastro/registrar-catastro/registrar-catastro.component';
import { ListarCatastroComponent } from './components/GestionDeCatastro/listar-catastro/listar-catastro.component';
import { RJ1Component } from './components/GestionDeCatastro/r-j-1/r-j-1.component';
export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'panelControl',
    component: PanelDeControlComponent,
    canActivate: [authGuard],
    children: [
      { path: 'registrar-catastro', component: RegistrarCatastroComponent },
      { path: 'listar-catastro', component: ListarCatastroComponent },
      { path: 'RJ1', component: RJ1Component },

      { path: '', redirectTo: 'listar-catastro', pathMatch: 'full' }, // Redirige a listar-catastro por defecto
    ],
  },
];
