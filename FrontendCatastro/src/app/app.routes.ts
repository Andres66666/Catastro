import { LoginComponent } from './components/Login/login/login.component';
import { Routes } from '@angular/router';
import { IndexComponent } from './components/Index/index/index.component';
import { PanelDeControlComponent } from './components/panel-de-control/panel-de-control.component';
import { RegistrarCatastroComponent } from './components/Catastro/registrar-catastro/registrar-catastro.component';
import { ListarCatastroComponent } from './components/Catastro/listar-catastro/listar-catastro.component';
import { VerCatastroComponent } from './components/Catastro/ver-catastro/ver-catastro.component';
import { ActualizarCatastroComponent } from './components/Catastro/actualizar-catastro/actualizar-catastro.component';
export const routes: Routes = [
  { path: '', component: RegistrarCatastroComponent },
  /* { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'panelControl',
    component: PanelDeControlComponent,
    children: [
      { path: 'registrar-catastro', component: RegistrarCatastroComponent },
      { path: 'listar-catastro', component: ListarCatastroComponent },
      { path: 'ver-catastro/:id', component: VerCatastroComponent },
      { path: 'editar-catastro/:id', component: ActualizarCatastroComponent },
      { path: '', redirectTo: 'listar-catastro', pathMatch: 'full' }, // Redirige a listar-catastro por defecto
    ],
  },
  { path: '**', redirectTo: '/panelControl' }, */ // Redirige cualquier ruta no encontrada al panel de control
];
