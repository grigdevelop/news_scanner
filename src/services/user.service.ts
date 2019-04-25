import {User} from "../entities/user";

const users : User[] = [
    {
        id: 1,
        username: 'test',
        passwordHash: 'test'
    }
];

class UserService {

    async getUserByUsernameAndPassword(username: string, password: string) : Promise<User> {
        return users.find(u => u.username == username && u.passwordHash == password);
    }

    async getUserById(id: number) : Promise<User> {
        return users.find(u => u.id == id);
    }

}

export { UserService };