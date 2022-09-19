import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'plan-nouns-search',
  templateUrl: './plan-nouns-search.component.html',
  styleUrls: ['./plan-nouns-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNounsSearchComponent implements OnInit {
  searchInput: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchInput = this.route.snapshot.queryParamMap.get('nouns');
  }

  onInput(e: Event): void {
    this.router.navigate([], {queryParams: {nouns: this.searchInput || null}, queryParamsHandling: 'merge'});
  }
}
