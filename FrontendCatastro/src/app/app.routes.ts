import { LoginComponent } from './components/Login/login/login.component';
import { Routes } from '@angular/router';
import { IndexComponent } from './components/Index/index/index.component';
import { PanelDeControlComponent } from './components/panel-de-control/panel-de-control.component';

import { authGuard } from './guards/auth.guard';
import { RegistrarCatastroComponent } from './components/GestionDeCatastro/registrar-catastro/registrar-catastro.component';
import { ListarCatastroComponent } from './components/GestionDeCatastro/listar-catastro/listar-catastro.component';
import { VerCatastroComponent } from './components/GestionDeCatastro/ver-catastro/ver-catastro.component';
import { ActualizarCatastroComponent } from './components/GestionDeCatastro/actualizar-catastro/actualizar-catastro.component';
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
      { path: 'ver-catastro/:id', component: VerCatastroComponent },
      { path: 'editar-catastro/:id', component: ActualizarCatastroComponent },
      { path: '', redirectTo: 'listar-catastro', pathMatch: 'full' }, // Redirige a listar-catastro por defecto
    ],
  },
];
