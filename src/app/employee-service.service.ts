import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8855/Raj/employees';  // Adjust this API URL as needed

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);  // Correct endpoint for adding an employee
  }

  updateEmployee(employeeId: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${employeeId}`, employee);  // Correct endpoint for updating an employee
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${employeeId}`);  // Correct endpoint for deleting an employee
  }
}
