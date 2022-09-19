export function structureNounsForDisplay(nouns: any, uomList: any, taskList: any) {
  const uom = uomList.reduce((map, obj) => ((map[obj.nounSubcategory] = obj), map), {});
  const tasks = taskList.reduce((map, obj) => ((map[obj.id] = obj), map), {});
  let conditionsArr = [];
  let conditionsObj = {};
  nouns.forEach(rule => {
    let filterArr = [];
    let valueNames;
    let factFilters;
    if (uom[rule.configName] && uom[rule.configName].type === 'range') {
      valueNames = uom[rule.configName].rangeConfig.reduce((map, obj) => ((map[obj.value] = obj), map), {});
      factFilters = rule.factFilters.filter(f => f.value === valueNames[f.value].value.toString());
    } else {
      factFilters = rule.factFilters;
    }
    factFilters.forEach(ff => {
      const name = ff.name === 'qty' ? 'current value' : ff.name;
      const operation = ff.operation === '$eq' ? 'is' : ff.operation === '$gt' ? 'is greater than' : 'is less than';
      const filterObj = {
        name: name,
        operation: operation,
        value:
          uom[rule.configName] && uom[rule.configName].type === 'range' ? valueNames[ff.value].displayValue : ff.value,
        task:
          tasks[rule.consequence] && tasks[rule.consequence].shortTask
            ? tasks[rule.consequence].shortTask
            : '(Task not defined)',
        sked: rule.sked ? rule.sked : '(Sked not defined)',
        id: Math.floor(Math.random() * 1000000000),
      };
      filterArr.push(filterObj);
    });
    let conditionObj = {
      name: rule.configName,
      factFiltersDisplay: filterArr,
    };
    conditionsArr.push(conditionObj);
    if (conditionsObj[conditionObj.name]) {
      conditionsObj[conditionObj.name].factFiltersDisplay = [
        ...conditionsObj[conditionObj.name].factFiltersDisplay,
        ...filterArr,
      ];
    } else {
      conditionsObj[conditionObj.name] = conditionObj;
    }
  });
  return Object.keys(conditionsObj).map(i => conditionsObj[i]);
}
