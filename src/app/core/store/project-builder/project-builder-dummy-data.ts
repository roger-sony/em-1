import {Paragraph} from '../../model/paragraph';

export interface TaskModel {
  id: number;

  actualEffort: number;
  assignedTo: {[key: string]: string | number | boolean}; // User or Role
  batchID: string;
  cadence: {[key: string]: string | number | boolean};
  duration: number;
  icon: string;
  instanceStartTime: string;
  name: string;
  paragraph: Paragraph;
  priority: number;
  score: number;
  status: string; // unclaimed, started, paused, complete, abandoned?
  startedAt: string;

  conditions: [];
  description: string;
  flexCount: number;
  flexType: string;
  canBeAbandoned: boolean;

  endsType: 'never' | 'after' | 'on';
  endsAfter: number;
  endsOn: string; // Date
  frequencyType: 'repeat' | 'schedule';
  occursOn: string; // day of week or ANY DAY
  repeatEveryCount: number;
  repeatEveryType: string;
  repeatOn: string; // day of week
  startsType: 'day' | 'on';
  startsDay: number;
  startsOnDate: string; // Date

  subtasks: [];
}

export interface ProjectTemplateModel {
  title: string;
  color: string;
  assignTo: string[];
  tasks: TaskModel[];
  id: number;
}

export const dummyProjectTemplates: ProjectTemplateModel[] = [
  {
    title: 'Fitness',
    color: '#0085FF',
    assignTo: [],
    tasks: [],
    id: 0,
  },
  {
    title: 'Fun',
    color: '#FC61FF',
    assignTo: [],
    tasks: [],
    id: 1,
  },
  {
    title: 'Work',
    color: '#E57D1C',
    assignTo: [],
    tasks: [],
    id: 2,
  },
  {
    title: 'Project 3',
    color: '#6BB035',
    assignTo: [],
    tasks: [],
    id: 3,
  },
  {
    title: 'Spring Break Trip',
    color: '#23BCBC',
    assignTo: [],
    tasks: [],
    id: 4,
  },
  {
    title: 'Studying',
    color: '#FF9100',
    assignTo: [],
    tasks: [],
    id: 5,
  },
  {
    title: 'Subplot',
    color: '#00C853',
    assignTo: [],
    tasks: [],
    id: 6,
  },
  {
    title: 'Gardening',
    color: '#29B6F6',
    assignTo: [],
    tasks: [],
    id: 7,
  },
];

export const dummyTasksTemplates: TaskModel[] = [
  {
    id: 0,

    actualEffort: null,
    assignedTo: null,
    batchID: null,
    cadence: null,
    duration: 45,
    icon: 'leaf',
    instanceStartTime: null,
    name: 'Transplant basil plants into the system',
    paragraph: null,
    priority: null,
    score: null,
    status: null,
    startedAt: null,

    conditions: [],
    description: null,
    flexCount: null,
    flexType: null,
    canBeAbandoned: false,

    endsType: 'never',
    endsAfter: null,
    endsOn: null,
    frequencyType: 'repeat',
    occursOn: null,
    repeatEveryCount: null,
    repeatEveryType: null,
    repeatOn: null,
    startsType: 'day',
    startsDay: null,
    startsOnDate: null,

    subtasks: [],
  },
  {
    id: 1,

    actualEffort: null,
    assignedTo: null,
    batchID: null,
    cadence: null,
    duration: 45,
    icon: 'mag',
    instanceStartTime: null,
    name: 'Check Resevoir water',
    paragraph: null,
    priority: null,
    score: null,
    status: null,
    startedAt: null,

    conditions: [],
    description: null,
    flexCount: null,
    flexType: null,
    canBeAbandoned: false,

    endsType: 'never',
    endsAfter: null,
    endsOn: null,
    frequencyType: 'repeat',
    occursOn: null,
    repeatEveryCount: null,
    repeatEveryType: null,
    repeatOn: null,
    startsType: 'day',
    startsDay: null,
    startsOnDate: null,

    subtasks: [],
  },
  {
    id: 2,

    actualEffort: null,
    assignedTo: null,
    batchID: null,
    cadence: null,
    duration: 60,
    icon: 'bucket',
    instanceStartTime: null,
    name: 'Resevior water change',
    paragraph: null,
    priority: null,
    score: null,
    status: null,
    startedAt: null,

    conditions: [],
    description: null,
    flexCount: null,
    flexType: null,
    canBeAbandoned: false,

    endsType: 'never',
    endsAfter: null,
    endsOn: null,
    frequencyType: 'repeat',
    occursOn: null,
    repeatEveryCount: null,
    repeatEveryType: null,
    repeatOn: null,
    startsType: 'day',
    startsDay: null,
    startsOnDate: null,

    subtasks: [],
  },
  {
    id: 3,

    actualEffort: null,
    assignedTo: null,
    batchID: null,
    cadence: null,
    duration: 120,
    icon: 'leaf',
    instanceStartTime: null,
    name: 'Sweep the greenhouse',
    paragraph: null,
    priority: null,
    score: null,
    status: null,
    startedAt: null,

    conditions: [],
    description: null,
    flexCount: null,
    flexType: null,
    canBeAbandoned: false,

    endsType: 'never',
    endsAfter: null,
    endsOn: null,
    frequencyType: 'repeat',
    occursOn: null,
    repeatEveryCount: null,
    repeatEveryType: null,
    repeatOn: null,
    startsType: 'day',
    startsDay: null,
    startsOnDate: null,

    subtasks: [],
  },
];
