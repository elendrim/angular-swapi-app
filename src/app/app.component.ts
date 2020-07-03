import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // vehicle
    iconRegistry.addSvgIcon(
      'sw_vehicle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/speeder_by_radiusss.svg')
    );

    // people
    iconRegistry.addSvgIcon(
      'sw_people',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/finn_by_radiusss.svg')
    );


    // planet
    iconRegistry.addSvgIcon(
      'sw_planet',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/geonosis_by_radiusss.svg')
    );
    

    // starships
    iconRegistry.addSvgIcon(
      'sw_starship',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/millenium_falcon_by_radiusss.svg')
    );


    // species
    iconRegistry.addSvgIcon(
      'sw_species',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/master_yoda_by_radiusss.svg')
    );

    // films
    iconRegistry.addSvgIcon(
      'sw_films',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/miscellaneous_by_radiusss.svg')
    );


    iconRegistry.addSvgIcon(
      'sw_btl_y_wing',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/btl_y_wing_by_radiusss.svg')
    );

    

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

