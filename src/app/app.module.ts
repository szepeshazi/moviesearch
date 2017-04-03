import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		HttpModule,
		MdToolbarModule,
		BrowserAnimationsModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
