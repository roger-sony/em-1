import {initialSchedulerState, SchedulerState} from './scheduler.state';
import {SchedulerAction, SchedulerActionType} from './scheduler.action';
import {dummySkedTemplates} from './scheduler-dummy-data';

export function schedulerReducer(
  state: SchedulerState = initialSchedulerState,
  action: SchedulerAction
): SchedulerState {
  switch (action.type) {
    case SchedulerActionType.COPY_WEEK_TO_NEXT_EMPTY_SLOT:
      let isEmptyWeekFilled: boolean = false;

      return {
        ...state,
        currentMonth: {
          ...state.currentMonth,
          weeks: state.currentMonth.weeks.map(i => {
            if (!i && !isEmptyWeekFilled) {
              isEmptyWeekFilled = true;
              return {
                ...action.week,
                label: action.week.label + '_copy',
              };
            }

            return i;
          }),
        },
      };
    case SchedulerActionType.CREATE_SKED_SUCCESS:
      return {
        ...state,
        skedTemplates: dummySkedTemplates,
        saveInProgress: false,
      };
    case SchedulerActionType.CREATE_WEEK_SUCCESS:
      return {
        ...state,
        currentWeek: {
          ...action.payload.week,
        },
        saveInProgress: false,
      };
    case SchedulerActionType.INSERT_WEEK_IN_SLOT_BY_INDEX:
      const changedMonth = {...state.currentMonth};
      changedMonth.weeks.splice(action.payload.slotIndex, 1, {
        ...action.payload.week,
        label: action.payload.week.label + '_duplicate',
      });

      return {
        ...state,
        currentMonth: changedMonth,
      };
    case SchedulerActionType.FETCH_CURRENT_WEEK_SUCCESS:
      return {
        ...state,
        currentWeek: {
          ...action.week,
        },
        saveInProgress: false,
      };
    case SchedulerActionType.REMOVE_WEEK:
      return {
        ...state,
        currentMonth: {
          ...state.currentMonth,
          weeks: state.currentMonth.weeks.map(w => {
            if (action.id === w._id) {
              return null;
            }

            return w;
          }),
        },
      };
    case SchedulerActionType.SET_SAVE_IN_PROGRESS:
      return {
        ...state,
        saveInProgress: action.state,
      };
    case SchedulerActionType.UPDATE_WEEK_SUCCESS:
      return {
        ...state,
        currentWeek: {
          ...action.week,
        },
        saveInProgress: false,
      };
    default:
      return state;
  }
}
