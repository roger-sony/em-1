import {Injectable} from '@angular/core';
import {FormGroup, ValidationErrors, AsyncValidator} from '@angular/forms';
import {InventoryService} from '../../core/api/legacy/inventory.service';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Injectable({providedIn: 'root'})
export class InventoryValidator implements AsyncValidator {
  constructor(private inventoryService: InventoryService, private route: ActivatedRoute) {}

  validate(fg: FormGroup): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const type = fg.get('type');
    const subcategory = fg.get('subcategory');
    const editing = !!this.route.snapshot.paramMap.get('edit');
    if (!type || !subcategory) {
      return of(null);
    }
    return this.inventoryService.validateSubcategory(type.value, subcategory.value, editing).pipe(
      tap(res => console.log('InventoryValidator received response:', res)),
      map(res => (res.subcategoryValid ? null : {subcategoryExists: true})),
      catchError(() => null)
    );
  }
}
