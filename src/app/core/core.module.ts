import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { NavComponent } from '../shared/components/nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbModule } from 'xng-breadcrumb';



@NgModule({
  declarations: [
    SectionHeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  exports: [
    SectionHeaderComponent,
    NavComponent
  ]
})
export class CoreModule { }
