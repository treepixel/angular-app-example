import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './components/list/list.component'
import { FormComponent } from './components/form/form.component'

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'adicionar-cliente', component: FormComponent },
  { path: 'editar-cliente/:id', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
