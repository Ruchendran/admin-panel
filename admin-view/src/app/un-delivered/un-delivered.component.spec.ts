import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnDeliveredComponent } from './un-delivered.component';

describe('UnDeliveredComponent', () => {
  let component: UnDeliveredComponent;
  let fixture: ComponentFixture<UnDeliveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnDeliveredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
