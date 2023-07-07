import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import * as maplibregl from "maplibre-gl"
import * as MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode'
import { MaphelperService } from '../maphelper.service';

@Component({
  selector: 'app-map-common',
  templateUrl: './map-common.component.html',
  styleUrls: ['./map-common.component.css']
})
export class MapCommonComponent implements OnInit {

  @Input() map: any
  draw: any
  @Output() EmitMap: EventEmitter<any> = new EventEmitter<any>()
  @Output() DrawEmit: EventEmitter<any> = new EventEmitter<any>()

  constructor(private mapHelperService:MaphelperService) {

  }

  ngOnInit(): void {


    const modes = MapboxDraw.modes;
    modes.draw_rectangle = DrawRectangle;
    // modes.draw_circle  = CircleMode;
    // modes.drag_circle  = DragCircleMode;
    // modes.direct_select =  DirectMode,
    // modes.simple_select= SimpleSelectMode;
    // modes.draw_freehand_line = FreehandLineMode;
    // modes.draw_freeHand = FreehandMode;

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      modes: Object.assign(MapboxDraw.modes, {
        // draw_freeHand: FreehandMode
        // modes: modes,
      })
    });

    this.map = new maplibregl.Map({
      container: 'map',
      // style: 'https://demotiles.maplibre.org/style.json',
      // style: 'mapbox://styles/mapbox/light-v10',
      // style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      style: 'https://api.maptiler.com/maps/basic/style.json?key=CpAaP3JzgQiknlO3KK7u',
      //style: 'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',

      center: [78.96, 20.59], // starting position [lng, lat]
      zoom: 3  // starting zoom
    })

    this.map.addControl(new maplibregl.NavigationControl({}), 'bottom-right');
    this.map.addControl(this.draw);



    this.map.on('load', () => {

      const start = {
        center: [80, 36],
        zoom: 1,
        pitch: 0,
        bearing: 0
      };
      const end = {
        // center: [74.5, 40],
        // zoom: 2
        center: [8.11862, 46.58842],
        zoom: 12.5,
        bearing: 130,
        pitch: 75
      };

      this.map.flyTo({
        ...start, // Fly to the selected target
        duration: 12000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
      });

      this.DrawEmit.emit(this.draw)
      this.EmitMap.emit(this.map)


      // this.map.on('click', (e) => {

      //   this.mapHelperService.OnClickHighlightedFeature(this.map,e)

      // })

    })

    


  }

}
