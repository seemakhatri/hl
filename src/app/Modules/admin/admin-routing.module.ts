import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './about/about.component';
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

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'dividend', component: DividendComponent },
      { path: 'dividend/:id', component: DividendDetailComponent },
      { path: 'stock-split', component: StockSplitComponent },
      { path: 'stock-split/:id', component: StockSplitDetailComponent },
      { path: 'consolidation', component: ConsolidationComponent },
      { path: 'consolidation/:id', component: ConsolidationDetailComponent },
      { path: 'delisting', component: DelistingComponent },
      { path: 'delisting/:id', component: DelistingDetailComponent },
      { path: 'stock-file', component: StockFileComponent},
      { path: 'fund-file', component: FundFileComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
