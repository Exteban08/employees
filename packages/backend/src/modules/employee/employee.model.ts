import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Employee {
    @Field(type => Int)
    id: number;
    email: string;
    name: string;
    lastName: string;
    nationality: string;
    phone: string;
    civilStatus: string;
    birthday: Date;
    createdAt: Date;
    updatedAt: Date;
}
