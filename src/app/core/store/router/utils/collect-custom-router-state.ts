import {ActivatedRouteSnapshot} from '@angular/router';
import {CustomRouterState} from '../router.state';

export function collectCustomRouterState(route: ActivatedRouteSnapshot, url: string): CustomRouterState {
  const params = route.paramMap.keys.reduce((paramMap: Record<string, string>, key) => {
    paramMap[key] = route.paramMap.get(key);
    return paramMap;
  }, {});

  const queryParams = route.queryParamMap.keys.reduce((queryParamMap: Record<string, string>, key) => {
    queryParamMap[key] = route.queryParamMap.get(key);
    return queryParamMap;
  }, {});

  const data = {...route.data};

  return route.children.reduce(
    (state, childRoute) => {
      const childState = collectCustomRouterState(childRoute, url);
      return {
        url,
        params: {...state.params, ...childState.params},
        queryParams: {...state.queryParams, ...childState.queryParams},
        data: {...state.data, ...childState.data},
      };
    },
    {url, params, queryParams, data}
  );
}
