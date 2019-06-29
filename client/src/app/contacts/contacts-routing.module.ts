import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactsResolver } from './resolvers/contacts.resolver';

const routes: Routes = [
  { path: '', component: ContactsListComponent, resolve: { data: ContactsResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
