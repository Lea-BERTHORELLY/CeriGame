import { Injectable ,EventEmitter, OnInit} from '@angular/core';
import {BandeauComponent} from '../bandeau/bandeau.component';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandeauService {
  bandeauInfo!: string;
  classMessage!: string;

}