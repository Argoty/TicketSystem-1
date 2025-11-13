import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryResponseDTO } from "./category.service";

export interface TicketResponseDTO {
    id: number;
    employeeId: number;
    category: CategoryResponseDTO;
    title: string;
    description: string;
    priority: string;
    state: string;
    creationDate: string;
    closingDate: string;
}

export interface TicketCreateDTO {
    employeeId: number;
    title: string;
    description: string;
    categoryId: number;
    priority: string;
}

export interface TicketRecordResponseDTO {
    id: number;
    previousState: string;
    nextState: string;
    changedDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private apiUrl = `${environment.apiBaseURL}/tickets`
    constructor(private http: HttpClient) { }

    getTicket(ticketId: number): Observable<TicketResponseDTO> {
        return this.http.get<TicketResponseDTO>(`${this.apiUrl}/${ticketId}`);
    }

    getAllTickets(): Observable<TicketResponseDTO[]> {
        return this.http.get<TicketResponseDTO[]>(this.apiUrl);
    }

    createTicket(ticketData: TicketCreateDTO): Observable<TicketResponseDTO> {

        return this.http.post<TicketResponseDTO>(this.apiUrl, ticketData);
    }

    updateTicketState(ticketId: number, newState: string): Observable<TicketResponseDTO> {
        return this.http.put<TicketResponseDTO>(`${this.apiUrl}/${ticketId}/state`, { state: newState });
    }
    deleteTicket(ticketId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${ticketId}`);
    }

    getTicketRecords(ticketId: number, from?: string, to?: string): Observable<TicketRecordResponseDTO[]> {
        let params = new HttpParams();
        if (from) {
            params = params.set('from', from);
        }
        if (to) {
            params = params.set('to', to);
        }
        return this.http.get<TicketRecordResponseDTO[]>(`${this.apiUrl}/${ticketId}/tickets-record`, {
            params
        });
    }
}