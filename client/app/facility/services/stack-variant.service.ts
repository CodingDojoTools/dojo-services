import { Injectable } from '@angular/core';

import { BaseService } from '@app/core';
import { StackVariant } from '@facility/models';

@Injectable({
  providedIn: 'root',
})
export class StackVariantService extends BaseService<StackVariant> {
  protected readonly resource = 'stack_variants';
}
