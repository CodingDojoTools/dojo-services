import { Injectable } from '@angular/core';

import { Stack } from '@facility/models';
import { BaseService } from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class StackService extends BaseService<Stack> {
  protected readonly resource = 'stacks';
}
