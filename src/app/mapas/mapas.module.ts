import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';

import { MinMapaComponent } from './components/min-mapa/min-mapa.component';
import { FullscreenComponent } from './pages/fullscreen/fullscreen.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';


@NgModule({
  declarations: [
    MinMapaComponent,
    FullscreenComponent,
    ZoomRangeComponent,
    PropiedadesComponent,
    MarcadoresComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
