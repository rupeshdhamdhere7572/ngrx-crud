import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EmployeeService } from '../../../services/employee.service';
import * as EmployeeActions from '../actions/employee.actions';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions, private empService: EmployeeService) {}

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      mergeMap(() =>
        this.empService.getAll().pipe(
          map((employees: Employee[]) =>
            EmployeeActions.loadEmployeesSuccess({ employees })
          ),
          catchError((error) =>
            of(EmployeeActions.loadEmployeesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      mergeMap((action) =>
        this.empService.create(action.employee).pipe(
          map((employee: Employee) =>
            EmployeeActions.addEmployeeSuccess({ employee })
          ),
          catchError((error) =>
            of(EmployeeActions.addEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      mergeMap((action) =>
        this.empService.update(action.employee).pipe(
          map((employee: Employee) =>
            EmployeeActions.updateEmployeeSuccess({ employee })
          ),
          catchError((error) =>
            of(EmployeeActions.updateEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      mergeMap((action) =>
        this.empService.delete(action.id).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess({ id: action.id })),
          catchError((error) =>
            of(EmployeeActions.deleteEmployeeFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
