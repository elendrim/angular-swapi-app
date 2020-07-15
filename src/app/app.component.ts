import {MediaMatcher, BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  public disableClose : boolean = false;
  public opened : boolean = false;
  
  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    breakpointObserver: BreakpointObserver,
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {

      if ( result.matches) {
        if (
          result.breakpoints[Breakpoints.XSmall] || 
          result.breakpoints[Breakpoints.Small] ||
          result.breakpoints[Breakpoints.Medium] 
          ) {

          this.disableClose = false;
          this.opened = false;
          

        } else {

          this.disableClose = true;
          this.opened = true;

        } 
      }

      
    });
  


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
      'sw_film',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/material/theaters-black-18dp.svg')
    );

    // about
    iconRegistry.addSvgIcon(
      'sw_miscellaneous',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/miscellaneous_by_radiusss.svg')
    );


    iconRegistry.addSvgIcon(
      'sw_btl_y_wing',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/btl_y_wing_by_radiusss.svg')
    );

    iconRegistry.addSvgIcon(
      'sw_blaster',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/blaster_by_radiusss.svg')
    );

    iconRegistry.addSvgIcon(
      'sw_death_star',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radiusss/death_star_by_radiusss.svg')
    );

  }

  clickMenu() : void {
    if ( ! this.disableClose ) {
      this.opened = !this.opened;
    }
  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

