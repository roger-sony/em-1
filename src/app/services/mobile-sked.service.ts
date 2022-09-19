import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ParagraphModel, SkedModel} from '../mobile-sked/sked.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MobileSkedService {
  private readonly url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getSkeds(): Observable<SkedModel[]> {
    return this.http.get<SkedModel[]>(`${this.url}/flexskeds/current`).pipe(
      catchError(er => er),
      map((sked: SkedModel[]) => {
        return testSked.map(s => {
          const paragraphs = []; // [...s.paragraphs];
          if (sked?.[0]?.paragraphs) {
            paragraphs.push(...sked?.[0]?.paragraphs);
          }
          const inProgressP: ParagraphModel[] = paragraphs.filter(p => p.status === 'in progress');
          const scheduledP: ParagraphModel[] = paragraphs.filter(p => p.status === 'scheduled');
          const claimedP: ParagraphModel[] = paragraphs.filter(p => p.status === 'claimed');
          const otherP: ParagraphModel[] = paragraphs
            .filter(p => 'unclaimed' === p.status.toLowerCase())
            .sort((a, b) => {
              if (a.priority > b.priority) {
                return -1;
              }
              if (a.priority < b.priority) {
                return 1;
              }
              return 0;
            });

          return {
            // ...s,
            ...(sked?.[0] || null),
            paragraphs: [...inProgressP, ...scheduledP, ...claimedP, ...otherP],
          };
        });
      })
    );
  }

  getParagraph(id: string): Observable<{
    skedId: string;
    paragraph: ParagraphModel;
    hasOtherActiveParagraph: boolean;
  }> {
    return this.http.get<SkedModel[]>(`${this.url}/flexskeds/current`).pipe(
      catchError(er => er),
      map((res: SkedModel[]) => {
        return {
          hasOtherActiveParagraph: res?.[0]?.paragraphs.some(p => p.status === 'in progress'),
          skedId: res?.[0]?._id || '',
          paragraph: [...(res?.[0]?.paragraphs || [])] // , ...testParagraphs]
            .find(p => p.instanceID === id),
        };
      })
    );
  }

  getSentence(paragraphId: string): Observable<{
    skedId: string;
    paragraph: ParagraphModel;
  }> {
    return this.http.get<SkedModel[]>(`${this.url}/flexskeds/current`).pipe(
      catchError(er => er),
      map((sked: SkedModel[]) => {
        return {
          skedId: sked[0]?._id,
          paragraph: [...(sked?.[0]?.paragraphs || [])] // , ...testParagraphs]
            .find(p => p.instanceID === paragraphId),
        };
      })
    );
  }

  updateParagraph(skedId: string, paragraph: ParagraphModel) {
    return this.http.patch(`${this.url}/flexskeds/updateParagraph/${skedId}`, paragraph);
  }

  pauseParagraph(skedId: string, paragraph: ParagraphModel) {
    return this.http.patch(`${this.url}/flexskeds/pauseParagraph/${skedId}`, paragraph);
  }

  resumeParagraph(skedId: string, paragraph: ParagraphModel) {
    return this.http.patch(`${this.url}/flexskeds/resumeParagraph/${skedId}`, paragraph);
  }
}

// const testUsers: UserModel[] = [{
//     "roles": [],
//     "_id": "5f04d47c187c730031c7a622",
//     "username": "Eric",
//     "__v": 0
//   }, {
//   'roles': [],
//   '_id': '5c7575b5ab40a40fe5fdb97b',
//   'username': 'Head_Farmer',
//   '__v': 1,
// }];

const testParagraphs: ParagraphModel[] = [
  {
    sentences: [
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
            {
              unitOfMeasure: '1',
              options: ['1', '2', '3', '4'],
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'selection',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: true,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
        status: 'complete',
      },
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
    ],
    status: 'unclaimed',
    assignedTo: [],
    instanceID: 'NFBU13AHJG1HUF5128',
    startedAt: '',
    _id: '61707eea326a199a8ab4d2bc',
    assignedToUser: ['5f04d47c187c730031c7a622'],
    schedule: [
      {
        startDateTime: '2021-10-29T00:15:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
      {
        startDateTime: '2021-10-29T14:45:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
    ],
    name: 'Priority - 10',
    derivedEffort: 51,
    movability: 0,
    priority: 10,
    score: 10,
    lexicon: 'Default',
    __v: 0,
  },
  {
    sentences: [
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'take',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: 'cleaner',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
        status: 'complete',
      },
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'wash',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: 'table',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
    ],
    status: 'in progress',
    assignedTo: [],
    instanceID: 'NFBU12AHJG1HUF5128',
    startedAt: '2021-11-13T17:00:00.000Z',
    _id: '61705cc5fd3e891e970cea12',
    assignedToUser: ['5f04d47c187c730031c7a622'],
    schedule: [
      {
        startDateTime: '2021-08-12T00:15:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
      {
        startDateTime: '2021-08-12T15:45:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
    ],
    name: 'in progress',
    derivedEffort: 35,
    movability: 1,
    priority: 1,
    score: 5,
    lexicon: 'Default',
    __v: 0,
  },
  {
    sentences: [
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
    ],
    status: 'unclaimed',
    assignedTo: [],
    instanceID: 'NFBU12AHJG1HUF5122',
    startedAt: '',
    _id: '61708eea326a199a8ae4d2bc',
    assignedToUser: ['5f04d47c187c730031c7a622'],
    schedule: [
      {
        startDateTime: '2021-10-29T00:15:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
      {
        startDateTime: '2021-10-29T14:45:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
    ],
    name: 'Priority - 5',
    derivedEffort: 51,
    movability: 0,
    priority: 5,
    score: 10,
    lexicon: 'Default',
    __v: 0,
  },
  {
    sentences: [
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
    ],
    status: 'unclaimed',
    assignedTo: [],
    instanceID: 'NFBU12AHJG1HUF5123',
    startedAt: '',
    _id: '61707esa326a199a8ae4d2bc',
    assignedToUser: ['5f04d47c187c730031c7a622'],
    schedule: [
      {
        startDateTime: '2021-10-29T00:15:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
      {
        startDateTime: '2021-10-29T14:45:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
    ],
    name: 'Priority - 1',
    derivedEffort: 51,
    movability: 0,
    priority: 1,
    score: 10,
    lexicon: 'Default',
    __v: 0,
  },
  {
    sentences: [
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
    ],
    status: 'unclaimed',
    assignedTo: [],
    instanceID: 'NFBU12AHJG1HUF5124',
    startedAt: '',
    _id: '61717eea326a199a8ae4d2bc',
    assignedToUser: ['5f04d47c187c730031c7a622'],
    schedule: [
      {
        startDateTime: '2021-10-29T00:15:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
      {
        startDateTime: '2021-10-29T14:45:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
    ],
    name: 'Priority - 6',
    derivedEffort: 51,
    movability: 0,
    priority: 6,
    score: 10,
    lexicon: 'Default',
    __v: 0,
  },
  {
    sentences: [
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
    ],
    status: 'unclaimed',
    assignedTo: [],
    instanceID: 'NFBU12AHJG1HUF5125',
    startedAt: '',
    _id: '61707eea326a199a8aw4d2bc',
    assignedToUser: ['5f04d47c187c730031c7a622'],
    schedule: [
      {
        startDateTime: '2021-10-29T00:15:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
      {
        startDateTime: '2021-10-29T14:45:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
    ],
    name: 'Priority - 3',
    derivedEffort: 51,
    movability: 0,
    priority: 3,
    score: 10,
    lexicon: 'Default',
    __v: 0,
  },
  {
    sentences: [
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
    ],
    status: 'unclaimed',
    assignedTo: [],
    instanceID: 'NFBU12AHJG1HUF5126',
    startedAt: '',
    _id: '61707eea326a199a8ac4d2bc',
    assignedToUser: ['5f04d47c187c730031c7a622'],
    schedule: [
      {
        startDateTime: '2021-10-29T00:15:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
      {
        startDateTime: '2021-10-29T14:45:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
    ],
    name: 'Priority - 7',
    derivedEffort: 51,
    movability: 0,
    priority: 7,
    score: 10,
    lexicon: 'Default',
    __v: 0,
  },
  {
    sentences: [
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
    ],
    status: 'claimed',
    assignedTo: [],
    instanceID: 'NFBU12AHJG1HUF5127',
    startedAt: '',
    _id: '61707eea326a199a8ae4w2bc',
    assignedToUser: ['5f04d47c187c730031c7a622'],
    schedule: [
      {
        startDateTime: '2021-10-29T00:15:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
      {
        startDateTime: '2021-10-29T14:45:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: null,
      },
    ],
    name: 'Claimed',
    derivedEffort: 51,
    movability: 0,
    priority: 10,
    score: 10,
    lexicon: 'Default',
    __v: 0,
  },
  {
    sentences: [
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
      {
        verb: {
          id: '612d5c5eb946983fd780460e',
          name: 'another one',
          description: 'this is the description',
        },
        noun: {
          active: true,
          id: '611fa462b946983fd780419f',
          name: '1',
          adjectives: [
            {
              unitOfMeasure: '1',
              options: null,
              _id: '611f7bc4b946983fd7804195',
              name: 'Number',
              numeric: true,
              type: 'number',
              value: '1',
              validation: 'non negative numbers',
              resetValue: '',
              updateable: false,
              lexicon: '',
            },
          ],
        },
        priority: 2,
        movability: 1,
        effort: 1,
      },
    ],
    status: 'scheduled',
    assignedTo: [],
    instanceID: 'NFBU12AHJG1HUF5128',
    startedAt: '',
    _id: '61707eea326a199a8ae4d1bc',
    assignedToUser: ['5f04d47c187c730031c7a622'],
    schedule: [
      {
        startDateTime: '2021-10-29T00:15:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: '2021-10-29T03:15:00-05:00',
      },
      {
        startDateTime: '2021-10-29T14:45:00-05:00',
        repetition: 'Does Not Repeat',
        custom: null,
        end: '2021-10-31T23:15:00-05:00',
      },
    ],
    name: 'Scheduled',
    derivedEffort: 51,
    movability: 0,
    priority: 10,
    score: 10,
    lexicon: 'Default',
    __v: 0,
  },
];

const testSked: SkedModel[] = [
  {
    allDay: false,
    assignedEmployees: 1,
    backgroundColor: '',
    balanced: true,
    borderColor: '',
    classNames: '',
    display: '',
    editable: true,
    end: '2021-11-25T05:00:00.000Z',
    overlap: false,
    paragraphs: testParagraphs,
    skedData: {
      startDay: 'Friday',
      endDay: 'Friday',
      startTime: '00:00',
      endTime: '09:00',
    },
    start: '2021-10-25T05:00:00.000Z',
    status: 'in progress',
    tasks: [],
    textColor: '',
    title: '',
    __v: 0,
    _dateCreated: '2020-07-12T08:53:07.503Z',
    _id: '5f0acf73289be26d9630c0ac',
    _version: 2,
  },
];
