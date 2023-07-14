import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantPowerInfoComponent } from './plant-power-info.component';

describe('PlantPowerInfoComponent', () => {
  let component: PlantPowerInfoComponent;
  let fixture: ComponentFixture<PlantPowerInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantPowerInfoComponent],
    });
    fixture = TestBed.createComponent(PlantPowerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
