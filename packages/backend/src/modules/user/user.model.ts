import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CivStatus } from "@prisma/client";

enum CivilStatus {
    MARRIED = 'MARRIED',
    SINGLE = 'SINGLE',
    DIVORCED = 'DIVORCED',
    OTHER = 'OTHER',
};

@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field()
    email: string;
    name: string;
    lastName: string;
    nationality: string;
    phone: string;
    birthday: string;
    civilStatus: string;
}