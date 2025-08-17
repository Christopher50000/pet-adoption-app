import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();

  show(): void {
    this._loading.next(true);
    console.log("Show Loading");
    console.log(this._loading);
  }

  hide(): void {
    this._loading.next(false);
    console.log("Hide Loading");
    console.log(this._loading);
  }
}
