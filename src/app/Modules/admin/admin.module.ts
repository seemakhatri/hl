import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DividendComponent } from './components/dividend/dividend.component';
import { StockSplitComponent } from './components/stock-split/stock-split.component';
import { ConsolidationComponent } from './components/consolidation/consolidation.component';
import { DelistingComponent } from './components/delisting/delisting.component';
import { DividendDetailComponent } from './components/dividend-detail/dividend-detail.component';
import { StockSplitDetailComponent } from './components/stock-split-detail/stock-split-detail.component';
import { ConsolidationDetailComponent } from './components/consolidation-detail/consolidation-detail.component';
import { DelistingDetailComponent } from './components/delisting-detail/delisting-detail.component';
import { StockFileComponent } from './components/stock-file/stock-file.component';
import { FundFileComponent } from './components/fund-file/fund-file.component';
import { ToastrModule } from 'ngx-toastr';
import { ViewFeedbacksComponent } from './components/view-feedbacks/view-feedbacks.component';
import { IpoSectionComponent } from './components/ipo-section/ipo-section.component';
import { IpoDetailComponent } from './components/ipo-detail/ipo-detail.component';
import { MarketCalendarComponent } from './components/market-calendar/market-calendar.component';


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
    MarketCalendarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
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
