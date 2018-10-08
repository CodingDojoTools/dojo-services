import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackVariantFormComponent } from './stack-variant-form.component';

describe('StackVariantFormComponent', () => {
  let component: StackVariantFormComponent;
  let fixture: ComponentFixture<StackVariantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackVariantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackVariantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
