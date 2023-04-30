import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number]
}

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
  //Array de marcadores
  marcadores: MarcadorColor[] = [];

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
  });

  this.leerLocalStorage();

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

    // const marcadorColor: MarcadorColor = {
    //   color: colorAleatorio,
    //   marker: nuevoMarcador
    // }

    this.marcadores.push({
      color: colorAleatorio,
      marker: nuevoMarcador
    });
    

    this.guardarMarcadoresEnLocalStorage( )

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresEnLocalStorage()
    })
    
  }

  irMarcador(marker : mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  guardarMarcadoresEnLocalStorage( ) {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(( marcadorCompleto ) => {

      const color = marcadorCompleto.color;
      const { lng,lat } = marcadorCompleto.marker!.getLngLat();
      
      lngLatArr.push({
        color: color,
        center: [ lng, lat]
      })
      
    })
    
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
    console.log('Se disparo el metodo guardarMarcadoresEnLocalStorage');
  }

  leerLocalStorage() {

    if( !localStorage.getItem( 'marcadores' ) ) {
      return;
    }

    const lnglatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!) 

    lnglatArr.forEach( (marker) => {
      const newMarker = new mapboxgl.Marker({
        color: marker.color,
        draggable: true,
      })
      .setLngLat(marker.center!)
      .addTo( this.mapa )

      this.marcadores.push({
        marker: newMarker,
        color: marker.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresEnLocalStorage()
      })
    });


  }

  borrarMarcador( index: number ) {
    this.marcadores[index].marker?.remove();
    this.marcadores.splice( index, 1);
    this.guardarMarcadoresEnLocalStorage();
  }

}
