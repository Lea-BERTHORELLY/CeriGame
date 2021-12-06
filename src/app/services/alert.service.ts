import { EventEmitter, Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public eventEmit: any;


  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {

    this.eventEmit = new EventEmitter();

    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  warning(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'warning', text: message });
  }

  info(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'info', text: message });
  }

  clearAlertMessage() {
    this.subject.next();
  }
  getMessage(): Observable<any> {   
    return this.subject.asObservable();
  }








  /*constructor() { }

  // Alert mode
  private mode ! : string ;
  private modeSub = new Subject<string>();

  // Alert message
  private msg ! : string ;
  private msgSub = new Subject<string>();

  // Hidden status
  private hidden = true;
  private hiddenSub = new Subject<boolean>();

  displayAlert(msg: string, mode: string): void {

    // Update the observables
    this.mode = mode;
    this.modeSub.next(this.mode);

    this.msg = msg;
    this.msgSub.next(this.msg);

    this.hidden = false;
    this.hiddenSub.next(this.hidden);
  }

  hideAlert(): void {

    // Update the observables
    this.mode = '';
    this.modeSub.next(this.mode);

    this.msg = '';
    this.msgSub.next(this.msg);

    this.hidden = true;
    this.hiddenSub.next(this.hidden);
  }

  // Getter for the mode
  getMode(): any {
    return this.modeSub.asObservable();
  }

  // Getter for the message
  getMsg(): any {
    return this.msgSub.asObservable();
  }

  // Getter for the status
  isHidden(): any {
    return this.hiddenSub.asObservable();
  }*/
}