import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  
  onSelected(feature: string) {
    console.log('Feature selected in Header Component:', feature);
    this.selectedFeatureEvent.emit(feature);
  }
}
