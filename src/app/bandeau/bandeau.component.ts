import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { BandeauService } from '../services/bandeau.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-bandeau',
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.css']
})
export class BandeauComponent implements OnInit {

    @Input() messageIn! : string;
    messageOut! : string;
    @Output('messageOutBandeau')
    sendMessageEmitter: EventEmitter<string> = new EventEmitter<string>();
    onMessageChange() {
      this.sendMessageEmitter.emit(this.messageOut);  
      }

    constructor() {} 
    ngOnInit() {}


 /* public edited = false;
	//messageLogin  : string = 'Bienvenue sur la page d accueil, veuillez vous identifier';
	@Input() message !: string ;
  @Input() classe = '';
  type !: BannerType;
  //typeMessage!: string
  private subscription: Subscription;


  constructor(private alertService: AlertService) { 
    this.subscription = alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
  ngOnInit() {   
    this.alertService.eventEmit.subscribe((value: any) =>{
      this.message = value.message;
      this.type = value.messageType;
    }); 
  }
  ngOnDestroy(): void {
    // unsubscribe on destroy to prevent memory leaks
    this.subscription.unsubscribe();
  }
  closeMessage() {
    this.alertService.clearAlertMessage();    
  } */

  /*ngOnInit(): void {
    this.bandeauService.eventEmit.subscribe((value: any) =>{
      this.message = value.message;
      this.typeMessage = value.messageType;
    });
  }*/

  

}
