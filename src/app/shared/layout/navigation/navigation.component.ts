import {Component, OnInit} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';

@Component({

  selector: 'sa-navigation',
  templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {

  constructor(private localStorageService : LocalStorageService) {
  }

  ngOnInit() {
  }

  draftCount() {
      if (this.localStorageService.get("offline-corporateAction") != null) {
        let a:any = JSON.parse(this.localStorageService.get("offline-corporateAction").toString());
        return a.length;
      }     
      return 0
  }

}
