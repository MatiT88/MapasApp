import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [
    `
    #mapa {
      width: 100%;
      height: 100%;
    }
    `
  ]
})
export class FullscreenComponent implements OnInit {
  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapBoxToken;
var map = new mapboxgl.Map({
  container: 'mapa',
  style: 'mapbox://styles/mapbox/streets-v11'
});
  }

}
