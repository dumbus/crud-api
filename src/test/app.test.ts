import supertest from 'supertest';

import { server } from '../app/server';
import { StatusCodes } from '../app/utils/messages';

const baseUrl = '/api/users';

describe('First test scenario', () => {
    it('GET: get all users (an empty array is expected)', async () => {
        const serverResponse = await supertest(server).get(baseUrl);

        expect(serverResponse.statusCode).toEqual(200);
        expect(serverResponse.body).toEqual([]);
    })
});
