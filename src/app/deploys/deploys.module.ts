import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeployModalComponent } from './deploy-modal/deploy-modal.component';
import { CoreModule } from '../core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DeployAddModalComponent } from './deploy-add-modal/deploy-add-modal.component';
import { DeployEditComponent } from './deploy-edit/deploy-edit.component';
import { SharedModule } from "../shared/shared.module";
import { DepStatusPipe } from './dep-status.pipe';
import { DeployIndexComponent } from './deploy-index/deploy-index.component';
import { DeployItemComponent } from './deploy-item/deploy-item.component';
import { DeployListComponent } from './deploy-list/deploy-list.component';



@NgModule({
    declarations: [
        DeployModalComponent,
        DeployAddModalComponent,
        DeployEditComponent,
        DepStatusPipe,
        DeployIndexComponent,
        DeployItemComponent,
        DeployListComponent
    ],
    imports: [
        //CommonModule,
        NgSelectModule,
        //FormsModule,
        //ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        SharedModule
    ]
})
export class DeploysModule { }
