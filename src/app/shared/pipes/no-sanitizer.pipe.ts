import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'noSanitizer',
})
export class NoSanitizerPipe implements PipeTransform {
  constructor(private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  transform(value: string, name: string): SafeResourceUrl {
    this.iconRegistry.addSvgIcon(name.toLowerCase(), this.domSanitizer.bypassSecurityTrustResourceUrl(value));
    return value;
  }
}
