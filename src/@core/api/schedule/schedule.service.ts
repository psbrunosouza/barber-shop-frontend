import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/@core/data/Schedule';
import { TokenHelper } from 'src/@core/helpers/token.helper';
import { environment } from 'src/environments/environment';

@Injectable()
export class ScheduleService {
  readonly url = `${environment.baseUrl}/v1/barbershop/schedules`;

  constructor(private http: HttpClient, private tokenHelper: TokenHelper) {}

  private httpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.tokenHelper.getToken(),
  });

  list(): Observable<Schedule> {
    return this.http.get<Schedule>(this.url, {
      headers: this.httpHeaders,
    });
  }

  create(Schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.url, Schedule, {
      headers: this.httpHeaders,
    });
  }

  update(id: number, Schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.url}/${id}`, Schedule, {
      headers: this.httpHeaders,
    });
  }
}
