import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { US_STATES_POSITIONS } from 'src/app/constants/us-states';
import { Filter } from 'src/app/models/filter.model';
import { Generator } from 'src/app/models/generator.model';
import { HttpService } from 'src/services/http.service';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: any;

  filteredPowerPlants$: Observable<Generator[]> = of([]);
  selectedPlant?: Generator;
  error: boolean = false;

  center: google.maps.LatLngLiteral = {
    lat: 39.81243465853298,
    lng: -101.19603608802689,
  };
  mapOptions: google.maps.MapOptions = {
    zoom: 4,
    disableDefaultUI: true,
  };
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  loading: boolean = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.updateMap();
  }

  updateMap(filter: Filter = { state: '', topPlants: undefined }) {
    this.loading = true;
    this.error = false;
    this.filteredPowerPlants$ = this.httpService
      .get(`plants?limit=${filter?.topPlants || ''}&state=${filter.state}`)
      .pipe(
        finalize(() => {
          this.setMarkerPositions(filter.state);
          this.loading = false;
        }),
        catchError(() => {
          this.loading = false;
          this.error = true;
          return of([]);
        })
      );
  }

  setMarkerPositions(state: string) {
    this.center =
      US_STATES_POSITIONS[state as keyof typeof US_STATES_POSITIONS];
  }

  getMarkerTitle(plant: Generator): string {
    return `${plant['Plant name']}\nNet Generation: ${
      plant['Generator annual net generation (MWh)']
    } MWh\nPercentage: ${plant['Percentage']}%`;
  }

  filterPowerPlants(filterUpdate: Filter) {
    this.updateMap(filterUpdate);
  }

  openInfoWindow(marker: MapMarker, selectedPlant: Generator) {
    this.selectedPlant = selectedPlant;
    this.infoWindow.open(marker);
  }
}
