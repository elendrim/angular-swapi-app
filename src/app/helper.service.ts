import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'


const regexIdUrl = new RegExp('[^\/]+(?=\/$|$)');

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  
  constructor(
  ) { }

  getIdFromUrl(url: string) : string  {

    var id = regexIdUrl.exec(url)[0];
    return id;

    // var id = url.substring(url.lastIndexOf('/') + 1);
    // if( !id ) {
    //   // remove last caracter
    //   var subsUrl = url.substring(0, url.length -1 );
    //   id = subsUrl.substring(subsUrl.lastIndexOf('/') + 1);
    // }
    // return id;
  }

}
