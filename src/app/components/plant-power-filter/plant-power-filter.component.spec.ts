import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantPowerFilterComponent } from './plant-power-filter.component';

describe('PlantPowerFilterComponent', () => {
  let component: PlantPowerFilterComponent;
  let fixture: ComponentFixture<PlantPowerFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantPowerFilterComponent],
    });
    fixture = TestBed.createComponent(PlantPowerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
