import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { US_STATES_POSITIONS } from 'src/app/constants/us-states';
import { Filter } from 'src/app/models/filter.model';
import { Generator } from 'src/app/models/generator.model';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: any;
  @ViewChild(MapInfoWindow) infoWindow: any;

  filteredPowerPlants: Generator[] = [];
  selectedPlant?: Generator;

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

  /**
   * Updates the map by fetching power plant data based on the provided filter.
   * If no filter is provided, it displays all power plants.
   *
   * This implementation offers users the flexibility to filter power plants based on their preferences. 
   * They can choose to view all power plants in the US or narrow down the results by selecting the top plants
   * in a specific state. Additionally, users have the option to filter by the top plants across all states in the US.
   * 
   * @param filter The filter object containing state and topPlants information.
   *               It is intended to Pass an empty state and topPlants to display all power plants initially.
 */
  updateMap(filter: Filter = { state: '', topPlants: undefined }) {
    this.loading = true;
    this.httpService.get(`plants?limit=${filter?.topPlants || ''}&state=${filter.state}`).subscribe(
      (data) => {
        this.filteredPowerPlants = data;
        this.setMarkerPositions(filter.state);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching power plant data:', error);
        this.loading = false;
      },
    );
  }

  setMarkerPositions(state: string) {
    this.center = US_STATES_POSITIONS[
        state as keyof typeof US_STATES_POSITIONS
      ];
  }

  getMarkerTitle(plant: Generator): string {
    return `${plant['Plant name']}\nNet Generation: ${plant['Generator annual net generation (MWh)']} MWh\nPercentage: ${plant['Percentage']}%`;
  }

  filterPowerPlants(filterUpdate: Filter) {
    this.updateMap(filterUpdate);
  }

  openInfoWindow(marker: MapMarker, selectedPlant: Generator) {
    this.selectedPlant = selectedPlant;
    this.infoWindow.open(marker);
  }
}
