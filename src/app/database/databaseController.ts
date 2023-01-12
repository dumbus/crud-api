import { v4 } from 'uuid';
import { IUser, IUserProperties } from '../utils/types';
import * as database from './database.json';

const databaseController = {
    getAllUsers(): IUser[] {
        return database;
    },

    getUser(userId: string): IUser {
        return database.find((user: IUser) => user.id === userId);
    },

    createUser(userProperties: IUserProperties): IUser {
        const uuid = v4();
        const newUser = { id: uuid, ...userProperties };
        database.push(newUser);

        return newUser;
    },

    updateUser(userId: string, userProperties: IUserProperties): IUser {
        const indexOfUser = database.findIndex(user => user.id === userId);
        const updatedUser = { id: userId, ...userProperties };
        database[indexOfUser] = updatedUser;

        return updatedUser;
    },

    deleteUser(userId: string): void {
        const indexOfUser = database.findIndex(user => user.id === userId);
        database.splice(indexOfUser, 1);
    }
};

export { databaseController };
