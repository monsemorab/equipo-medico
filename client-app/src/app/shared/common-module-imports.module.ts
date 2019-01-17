import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ClarityModule, ClrFormsNextModule} from '@clr/angular';

/**
 * This module is for importing all the modules that will be imported into several modules.
 */

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ClarityModule,
    ClrFormsNextModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ClarityModule,
    ClrFormsNextModule
  ],
  declarations: []
})
export class CommonModuleImportsModule {
}
