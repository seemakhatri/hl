import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/layout/home/home.component';
import { AboutComponent } from './components/about/about.component';
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
import { ViewFeedbacksComponent } from './components/view-feedbacks/view-feedbacks.component';
import { IpoSectionComponent } from './components/ipo-section/ipo-section.component';
import { IpoDetailComponent } from './components/ipo-detail/ipo-detail.component';
import { MarketCalendarComponent } from './components/market-calendar/market-calendar.component';
import { AddDividentComponent } from './components/divident/add-divident/add-divident.component';
import { AddStockSplitComponent } from './components/Stock-split-main/add-stock-split/add-stock-split.component';
import { AddConsolidationComponent } from './components/consolidation/add-consolidation/add-consolidation.component';
import { AddDelistingComponent } from './components/Delisting-main/add-delisting/add-delisting.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'dividend', component: DividendComponent },
      { path: 'dividend/add', component: AddDividentComponent },
      { path: 'dividend-detail/:id', component: DividendDetailComponent },      
      { path: 'stock-split', component: StockSplitComponent },
      { path: 'stock-split/add', component: AddStockSplitComponent},
      { path: 'stock-split/:id', component: StockSplitDetailComponent },
      { path: 'consolidation', component: ConsolidationComponent },
      { path: 'consolidation/add', component: AddConsolidationComponent},
      { path: 'consolidation/:id', component: ConsolidationDetailComponent },
      { path: 'delisting', component: DelistingComponent },
      { path: 'delisting/add', component: AddDelistingComponent},
      { path: 'delisting/:id', component: DelistingDetailComponent },
      { path: 'stock-file', component: StockFileComponent},
      { path: 'fund-file', component: FundFileComponent},
      { path: 'view-feedbacks', component: ViewFeedbacksComponent},
      { path: 'ipo-section', component: IpoSectionComponent},
      { path: 'ipo-section/:id', component: IpoDetailComponent},
      { path: 'market-calender', component: MarketCalendarComponent}

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
