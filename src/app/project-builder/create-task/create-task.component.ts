import {Component, OnInit, ChangeDetectionStrategy, Renderer2, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

// import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements OnInit {
  public readonly icons: string[] = [
    'bucket',
    'fish',
    'grid',
    'leaf',
    'mag',
    'palette',
    'pencil',
    'thermometer',
    'walk',
  ];
  public readonly form: FormGroup = new FormGroup({
    icon: new FormControl(this.icons[0]),
    name: new FormControl(null, [Validators.required]),
    duration: new FormControl(0, [Validators.required, Validators.min(1)]),
    description: new FormControl(null, Validators.required),
    actions: new FormControl([]),
  });

  public activeTab: 'details' | 'actions' = 'details';

  // constructor(private dialogRef: MatDialogRef<CreateTaskComponent>) {}

  @ViewChild('modal') modal: ElementRef;


  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if (e.target !== this.modal.nativeElement) {
        this.form.markAllAsTouched();

        if (this.form.invalid) {
          return;
        }
      }
    });
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }
}
