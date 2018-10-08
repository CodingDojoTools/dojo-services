import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackVariantComponent } from './stack-variant.component';

describe('StackVariantComponent', () => {
  let component: StackVariantComponent;
  let fixture: ComponentFixture<StackVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
