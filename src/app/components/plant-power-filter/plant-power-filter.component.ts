import { Component, EventEmitter, Output } from '@angular/core';
import { USState } from 'src/app/models/us-state.model';
import { US_STATES } from 'src/app/constants/us-states';

export interface Filter {
  state: string;
  topPlants?: number;
}

@Component({
  selector: 'app-plant-power-filter',
  templateUrl: './plant-power-filter.component.html',
  styleUrls: ['./plant-power-filter.component.scss'],
})
export class PlantPowerFilterComponent {
  states: USState[] = US_STATES;

  selectedState: USState = this.states[0];
  selectedTopPlants?: number;

  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter<Filter>();

  onFilterChange() {
    this.filterChanged.emit({
      state: this.selectedState.code,
      topPlants: this.selectedTopPlants,
    });
  }
}
