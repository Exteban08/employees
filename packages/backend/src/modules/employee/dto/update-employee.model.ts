import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
