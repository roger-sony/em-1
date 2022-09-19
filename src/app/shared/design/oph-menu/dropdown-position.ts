import {ConnectedPosition} from '@angular/cdk/overlay';

export enum DropdownPosition {
  BottomEnd = 'BottomEnd',
  BottomStart = 'BottomStart',
  Left = 'Left',
  Right = 'Right',
  TopCenter = 'TopCenter',
  TopEnd = 'TopEnd',
  TopStart = 'TopStart',
}

export const connectedPositionsMap: Record<DropdownPosition, ConnectedPosition> = {
  [DropdownPosition.BottomEnd]: {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  },
  [DropdownPosition.BottomStart]: {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
  [DropdownPosition.Left]: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
  },
  [DropdownPosition.Right]: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
  },
  [DropdownPosition.TopCenter]: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  },
  [DropdownPosition.TopEnd]: {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
  },
  [DropdownPosition.TopStart]: {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  },
};

export function convertDropdownToConnectedPositions(dropdownPositions: DropdownPosition[]): ConnectedPosition[] {
  return dropdownPositions.map(dropdownPosition => connectedPositionsMap[dropdownPosition]);
}
