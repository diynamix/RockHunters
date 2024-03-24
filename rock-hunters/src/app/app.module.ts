import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RockModule } from './rock/rock.module';
import { ErrorComponent } from './error/error.component';
import { AppInterceptorProvider } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    RockModule,
    // AppRoutingModule stay at bottom
    AppRoutingModule,
  ],
  providers: [AppInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
