import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddDatasheetRoutingModule } from './add-datasheet-routing.module';
import { AddDatasheetComponent } from './add-datasheet.component';

import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [AddDatasheetComponent],
  imports: [
    CommonModule,
    AddDatasheetRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddDatasheetModule { }
