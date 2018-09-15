import { WorkerAppModule, WORKER_APP_LOCATION_PROVIDERS } from '@angular/platform-webworker';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    WorkerAppModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    WORKER_APP_LOCATION_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
