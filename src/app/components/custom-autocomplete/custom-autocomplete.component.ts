import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AutocompleteItem } from 'design-angular-kit';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html',
  styleUrl: './custom-autocomplete.component.scss',
})
export class CustomAutocompleteComponent implements OnInit {
  @Input() label: string = 'Cerca nel sito';
  @Input() placeholder: string = 'Testo da cercare';
  @Input() onChangeItem: Function = () => {};
  @Input() autocompleteOptions: AutocompleteItem[] = [];

  private _autoCompleteData: AutocompleteItem[] = [];

  ngOnInit(): void {
    this._autoCompleteData = this.autocompleteOptions;
  }
  /**
   * Dynamic AutocompleteData (API) accepted by it-input
   * @param search the autocomplete input string
   */
  autocompleteUsers$ = (
    search?: string | null
  ): Observable<AutocompleteItem[]> => {
    if (!search) {
      return of([]);
    }

    // API request for retrieve data, use `search` to filter data
    return of(this._autoCompleteData);
  };

  onAutocompleteSelected(item: AutocompleteItem): void {
    this.onChangeItem(item);
  }
}
