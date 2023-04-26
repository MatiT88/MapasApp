import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .list-group {
      position: fixed;
      right: 20px;
      top: 20px;
      z-index: 99;
    } 

    .pointer{
      cursor: pointer;
    }
  `]
})
export class MarcadoresComponent implements AfterViewInit{
  
  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-58.452524523106156,-34.57964978125058 ];

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
  });

  // const markerHtml: HTMLElement = document.createElement('div');
  // markerHtml.innerHTML = 'Hola Mundo';

  // const marker = new mapboxgl.Marker()
  //   .setLngLat( this.center )
  //   .addTo( this.mapa )


  }

  agregarMarcador() {

    const colorAleatorio = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: colorAleatorio
    })
      .setLngLat( this.center )
      .addTo( this.mapa )
  }

  irMarcador() {
    console.log('IrMarcador funciona bien');
  }

}
