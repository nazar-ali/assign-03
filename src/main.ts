import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

(
  bootstrapApplication(AppComponent, appConfig) as unknown as Promise<void>
).catch((err) => console.error(err));
