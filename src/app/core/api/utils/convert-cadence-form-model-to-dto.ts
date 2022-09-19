import {CadenceFormDto} from '../dto/cadence-form.dto';
import {CadenceForm} from '../../model/form/cadence-form';

export function convertCadenceFormModelToDto(cadenceForm: CadenceForm): CadenceFormDto {
  return (
    cadenceForm && {
      planId: cadenceForm.planId,
      cadenceId: cadenceForm.cadenceId,
      startDateTime: cadenceForm.startDateTime.format(),
      repetition: cadenceForm.repetition,
      custom: cadenceForm.custom,
      end: cadenceForm.end,
      saveReport: cadenceForm.saveReport,
      triggerActions: cadenceForm.triggerActions,
      page: cadenceForm.page,
      id: cadenceForm.id,
    }
  );
}
