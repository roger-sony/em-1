import {Injectable} from '@angular/core';
import {Data, Params, RouterStateSnapshot} from '@angular/router';
import {RouterReducerState, RouterStateSerializer} from '@ngrx/router-store';
import {collectCustomRouterState} from './utils/collect-custom-router-state';

export interface CustomRouterReducerState extends RouterReducerState<CustomRouterState> {
  previousState?: CustomRouterState;
}

export interface CustomRouterState {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

@Injectable()
export class CustomRouterStateSerializer implements RouterStateSerializer<CustomRouterState> {
  public serialize(routerState: RouterStateSnapshot): CustomRouterState {
    return collectCustomRouterState(routerState.root, routerState.url);
  }
}
