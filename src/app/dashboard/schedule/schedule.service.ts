import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  refreshScheduleList$: Subject<void> = new Subject<void>();

  constructor() {
  }

  handleRefreshScheduleList(): void {
    this.refreshScheduleList$.next();
  }
}
