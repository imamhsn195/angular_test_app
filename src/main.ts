import {provideRouter} from '@angular/router';
import routeConfig from './app/app.routes';
import { AppComponent } from './app/app.component';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));