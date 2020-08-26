import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { CurrencyMaskModule} from 'ng2-currency-mask';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
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

import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';
import { ProfileComponent } from './components/profile/profile.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { EmpresaNewComponent } from './components/empresa-new/empresa-new.component';
import { EmpresaDetailComponent } from './components/empresa-detail/empresa-detail.component';
import { MonedaNewComponent } from './components/moneda-new/moneda-new.component';
import { MonedaDetailComponent } from './components/moneda-detail/moneda-detail.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { RecargaNewComponent } from './components/recarga-new/recarga-new.component';
import { RecargaDetailComponent } from './components/recarga-detail/recarga-detail.component';
import { CajaComponent } from './components/caja/caja.component';
import { GiroComponent } from './components/giro/giro.component';
import { GiroNewComponent } from './components/giro-new/giro-new.component';
import { GiroDetailComponent } from './components/giro-detail/giro-detail.component';
import { CajaDetailComponent } from './components/caja-detail/caja-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
      ErrorComponent,
      UserEditComponent,
      CategoryNewComponent,
      PostNewComponent,
      PostDetailComponent,
      PostEditComponent,
      CategoryDetailComponent,
      ProfileComponent,
      PostListComponent,
      EmpresaNewComponent,
      EmpresaDetailComponent,
      MonedaNewComponent,
      MonedaDetailComponent,
      CotizacionComponent,
      RecargaNewComponent,
      RecargaDetailComponent,
      CajaComponent,
      GiroComponent,
      GiroNewComponent,
      GiroDetailComponent,
      CajaDetailComponent
  ],
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpClientModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        AngularFileUploaderModule,
        NgxPaginationModule,
        CurrencyMaskModule,
        Ng2SearchPipeModule
    ],
  providers: [
      appRoutingProviders,
      IdentityGuard,
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
