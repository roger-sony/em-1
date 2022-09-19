import {ActivatedRouteSnapshot} from '@angular/router';

export function collectAllRouteParams(route: ActivatedRouteSnapshot): Record<string, string> {
  if (!route) {
    return {};
  }

  const parentParams = route.paramMap.keys.reduce((params, key) => {
    params[key] = route.paramMap.get(key);
    return params;
  }, {});

  const childParams = route.children.reduce((params, childRoute) => {
    return {...params, ...collectAllRouteParams(childRoute)};
  }, {});

  return {...parentParams, ...childParams};
}
