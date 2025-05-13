import { Component } from '@angular/core';


@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
  loadedFeature = 'contacts';
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
