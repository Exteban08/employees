import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

@Resolver()
export class EmployeeResolver {
    constructor(private employeeService: EmployeeService) {}

    @Query(returns => Employee)
    async employee(@Args('id', { type: () => Int }) id: number) {
        return this.employeeService.findOne(id);
    }

    @Query(returns => [Employee])
    async employees() {
        return this.employeeService.findAll();
    }

    @Query(returns => [Employee])
    async searchEmployees(@Args('textSearch', { type: () => String }) textSearch: string) {
        return this.employeeService.search(textSearch);
    }
}
