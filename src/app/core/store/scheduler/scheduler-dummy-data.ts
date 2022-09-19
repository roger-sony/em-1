export interface MonthModel {
  label: string;
  length: number;
  startDate: string | Date;
  weeks: WeekModel[];
  __v: number;
  _id: string;
}

export interface WeekModel {
  projectTags?: ProjectTagModel[];
  planing?: {
    Monday: SkedTemplateModel[];
    Tuesday: SkedTemplateModel[];
    Wednesday: SkedTemplateModel[];
    Thursday: SkedTemplateModel[];
    Friday: SkedTemplateModel[];
    Saturday: SkedTemplateModel[];
    Sunday: SkedTemplateModel[];
  };

  label: string;
  startDate: string;
  length?: number;
  skeds?: SkedTemplateModel[];
  _id?: string;
}

export interface ProjectTagModel {
  title: string;
  color: string;
}

export interface SkedTemplateModel {
  title: string;
  colors: string[];
  duration: number;
  interval: string;
  id: string;
}

export const dummyTags: ProjectTagModel[] = [
  {
    title: 'Personal',
    color: '#7B61FF',
  },
  {
    title: 'Fitness',
    color: '#0085FF',
  },
  {
    title: 'Work',
    color: '#FF9F2D',
  },
  {
    title: 'Fun',
    color: '#FC61FF',
  },
];

export const dummyWeek: WeekModel = {
  label: 'Dummy week',
  startDate: '2022-09-13T06:33:24.790Z',
  skeds: [],
  projectTags: dummyTags,
  planing: {
    Monday: [
      {
        title: 'Morning Routine',
        colors: ['#0085FF', '#FC61FF'],
        interval: '7am - 11am',
        duration: 4,
        id: '7b020203-2f39-49aa-8452-31fa1228e66f',
      },
    ],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
};

export const dummySkedTemplates: SkedTemplateModel[] = [
  {
    title: 'Fitness',
    colors: ['#0085FF', '#FC61FF', '#E57D1C', '#6BB035'],
    interval: '1am - 2am',
    duration: 1,
    id: '80603074-a961-46f3-81e7-ebfb6c9502b1',
  },
  {
    title: 'Fun',
    colors: ['#FC61FF'],
    interval: '3am - 4am',
    duration: 1,
    id: '59b735b8-1e08-46d7-81bc-bb2573747b76',
  },
  {
    title: 'Work',
    colors: ['#E57D1C'],
    interval: '1am - 3am',
    duration: 2,
    id: '123b6bef-1f14-4d54-a070-b644472201bc',
  },
  {
    title: 'Project 3',
    colors: ['#6BB035'],
    interval: '1am - 4am',
    duration: 3,
    id: '0fa4c0af-ebca-4839-af2a-d424b0ecb383',
  },
  {
    title: 'Spring Break Trip',
    colors: ['#23BCBC'],
    interval: '1am - 5am',
    duration: 4,
    id: '7e6f48e9-1023-48c0-b48f-61861dca9a10',
  },
  {
    title: 'Studying',
    colors: ['#FF9100'],
    interval: '1am - 6am',
    duration: 5,
    id: 'f0ae2ecd-11cb-4e07-b961-74d94c0d7d32',
  },
  {
    title: 'Subplot',
    colors: ['#00C853'],
    interval: '1am - 7am',
    duration: 6,
    id: 'a9089d92-0dce-4b50-a728-899d037f19f8',
  },
  {
    title: 'Gardening',
    colors: ['#29B6F6'],
    interval: '1am - 8am',
    duration: 7,
    id: 'd73fe87b-8604-4b5b-a6df-50b02a89d5b3',
  },
];

export const dummyMonth: MonthModel = {
  label: '',
  length: 13,
  startDate: '',
  weeks: [
    {
      label: 'Week_1',
      startDate: '2022-09-13T06:33:24.790Z',
      projectTags: [],
      planing: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [
          {
            title: 'Dummy',
            colors: ['#0085FF', '#7B61FF'],
            duration: 4,
            interval: '7am - 11am',
            id: 'd73fe87b-8604-4b5b-a6df-50b02a89d5b3',
          },
        ],
        Saturday: [],
        Sunday: [
          {
            title: 'Dummy',
            colors: ['#0085FF', '#7B61FF'],
            duration: 3,
            interval: '8am - 11am',
            id: 'd73fe87b-8604-4b5b-a6df-50b02a79d5b3',
          },
        ],
      },
    },
    null,
    {
      label: 'Week_3',
      startDate: '2022-09-13T06:33:24.790Z',
      projectTags: [],
      planing: {
        Monday: [
          {
            title: 'Dummy',
            colors: ['#0085FF', '#7B61FF'],
            duration: 4,
            interval: '7am - 11am',
            id: 'd73fe87b-8603-4b4b-a6df-50b02a89d5b3',
          },
        ],
        Tuesday: [],
        Wednesday: [
          {
            title: 'Dummy',
            colors: ['#0085FF', '#7B61FF'],
            duration: 3,
            interval: '8am - 11am',
            id: 'd73fe87b-8274-4b5b-a6df-50b02a79d5b3',
          },
        ],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
    },
    {
      label: 'Week_4',
      startDate: '2022-09-13T06:33:24.790Z',
      projectTags: [],
      planing: {
        Monday: [],
        Tuesday: [
          {
            title: 'Dummy',
            colors: ['#0085FF', '#7B61FF'],
            duration: 4,
            interval: '7am - 11am',
            id: 'd73fe87b-8603-4b4b-a6df-50b02a89d5b3',
          },
        ],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [
          {
            title: 'Dummy',
            colors: ['#0085FF', '#7B61FF'],
            duration: 3,
            interval: '8am - 11am',
            id: 'd73fe87b-8274-4b5b-a6df-50b02a79d5b3',
          },
        ],
        Sunday: [],
      },
    },
    null,
  ],
  __v: 0,
  _id: '',
};
