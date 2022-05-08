import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildComponent } from './contador/child/child.component';
import { GrandchildComponent } from './contador/grandchild/grandchild.component';

// NgRx
import { StoreModule } from '@ngrx/store';
import { countReducer } from './contador/count.reduces';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    GrandchildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      count: countReducer
    }),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25, // Cuantos estados quiero mantener en las devtools, solo hasta 25 estados, para fines de logs
      logOnly: environment.production // si esta este flag solo las devtools trabajaran en modo lectura solo logs
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
