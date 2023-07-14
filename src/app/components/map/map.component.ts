import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { US_STATES_POSITIONS } from 'src/app/constants/us-states';
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

  powerPlantsData: Generator[] = [];
  selectedPlant?: Generator;
  selectedState?: string;

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
    this.initializeMap();
  }

  initializeMap() {
    this.loading = true;
    this.httpService.get(`plants/top/${10}`).subscribe(
      (data) => {
        this.powerPlantsData = data;
        this.setMarkerPositions();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching power plant data:', error);
        this.loading = false;
      },
    );
  }

  setMarkerPositions() {
    this.powerPlantsData.forEach((plant: Generator) => {
      plant['Position'] =
        US_STATES_POSITIONS[
          plant['Plant state abbreviation'] as keyof typeof US_STATES_POSITIONS
        ];
    });
  }

  getMarkerTitle(plant: Generator): string {
    return `${plant['Plant name']}\nNet Generation: ${plant['Generator annual net generation (MWh)']} MWh\nPercentage: ${plant['Percentage']}%`;
  }

  onStateChange(state: string) {
    this.selectedState = state;
    this.filterByState();
  }

  filterByState() {
    this.loading = true;
    this.httpService.get(`plants/state/${this.selectedState}`).subscribe(
      (data) => {
        this.powerPlantsData = data;
        this.setMarkerPositions();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching power plant data:', error);
        this.loading = false;
      },
    );
  }

  openInfoWindow(marker: MapMarker, selectedPlant: Generator) {
    this.selectedPlant = selectedPlant;
    this.infoWindow.open(marker);
  }
}
