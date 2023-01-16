import supertest from 'supertest';

import { server } from '../app/server';
import { ErrorMessages } from '../app/utils/messages';
import { IUser } from '../app/utils/types';

const baseUrl = '/api/users';

describe('First test scenario: default operations', () => {
    const mockUser: IUser = {
        username: 'mockUser',
        age: 0,
        hobbies: ['hobbie']
    }

    it('GET: get all users (an empty array is expected)', async () => {
        const serverResponse = await supertest(server).get(baseUrl);

        expect(serverResponse.statusCode).toEqual(200);
        expect(serverResponse.body).toEqual([]);
    });

    it('POST: create a new user (a response containing newly created record is expected)', async () => {
        const serverResponse = await supertest(server).post(baseUrl).send(mockUser);

        expect(serverResponse.statusCode).toEqual(201);
        mockUser.id = serverResponse.body.id;
        expect(serverResponse.body.username).toEqual(mockUser.username);
        expect(serverResponse.body.age).toEqual(mockUser.age);
        expect(serverResponse.body.hobbies).toEqual(mockUser.hobbies);
    });

    it('GET: get user by id (the created record is expected)', async () => {
        const serverResponse = await supertest(server).get(`${baseUrl}/${mockUser.id}`);

        expect(serverResponse.statusCode).toEqual(200);
        expect(serverResponse.body.username).toEqual(mockUser.username);
        expect(serverResponse.body.age).toEqual(mockUser.age);
        expect(serverResponse.body.hobbies).toEqual(mockUser.hobbies);
    });

    it('PUT: update the user (a response is expected containing an updated object with the same id)', async () => {
        mockUser.username = 'updatedMockUser'
        const serverResponse = await supertest(server).put(`${baseUrl}/${mockUser.id}`).send(mockUser);

        expect(serverResponse.statusCode).toEqual(200);
        expect(serverResponse.body.username).toEqual(mockUser.username);
        expect(serverResponse.body.age).toEqual(mockUser.age);
        expect(serverResponse.body.hobbies).toEqual(mockUser.hobbies);
    });

    it('DELETE: delete the user (a status code of deletion is expected)', async () => {
        const serverResponse = await supertest(server).delete(`${baseUrl}/${mockUser.id}`);

        expect(serverResponse.statusCode).toEqual(204);
    });

    it('GET: get deleted user (expected answer is that there is no such object)', async () => {
        const serverResponse = await supertest(server).get(`${baseUrl}/${mockUser.id}`);

        expect(serverResponse.statusCode).toEqual(404);
        expect(serverResponse.body.message).toEqual(ErrorMessages.notFound);
    });

    describe('Second test scenario: unexpected user formats', () => {
        const mockUserWithWrongHobbiesFormat = {
            username: 'mockUser',
            age: 0,
            hobbies: [1234]
        };

        const mockUserWithWrongAgeFormat = {
            username: 'mockUser',
            age: '',
            hobbies: ['hobbie']
        };

        const mockUserWithAdditionalFields = {
            username: 'mockUser',
            age: '',
            hobbies: ['hobbie'],
            additional: 'additional'
        };

        const mockUserEmpty = { };

        it('POST: try to add user with wrong HOBBIES format (expected wrong body format error)', async () => {
            const serverResponse = await supertest(server).post(baseUrl).send(mockUserWithWrongHobbiesFormat);

            expect(serverResponse.statusCode).toEqual(400);
            expect(serverResponse.body.message).toEqual(ErrorMessages.invalidRequiredFields);
        });

        it('POST: try to add user with wrong AGE format (expected wrong body format error)', async () => {
            const serverResponse = await supertest(server).post(baseUrl).send(mockUserWithWrongAgeFormat);

            expect(serverResponse.statusCode).toEqual(400);
            expect(serverResponse.body.message).toEqual(ErrorMessages.invalidRequiredFields);
        });

        it('POST: try to add user with ADDITIONAL FIELDS (expected wrong body format error)', async () => {
            const serverResponse = await supertest(server).post(baseUrl).send(mockUserWithAdditionalFields);

            expect(serverResponse.statusCode).toEqual(400);
            expect(serverResponse.body.message).toEqual(ErrorMessages.invalidRequiredFields);
        });

        it('POST: try to add an EMPTY user (expected wrong body format error)', async () => {
            const serverResponse = await supertest(server).post(baseUrl).send(mockUserEmpty);

            expect(serverResponse.statusCode).toEqual(400);
            expect(serverResponse.body.message).toEqual(ErrorMessages.invalidRequiredFields);
        });

        it('GET: get all users (an empty array is expected)', async () => {
            const serverResponse = await supertest(server).get(baseUrl);
    
            expect(serverResponse.statusCode).toEqual(200);
            expect(serverResponse.body).toEqual([]);
        });
    });
});
