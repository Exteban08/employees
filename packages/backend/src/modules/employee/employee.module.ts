import { Module } from '@nestjs/common';
import { PrismaService } from 'providers/prisma.service';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';

@Module({
  controllers: [],
  providers: [EmployeeService, EmployeeResolver, PrismaService]
})
export class EmployeeModule {}
