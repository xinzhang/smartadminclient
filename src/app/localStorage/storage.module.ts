// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// //import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
// import { LocalStorageService} from 'angular-2-local-storage';

// // Create config options (see ILocalStorageServiceConfigOptions) for deets:
// let localStorageServiceConfig = {
//     prefix: 'amq-ops',
//     storageType: 'localStorage'
// };
 
// @NgModule({
//   imports: [
//     CommonModule,
//   ],
//   declarations: [
//   ],
//   providers: [
//     LocalStorageService,
//         {            
//           provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
//           useValue: localStorageServiceConfig
//         }    
//   ]
// })
// export class StorageModule { }

import { NgModule } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
    imports: [
        LocalStorageModule.withConfig({
            prefix: 'amq-ops',
            storageType: 'localStorage'
        })
    ]
})
export class StorageModule {}