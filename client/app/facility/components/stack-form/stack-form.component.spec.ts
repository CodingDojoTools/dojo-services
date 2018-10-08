import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackFormComponent } from './stack-form.component';

describe('StackFormComponent', () => {
  let component: StackFormComponent;
  let fixture: ComponentFixture<StackFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
