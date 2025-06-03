import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../store/models/employee.model';
import { AppState, EmployeeState } from '../store/employee.states';
import { loadEmployees } from '../store/actions/employee.actions';
import * as fromEmployee from '../../../app/employee/store/selectors/employee.selectors';
import { EmployeeActions } from '../../employee/store/actions/employee.actions';

@Component({
  selector: 'app-employee-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-crud.component.html',
  styleUrl: './employee-crud.component.css',
})
export class EmployeeCrudComponent implements OnInit {
  form!: FormGroup;
  employees$!: Observable<Employee[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isEdit = false;
  currentId: number | null = null;

  private fb = inject(FormBuilder);
  private store = inject(Store<AppState>);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
    });

    this.store.dispatch(loadEmployees());
    this.employees$ = this.store.select(fromEmployee.selectAllEmployees);
    this.loading$ = this.store.select(fromEmployee.selectEmployeesLoading);
    this.error$ = this.store.select(fromEmployee.selectEmployeesError);
  }

  submit() {
    if (this.form.invalid) return;
    const formData = this.form.value;

    if (this.isEdit && this.currentId !== null) {
      const emp: Employee = { ...formData, id: this.currentId };
      this.store.dispatch(EmployeeActions.updateEmployee({ employee: emp }));
    } else {
      const emp: Employee = { ...formData };
      this.store.dispatch(EmployeeActions.addEmployee({ employee: emp }));
    }

    this.reset();
  }

  edit(emp: Employee) {
    this.isEdit = true;
    this.currentId = emp.id!;
    this.form.patchValue(emp);
  }

  delete(id: number) {
    this.store.dispatch(EmployeeActions.deleteEmployee({ id }));
  }

  reset() {
    this.isEdit = false;
    this.currentId = null;
    this.form.reset();
  }
}
