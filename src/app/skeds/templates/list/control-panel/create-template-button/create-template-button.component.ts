import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'create-template-button',
  templateUrl: './create-template-button.component.html',
  styleUrls: ['./create-template-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTemplateButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
