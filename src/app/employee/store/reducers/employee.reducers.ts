import { createReducer, on } from '@ngrx/store';
import { EmployeeState } from '../employee.states';
import * as EmployeeActions from '../actions/employee.actions';

export const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeeReducer = createReducer(
  initialState,
  // Load
  on(EmployeeActions.loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    loading: false,
    employees,
  })),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Add
  on(EmployeeActions.addEmployee, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    loading: false,
    employees: [...state.employees, employee],
  })),
  on(EmployeeActions.addEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Update
  on(EmployeeActions.updateEmployee, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    loading: false,
    employees: state.employees.map((e) =>
      e.id === employee.id ? employee : e
    ),
  })),
  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Delete
  on(EmployeeActions.deleteEmployee, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    employees: state.employees.filter((e) => e.id !== id),
  })),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
