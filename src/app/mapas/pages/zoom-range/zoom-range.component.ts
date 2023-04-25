import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 9999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() {
    console.log('constructor',this.divMapa);
  }

  ngAfterViewInit(): void {

    console.log('AfterViewInit',this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-58.452524523106156,-34.57964978125058 ],
      zoom: this.zoomLevel
  });

    this.mapa.on('zoom', (evento) => {
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual;
      console.log(zoomActual);
    })

    this.mapa.on('zoomend', (evento) => {
      if( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
      }
    });

    }
    

  zoomIn() {
    this.mapa.zoomIn()
  }

  zoomOut() {
    this.mapa.zoomOut()
  }

  zoomCambio( valor: string ) {
    const valorNumber = +valor
    this.mapa.zoomTo( valorNumber )
  }

}
