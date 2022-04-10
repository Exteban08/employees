import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.model";

@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(returns => User)
    async user(@Args('id', { type: () => Int }) id: number) {
        return this.userService.findOne({ id });
    }
}
