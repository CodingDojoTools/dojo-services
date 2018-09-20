import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';

import { PHONE_REGEXP } from '@app/utils';

import { Location, Stack } from '@facility/models';
import { User } from '@auth/models';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFormComponent implements OnChanges {
  @Input()
  location: Location;

  @Input()
  employees: string[];

  @Input()
  users: User[];

  @Input()
  stacks: Stack[];

  @Input()
  selectedStacks: string[];

  @Output()
  create = new EventEmitter<Location>();

  @Output()
  update = new EventEmitter<Location>();

  @Output()
  remove = new EventEmitter<Location>();

  @Output()
  cancel = new EventEmitter<void>();

  match = PHONE_REGEXP;
  exists = false;

  form = this.fb.group({
    city: ['', [Validators.required]],
    address: [''],
    alias: [''],
    phone: [''],
    stacks: [[]],
    employees: [[]],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges(_changes: SimpleChanges) {
    if (this.location) {
      this.form.patchValue(this.location);
      this.exists = true;
    }
  }

  selectStack(id: string) {
    this.selectedStacks = this.selected(id)
      ? this.selectedStacks.filter(_id => _id !== id)
      : [...this.selectedStacks, id];
  }

  selected(id: string): boolean {
    return this.selectedStacks.includes(id);
  }

  onCreate(form: NgForm) {
    const { value }: { value: Location } = form;

    this.create.emit(value);
  }

  onUpdate(form: NgForm) {
    const { value }: { value: Location } = form;

    console.log('form', form);

    this.update.emit({ ...this.location, ...value });
  }

  onRemove() {
    // confirm

    this.remove.emit(this.location);
  }

  onCancel() {
    this.cancel.emit();
  }
}
