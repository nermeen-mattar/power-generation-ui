import { Component, EventEmitter, Output } from '@angular/core';
import { USState } from 'src/app/models/us-state.model';
import { US_STATES } from 'src/app/constants/us-states';

@Component({
  selector: 'app-plant-power-filter',
  templateUrl: './plant-power-filter.component.html',
  styleUrls: ['./plant-power-filter.component.scss'],
})
export class PlantPowerFilterComponent {
  states: USState[] = US_STATES;

  selectedState: USState = this.states[0];

  @Output() stateChanged: EventEmitter<string> = new EventEmitter<string>();

  onStateChange() {
    this.stateChanged.emit(this.selectedState.code);
  }
}
