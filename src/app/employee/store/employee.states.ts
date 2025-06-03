import { Employee } from './models/employee.model';

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export interface AppState {
  employeeState: EmployeeState;
}
