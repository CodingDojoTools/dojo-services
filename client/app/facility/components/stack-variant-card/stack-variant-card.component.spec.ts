import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackVariantCardComponent } from './stack-variant-card.component';

describe('StackVariantCardComponent', () => {
  let component: StackVariantCardComponent;
  let fixture: ComponentFixture<StackVariantCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackVariantCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackVariantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
