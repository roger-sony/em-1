import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateGuard} from './core/guard/can-activate.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [CanActivateGuard],
    data: {
      bottomNavShown: true,
    },
  },
  {
    path: 'lexicon',
    loadChildren: () => import('./lexicon/lexicon.module').then(m => m.LexiconModule),
    canLoad: [CanActivateGuard],
    data: {
      bottomNavShown: true,
      privileges: ['Can view Lexicon'],
    },
  },
  {
    path: 'skeds',
    loadChildren: () => import('./skeds/skeds.module').then(m => m.SkedsModule),
    data: {
      bottomNavShown: true,
    },
  },
  {
    path: 'skeds-legacy',
    loadChildren: () => import('./skeds-legacy/skeds-legacy.module').then(m => m.SkedsLegacyModule),
    data: {
      bottomNavShown: true,
    },
  },
  {
    path: 'mobile-sked',
    loadChildren: () => import('./mobile-sked/mobile-sked.module').then(m => m.MobileSkedModule),
    data: {
      bottomNavShown: true,
    },
  },
  {
    path: 'paragraphs',
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
    data: {
      bottomNavShown: true,
    },
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canLoad: [CanActivateGuard],
    data: {
      privileges: ['Can view Users'],
      bottomNavShown: true,
    },
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
    canLoad: [CanActivateGuard],
    data: {
      privileges: ['Can view Roles'],
      bottomNavShown: true,
    },
  },
  {
    path: 'privileges',
    loadChildren: () => import('./privileges/privileges.module').then(m => m.PrivilegesModule),
    canLoad: [CanActivateGuard],
    data: {
      privileges: ['Can view Privileges'],
      bottomNavShown: true,
    },
  },
  {
    path: 'project-builder',
    loadChildren: () => import('./project-builder/project-builder.module').then(m => m.ProjectBuilderModule),
    data: {
      bottomNavShown: true,
    },
  },
  {
    path: 'scheduler',
    loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule),
    data: {
      bottomNavShown: true,
    },
  },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {
    path: 'current-sked',
    loadChildren: () => import('./mobile-sked/current-sked/current-sked.module').then(m => m.CurrentSkedModule),
  },
  {
    path: 'current-chapter',
    loadChildren: () => import('./skeds/calendar-view/skeds-calendar-view.module').then(m => m.SkedsCalendarViewModule),
  },
  {
    path: 'chapters',
    loadChildren: () => import('./skeds/templates/sked-templates.module').then(m => m.SkedTemplatesModule),
  },
  {path: 'user/:id', redirectTo: '/users/:id'},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
