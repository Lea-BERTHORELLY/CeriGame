import {Injectable, EventEmitter, OnInit} from "@angular/core";
@Injectable()
export class MessageService implements OnInit {
    public eventEmit: any;
 
    constructor() {
        // definit emitteur
        this.eventEmit = new EventEmitter();
    }
 
    ngOnInit() {
 
    }
}