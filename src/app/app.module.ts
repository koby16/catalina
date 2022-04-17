import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule  } from '@angular/fire';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,

    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
