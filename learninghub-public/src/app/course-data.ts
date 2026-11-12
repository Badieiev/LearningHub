import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import type { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseData {
  private http = inject(HttpClient);

  private apiBaseUrl = 'http://localhost:3000/api';

  public async getCourses(): Promise<Course[]> {
    const url = `${this.apiBaseUrl}/courses`;

    return firstValueFrom(this.http.get<Course[]>(url));
  }
}
