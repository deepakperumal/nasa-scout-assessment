import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoutResponse } from '../models/scout.model';

@Injectable({ providedIn: 'root' })
export class ScoutService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://ssd-api.jpl.nasa.gov/scout.api';

  getCandidates(): Observable<ScoutResponse> {
    return this.http.get<ScoutResponse>(this.apiUrl);
  }
}
