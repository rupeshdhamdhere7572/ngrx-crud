import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeeReducer } from './app/employee/store/reducers/employee.reducers';
import { EmployeeEffects } from './app/employee/store/effects/employee.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideStore({ employees: employeeReducer  }),
    provideEffects([EmployeeEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
}).catch((err: any) => console.error(err));
