import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackVariantsComponent } from './stack-variants.component';

describe('StackVariantsComponent', () => {
  let component: StackVariantsComponent;
  let fixture: ComponentFixture<StackVariantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackVariantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
