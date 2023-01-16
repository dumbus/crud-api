import { v4 } from 'uuid';
import { IUser } from '../utils/types';

export const database = [];

const databaseController = {
    getAllUsers(): IUser[] {
        return database;
    },

    getUser(userId: string): IUser {
        return database.find((user: IUser) => user.id === userId);
    },

    createUser(userProperties: IUser): IUser {
        const { username, age, hobbies } = userProperties;
        const uuid = v4();
        const newUser = { id: uuid, username, age, hobbies };
        database.push(newUser);

        return newUser;
    },

    updateUser(userId: string, userProperties: IUser): IUser {
        const { username, age, hobbies } = userProperties;
        const indexOfUser = database.findIndex(user => user.id === userId);
        const updatedUser = { id: userId, username, age, hobbies };
        database[indexOfUser] = updatedUser;

        return updatedUser;
    },

    deleteUser(userId: string): void {
        const indexOfUser = database.findIndex(user => user.id === userId);
        database.splice(indexOfUser, 1);
    }
};

export { databaseController };
