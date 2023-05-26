import { Component, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CountryApiService } from '../country-api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
  private svgObject: any;
  private countryPaths: any;
  public highlightedCountry: string = '';
  public countryCapital: string = '';
  public countryRegion: string = '';
  public countryIncomeLevel: string = '';
  public countryLatitude: string = '';
  public countryLongitude: string = '';
 

  constructor(private changeDetectorRef: ChangeDetectorRef, private countryApiService: CountryApiService, private ngZone: NgZone) { }

  onMapLoad(event: any) {
    this.svgObject = event.target.contentDocument;
    this.countryPaths = this.svgObject.getElementsByTagName('path');

    for (let i = 0; i < this.countryPaths.length; i++) {
      let countryPath = this.countryPaths[i];

      countryPath.addEventListener('mouseover', () => {
        const countryName = countryPath.getAttribute('name');
        const countryCode = countryPath.getAttribute('id');
        this.highlightCountry(countryPath, countryName, countryCode);
      });

      countryPath.addEventListener('mouseout', () => {
        this.unhighlightCountry(countryPath);
      });
    }
  }

  highlightCountry(countryPath: any, countryName: string, countryCode: string) {
    countryPath.style.fill = 'lightblue';
    this.setCountryData(countryCode, countryName);
    this.ngZone.run(() => { this.changeDetectorRef.detectChanges(); });

  }

  unhighlightCountry(countryPath: any) {
    countryPath.style.fill = '';
    this.ngZone.run(() => { this.changeDetectorRef.detectChanges(); });
  }

  setCountryData(countryCode: string, countryName: string) {
    let map = this.countryApiService.getCountryData(countryCode, countryName);
    this.highlightedCountry = map.get('countryName');
    this.countryCapital = map.get('countryCapital');
    this.countryRegion = map.get('countryRegion');
    this.countryIncomeLevel = map.get('countryIncomeLevel');
    this.countryLatitude = map.get('countryLatitude');
    this.countryLongitude = map.get('countryLongitude');
    this.ngZone.run(() => { this.changeDetectorRef.detectChanges(); });
  }
}
