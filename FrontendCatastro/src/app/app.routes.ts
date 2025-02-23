import { LoginComponent } from './components/Login/login/login.component';
import { Routes } from '@angular/router';
import { IndexComponent } from './components/Index/index/index.component';
import { RegistrarUsuarioComponent } from './components/Usuario/registrar-usuario/registrar-usuario.component';
import { EditarUsuarioComponent } from './components/Usuario/editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './components/Usuario/listar-usuario/listar-usuario.component';
import { PanelDeControlComponent } from './components/panel-de-control/panel-de-control.component';
export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'panelControl', component: PanelDeControlComponent },

  /* autentication */
  {
    path: 'registrar-usuarios',
    component: RegistrarUsuarioComponent,
  },
  {
    path: 'editar-usuarios/:id',
    component: EditarUsuarioComponent,
  },
  {
    path: 'listar-usuarios',
    component: ListarUsuarioComponent,
  },
];
