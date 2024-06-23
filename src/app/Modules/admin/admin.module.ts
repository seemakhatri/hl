import { NgModule } from '@angular/core';
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
    DelistingDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
