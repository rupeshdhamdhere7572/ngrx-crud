import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { EmployeeEffects } from './employee/store/effects/employee.effects';
import { employeeReducer } from './employee/store/reducers/employee.reducers';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
     provideStore({ employeeState: employeeReducer }),
     provideEffects([EmployeeEffects]),
     importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false,
        // environment.production
      })
    ),
    provideRouter(routes)]
};
