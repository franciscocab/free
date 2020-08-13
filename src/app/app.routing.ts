// Imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmpresaNewComponent } from './components/empresa-new/empresa-new.component';

//Agrega una proteccion a las rutas
import { IdentityGuard } from './services/identity.guard';
import {EmpresaDetailComponent} from './components/empresa-detail/empresa-detail.component';
import {MonedaNewComponent} from './components/moneda-new/moneda-new.component';
import {MonedaDetailComponent} from './components/moneda-detail/moneda-detail.component';

// Definir las rutas
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard] },
    { path: 'crear-categoria', component: CategoryNewComponent, canActivate: [IdentityGuard] },
    { path: 'crear-entrada', component: PostNewComponent, canActivate: [IdentityGuard] },
    { path: 'entrada/:id', component: PostDetailComponent },
    { path: 'editar-entrada/:id', component: PostEditComponent, canActivate: [IdentityGuard] },
    { path: 'categoria/:id', component: CategoryDetailComponent },
    { path: 'perfil/:id', component: ProfileComponent },

    { path: 'crear-empresa', component: EmpresaNewComponent, canActivate: [IdentityGuard] },
    { path: 'empresa/:id', component: EmpresaDetailComponent, canActivate: [IdentityGuard] },
    { path: 'crear-moneda', component: MonedaNewComponent, canActivate: [IdentityGuard] },
    { path: 'moneda/:id', component: MonedaDetailComponent },
    { path: '**', component: ErrorComponent },


];

// Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders <any> = RouterModule.forRoot(appRoutes);
