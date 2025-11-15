import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface CategoryResponseDTO {
    id: number;
    name: string;
    description: string;
}

export interface CategoryCreateDTO {
    name: string;
    description: string;
}

export interface CategoryUpdateDTO {
    name: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = `${environment.apiBaseURL}/categories`
    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('authToken');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }
    getAllCategories(): Observable<CategoryResponseDTO[]> {
        return this.http.get<CategoryResponseDTO[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    createCategory(payload: CategoryCreateDTO): Observable<CategoryResponseDTO> {
        return this.http.post<CategoryResponseDTO>(this.apiUrl, payload, { headers: this.getHeaders() });
    }

    updateCategory(id: number, payload: CategoryUpdateDTO): Observable<CategoryResponseDTO> {
        return this.http.put<CategoryResponseDTO>(`${this.apiUrl}/${id}`, payload, { headers: this.getHeaders() });
    }

    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }
}