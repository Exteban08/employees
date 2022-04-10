import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'modules/user/user.module';
import { EmployeeModule } from 'modules/employee/employee.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EmployeeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
