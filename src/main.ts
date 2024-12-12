import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

(async () => {
  try {
    await bootstrapApplication(AppComponent, appConfig);
    console.log('Application bootstrapped successfully!');
  } catch (err) {
    console.error('Error bootstrapping the application:', err);
  }
})();
