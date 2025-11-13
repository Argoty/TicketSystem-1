import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // ← IMPORTA

// Servicios
import { AuthService } from './service/auth';
import { EmployeeService } from './service/employee';
import { StorageService } from './service/storage.service';

// Interceptor
import { AuthInterceptor } from './interceptor/interceptor'; // ← IMPORTA

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    EmployeeService,
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya fue importado. Solo debe importarse en AppModule.');
    }
  }
}