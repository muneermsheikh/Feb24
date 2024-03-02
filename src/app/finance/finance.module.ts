import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentModalComponent } from './add-payment-modal/add-payment-modal.component';
import { CoaEditComponent } from './coa-edit/coa-edit.component';
import { CoaItemComponent } from './coa-item/coa-item.component';
import { CoaListComponent } from './coa-list/coa-list.component';
import { CoaEditModalComponent } from './coa-edit-modal/coa-edit-modal.component';
import { FVouchersComponent } from './f-vouchers/f-vouchers.component';
import { FinanceIndexComponent } from './finance-index/finance-index.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { SoaLineComponent } from './soa-line/soa-line.component';
import { SoaComponent } from './soa/soa.component';
import { VoucherEditComponent } from './voucher-edit/voucher-edit.component';
import { VoucherItemComponent } from './voucher-item/voucher-item.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { SharedModule } from '../shared/shared.module';
import { FinanceRoutingModule } from './finance-routing.module';
import { ConfirmFundReceiptsComponent } from './confirm-fund-receipts/confirm-fund-receipts.component';



@NgModule({
  declarations: [
    AddPaymentModalComponent,
    CoaEditComponent,
    CoaItemComponent,
    CoaListComponent,
    CoaEditModalComponent,
    FVouchersComponent,
    FinanceIndexComponent,
    PaymentConfirmationComponent,
    SoaLineComponent,
    SoaComponent,
    VoucherEditComponent,
    VoucherItemComponent,
    VoucherListComponent,
    ConfirmFundReceiptsComponent
  ],
  imports: [
    SharedModule,
    FinanceRoutingModule,
    CommonModule
    
  ]
})
export class FinanceModule { }
