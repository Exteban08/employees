import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthenticationError } from 'apollo-server-express';
import { User } from 'modules/user/user.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(returns => User)
  async login(
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    const result = await this.authService.validateUser(username, password);

    if (result) return result;

    throw new AuthenticationError(
      'Could not log-in with the provided credentials',
    );
  }
}
