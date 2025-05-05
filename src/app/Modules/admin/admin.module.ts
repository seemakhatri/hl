import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/layout/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DividendComponent } from './components/divident/dividend/dividend.component';
import { StockSplitComponent } from './components/Stock-split-main/stock-split/stock-split.component';
import { ConsolidationComponent } from './components/consolidation/consolidation.component';
import { DelistingComponent } from './components/Delisting-main/delisting/delisting.component';
import { DividendDetailComponent } from './components/divident/dividend-detail/dividend-detail.component';
import { StockSplitDetailComponent } from './components/Stock-split-main/stock-split-detail/stock-split-detail.component';
import { ConsolidationDetailComponent } from './components/consolidation/consolidation-detail/consolidation-detail.component';
import { DelistingDetailComponent } from './components/Delisting-main/delisting-detail/delisting-detail.component';
import { StockFileComponent } from './components/stock-file/stock-file.component';
import { FundFileComponent } from './components/fund-file/fund-file.component';
import { ToastrModule } from 'ngx-toastr';
import { ViewFeedbacksComponent } from './components/view-feedbacks/view-feedbacks.component';
import { IpoSectionComponent } from './components/ipo-section/ipo-section.component';
import { IpoDetailComponent } from './components/ipo-detail/ipo-detail.component';
import { MarketCalendarComponent } from './components/market-calendar/market-calendar.component';
import { AddDividentComponent } from './components/divident/add-divident/add-divident.component';
import { AddStockSplitComponent } from './components/Stock-split-main/add-stock-split/add-stock-split.component';
import { AddConsolidationComponent } from './components/consolidation/add-consolidation/add-consolidation.component';
import { AddDelistingComponent } from './components/Delisting-main/add-delisting/add-delisting.component';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddCategoryComponent } from './components/layout/add-category/add-category.component';
import { PendingStockFileComponent } from './components/stock-file/pending-stock-file/pending-stock-file.component';
import { RejectionReasonDialogComponent } from './components/stock-file/rejection-reason-dialog/rejection-reason-dialog.component';
import { PendingFundFileComponent } from './components/fund-file/pending-fund-file/pending-fund-file.component';
import { FundRejectionDialogComponent } from './components/fund-file/fund-rejection-dialog/fund-rejection-dialog.component';




@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    DividendComponent,
    StockSplitComponent,
    ConsolidationComponent,
    DelistingComponent,
    DividendDetailComponent,
    StockSplitDetailComponent,
    ConsolidationDetailComponent,
    DelistingDetailComponent,
    StockFileComponent,
    FundFileComponent,
    ViewFeedbacksComponent,
    IpoSectionComponent,
    IpoDetailComponent,
    MarketCalendarComponent,
    AddDividentComponent,
    AddStockSplitComponent,
    AddConsolidationComponent,
    AddDelistingComponent,
    AddCategoryComponent,
    PendingStockFileComponent,
    RejectionReasonDialogComponent,
    PendingFundFileComponent,
    FundRejectionDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatDialogModule,
    MatSlideToggleModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
    })    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class AdminModule { }
