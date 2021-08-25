import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './services/storage.service';
import { AuthGuard } from './guards/auth-guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  MaterialModuleNew } from './material.module';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgbModule,CommonModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    RouterModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  FileOpener,
  File,
  FileChooser,
  FilePath,
  FileTransfer,
  httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  exports:[MaterialModuleNew]
})
export class AppModule {}
