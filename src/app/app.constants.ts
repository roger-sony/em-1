import {environment} from '../environments/environment';

export const WEBROOT = environment.apiUrl;

/*********************************************************
                  For Create Fact Form
*********************************************************/
export interface FactOperation {
  value: string;
  displayValue: string;
}

export const FACT_OPERATIONS: FactOperation[] = [
  {value: '$gt', displayValue: '>'},
  {value: '$lt', displayValue: '<'},
  {value: '=', displayValue: '='},
];

export const DEFAULT_ROWS: number = 25;

export interface LegacyMenuItem {
  label: string;
  link?: string;
  children?: LegacyMenuItem[];
  icon?: string;
}

export const MENU: LegacyMenuItem[] = [
  {
    label: 'Nouns',
    children: [
      {
        label: 'View Nouns',
        link: '/nouns',
      },
      {
        label: 'Create New',
        link: '/nouns/new',
      },
    ],
  },
  {
    label: 'Tasks',
    children: [
      {
        label: 'View Tasks',
        link: '/tasks',
      },
      {
        label: 'Create New',
        link: '/task/new',
      },
      {
        label: 'Task Scheduler',
        link: '/task-scheduler',
      },
    ],
  },
  {
    label: 'Rules',
    children: [
      {
        label: 'Decision Tables',
        link: '/decision-tables',
      },
      {
        label: 'Rule Triggers',
        link: '/rule-triggers',
      },
    ],
  },
  {
    label: 'Skeds',
    children: [
      {
        label: 'Week View',
        link: '/skeds',
      },
      {
        label: 'Current Sked',
        link: '/current-sked',
      },
    ],
  },
  {
    label: 'Reports',
    children: [
      {
        label: 'View/Run Reports',
        link: '/decision-table-reports',
      },
      {
        label: 'Queued Actions',
        link: '/queued-actions',
      },
    ],
  },
  {
    label: 'Metrics',
    children: [
      {
        label: 'View Metrics',
        link: '/metrics',
      },
    ],
  },
  {
    label: 'Users',
    children: [
      {
        label: 'Manage Users',
        link: '/users',
      },
      {
        label: 'Manage Roles',
        link: '/roles',
      },
    ],
  },
];

export const SKED_ZOOM_OPTIONS: string[] = ['00:05:00', '00:10:00', '00:15:00', '00:30:00'];

export const SKED_DEFAULT_ZOOM_OPTION_INDEX: number = 3;

export interface PrivilegeDto {
  __v: number;
  _id: string;
  name: string;
}

export interface Privilege {
  id: string;
  name: string;
  v: number;
}
