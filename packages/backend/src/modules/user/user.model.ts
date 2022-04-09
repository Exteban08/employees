import { Field, Int, ObjectType } from "@nestjs/graphql";

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
    email: string;
    name: string;
    lastName: string;
    nationality: string;
    phone: string;
    birthday: Date;
    civilStatus: string;
}