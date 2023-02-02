import { v4 } from 'uuid';
import { IUser } from '../utils/types';

const databaseController = {
    database: [],

    getAllUsers(): IUser[] {
        return this.database;
    },

    getUser(userId: string): IUser {
        return this.database.find((user: IUser) => user.id === userId);
    },

    createUser(userProperties: IUser): IUser {
        const { username, age, hobbies } = userProperties;
        const uuid = v4();
        const newUser = { id: uuid, username, age, hobbies };
        this.database.push(newUser);

        return newUser;
    },

    updateUser(userId: string, userProperties: IUser): IUser {
        const { username, age, hobbies } = userProperties;
        const indexOfUser = this.database.findIndex(user => user.id === userId);
        const updatedUser = { id: userId, username, age, hobbies };
        this.database[indexOfUser] = updatedUser;

        return updatedUser;
    },

    deleteUser(userId: string): void {
        const indexOfUser = this.database.findIndex(user => user.id === userId);
        this.database.splice(indexOfUser, 1);
    },

    updateDatabase(newDatabase: IUser[]): void {
        this.database = newDatabase;
    }
};

export { databaseController };
