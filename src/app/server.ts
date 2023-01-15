import * as dotenv from 'dotenv';
import { createServer } from 'node:http';
import { requestListener } from './requestListener';

dotenv.config();

const port = process.env.PORT || 3000;
export const server = createServer(requestListener);

const startServer = () => {
    server.listen(port, () => console.log(`Server started on port ${port}`));
}

export { startServer };
