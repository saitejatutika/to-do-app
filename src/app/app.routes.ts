import { Route } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Route[] = [
  { path: 'auth', component: AuthComponent },
  { path: 'todo', component: TodoComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
