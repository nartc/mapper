import { AutoMap } from '@automapper/classes';

export class SimpleUser {
    @AutoMap()
    firstName!: string;
    @AutoMap()
    lastName!: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
