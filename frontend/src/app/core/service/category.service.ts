import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment";
import { StorageService } from "./storage.service";

export interface CategoryResponseDTO {
    id: number;
    name: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = `${environment.apiBaseURL}/categories`
    private storageService = inject(StorageService)
    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = this.storageService.getItem('authToken');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }
    getAllCategories(): Observable<CategoryResponseDTO[]> {
        return this.http.get<CategoryResponseDTO[]>(this.apiUrl, { headers: this.getHeaders() });
    }
}