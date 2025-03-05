import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'employeeservice';
  employees: any[] = [];
  employeeToUpdate: any = null;

  // ✅ Define the 'employee' object to fix the error
  employee = {
    firstname: '',
    lastname: '',
    email: '',
    department: ''
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  register(form: any) {
    if (form.valid) {
      let newEmployee = { ...this.employee }; // Get values from 'employee' object
    
      console.log("Submitting Employee:", newEmployee); // Debugging line
  
      // Make sure the service is adding the employee correctly
      this.employeeService.addEmployee(newEmployee).subscribe(
        (addedEmployee) => {
          console.log("Employee Added:", addedEmployee); // Check if API returns data
    
          // Add the new employee to the list
          this.employees.push(addedEmployee);
  
          // Reset the form, but keep the employee object clean
          form.reset();
          this.employee = { firstname: '', lastname: '', email: '', department: '' }; // Clear the model state after submission
        },
        (error) => {
          console.error('Error adding employee:', error); // Log any errors
        }
      );
    } else {
      console.warn("Form is invalid, submission blocked."); // Check if form is invalid
    }
  }
  
  

  edit(employee: any) {
    this.employeeToUpdate = { ...employee };
  }

  updateEmployee() {
    if (this.employeeToUpdate && this.employeeToUpdate.id) {
      this.employeeService.updateEmployee(this.employeeToUpdate.id, this.employeeToUpdate).subscribe(
        (updatedEmployee) => {
          const index = this.employees.findIndex((e) => e.id === this.employeeToUpdate.id);
          if (index > -1) {
            this.employees[index] = { ...updatedEmployee };
          }
          this.closeModal();
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }

  deleteEmployee(employee: any) {
    this.employeeService.deleteEmployee(employee.id).subscribe(
      () => {
        this.employees = this.employees.filter((e) => e.id !== employee.id);
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  closeModal() {
    this.employeeToUpdate = null;
  }
}
