import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PackageListService {

  refreshPackageList$: Subject<void> = new Subject<void>();

  constructor() {
  }

  handleRefreshPackageList(): void {
    this.refreshPackageList$.next();
  }
}
