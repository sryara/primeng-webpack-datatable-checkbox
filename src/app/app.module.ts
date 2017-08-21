import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/toPromise';

import {AppComponent, MyCheckbox} from './app.component';
import { CarService } from './cars/carservice';
import {
  InputTextModule, DataTableModule, ButtonModule, DialogModule, CheckboxModule,
  ListboxModule
} from 'primeng/primeng';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    InputTextModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
      ListboxModule
  ],
  declarations: [
    AppComponent, MyCheckbox
  ],
  bootstrap: [ AppComponent],
  providers: [ CarService ]
})
export class AppModule { }
