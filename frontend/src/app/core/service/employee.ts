import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface EmployeeResponseDTO {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiBaseURL}/employees`;

  constructor(private http: HttpClient) { }

  getEmployeeById(id: number): Observable<EmployeeResponseDTO> {
    return this.http.get<EmployeeResponseDTO>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(id: number, employeeData: Partial<EmployeeResponseDTO>): Observable<EmployeeResponseDTO> {
    return this.http.put<EmployeeResponseDTO>(`${this.apiUrl}/${id}`, employeeData);
  }
}