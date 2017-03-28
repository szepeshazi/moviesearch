import { MovieModule } from './movie/movie.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {
	    MdToolbarModule
} from '@angular/material';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		MovieModule,
		MdToolbarModule

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
