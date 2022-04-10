import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'providers/prisma.service';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [],
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService],
})
export class UserModule {}
