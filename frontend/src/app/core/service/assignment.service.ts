import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { inject, Injectable } from "@angular/core";
import { TicketResponseDTO } from "./ticket.service";
import { EmployeeResponseDTO } from "../../core/service/employee";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { formatDate } from "../../../utils/date.utils";
import { StorageService } from "./storage.service";

export interface AssignmentRespondeDTO {
    id: number;
    ticket: TicketResponseDTO;
    employee: EmployeeResponseDTO;
    assignmentDate: string;
}


@Injectable({
    providedIn: 'root'
})
export class AssignmentService {
    private apiUrl = `${environment.apiBaseURL}/assignments`;
    private storageService = inject(StorageService)
    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = this.storageService.getItem('authToken');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    } 
    getAssignmentByTicketId(ticketId: number): Observable<AssignmentRespondeDTO | null> {
        return this.http.get<AssignmentRespondeDTO>(`${this.apiUrl}/ticket/${ticketId}`, { headers: this.getHeaders() }).pipe(
            // Si el assignment no existe, devolvemos null en lugar de un error
            catchError(err => err.status === 404 ? of(null) : throwError(() => err))
        );
    }

    createAssignmentByTicketId(ticketId: number, employeeId: number): Observable<AssignmentRespondeDTO> {
        return this.http.post<AssignmentRespondeDTO>(this.apiUrl, { ticketId, employeeId }, { headers: this.getHeaders() });
    }

    reassignEmployee(ticketId: number, newEmployeeId: number): Observable<AssignmentRespondeDTO> {
        const params = new HttpParams().set('employeeId', newEmployeeId);
        return this.http.put<AssignmentRespondeDTO>(`${this.apiUrl}/reassign/${ticketId}`, null, { headers: this.getHeaders(), params });
    }
}