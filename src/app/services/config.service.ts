import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  /**
   * URL
   */
  static apiUrlLocal = 'http://localhost:3116';
  static apiUrlRemote = 'http://pedago.univ-avignon.fr:3115';
  static apiUrl = ConfigService.apiUrlRemote;

  /**
   * Local Storage
   */
  static lastConnection = 'last_connection';
  static currentUser = 'currentUser';
  static currentUserId = 'currentUserId';
  static currentUsername = 'currentUsername';
}