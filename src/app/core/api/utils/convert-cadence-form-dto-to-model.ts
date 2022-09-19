import {CadenceFormDto} from '../dto/cadence-form.dto';
import {CadenceForm} from '../../model/form/cadence-form';
import * as moment from 'moment';

export function convertCadenceFormDtoToModel(cadenceFormDto: CadenceFormDto): CadenceForm {
  return (
    cadenceFormDto && {
      planId: cadenceFormDto.planId,
      cadenceId: cadenceFormDto.cadenceId,
      startDateTime: cadenceFormDto.startDateTime ? moment(new Date(cadenceFormDto.startDateTime)) : null,
      repetition: cadenceFormDto.repetition,
      custom: cadenceFormDto.custom,
      end: cadenceFormDto.end,
      saveReport: cadenceFormDto.saveReport,
      triggerActions: cadenceFormDto.triggerActions,
      page: cadenceFormDto.page,
      id: cadenceFormDto.id,
    }
  );
}
