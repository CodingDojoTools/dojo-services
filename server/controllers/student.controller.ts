import { BaseController } from './base.controller';
import { StudentModel, Student } from '../models';

export class StudentController extends BaseController {
  constructor(model: StudentModel) {
    super(model);
  }
}

export const studentController = new StudentController(Student);
