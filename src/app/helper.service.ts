import { Injectable } from '@angular/core';


const regexIdUrl = new RegExp('[^/]+(?=/$|$)');

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  getIdFromUrl(url: string) : string  {

    const id = regexIdUrl.exec(url)[0];
    return id;

    // let id = url.substring(url.lastIndexOf('/') + 1);
    // if( !id ) {
    //   // remove last caracter
    //   let subsUrl = url.substring(0, url.length -1 );
    //   id = subsUrl.substring(subsUrl.lastIndexOf('/') + 1);
    // }
    // return id;
  }

  getBadgeNumber(i : number ) : string {
    if ( i >= 1000 ) {
      const result = Math.floor(i / 1000) ;
      return result + "k+";
    } else if ( i > 100 ) {
      const result = Math.floor(i / 100) * 100;
      return result + "+";
    } else  if ( i > 10 ) {
      const result = Math.floor(i / 10) * 10;
      return result + "+";
    }

    return i.toString();

  }

}
