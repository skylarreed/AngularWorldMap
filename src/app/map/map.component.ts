import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  private svgObject: any;
  private countryPaths: any;
  public highlightedCountry: string = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  onMapLoad(event: any) {
    this.svgObject = event.target.contentDocument;
    this.countryPaths = this.svgObject.getElementsByTagName('path');

    for (let i = 0; i < this.countryPaths.length; i++) {
      let countryPath = this.countryPaths[i];

      countryPath.addEventListener('mouseover', () => {
        const countryName = countryPath.getAttribute('name');
        this.highlightCountry(countryPath, countryName);
      });

      countryPath.addEventListener('mouseout', () => {
        this.unhighlightCountry(countryPath);
      });
    }
  }

  highlightCountry(countryPath: any, countryName: string) {
    countryPath.style.fill = 'yellow';
    this.highlightedCountry = countryName;
    this.changeDetectorRef.detectChanges(); // Trigger change detection
  }

  unhighlightCountry(countryPath: any) {
    countryPath.style.fill = '';
    this.highlightedCountry = '';
    this.changeDetectorRef.detectChanges(); // Trigger change detection
  }
}
