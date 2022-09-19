import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'plans-search-input',
  templateUrl: './plans-search-input.component.html',
  styleUrls: ['./plans-search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansSearchInputComponent implements OnInit {
  searchInput: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchInput = this.route.snapshot.queryParamMap.get('search');
  }

  onInput(e: Event): void {
    this.router.navigate([], {queryParams: {search: this.searchInput || null}, queryParamsHandling: 'merge'});
  }
}
