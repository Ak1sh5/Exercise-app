// search-bar.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      exerciseName: ['']
    });
  }

  onSearch() {
    const exerciseNameControl = this.searchForm.get('exerciseName');
  
    if (exerciseNameControl) {
      const userInput = exerciseNameControl.value;
      this.search.emit(userInput);
    }
  }
  
}
