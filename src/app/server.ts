import * as dotenv from 'dotenv';
import { createServer } from 'node:http';
import { requestListener } from './requestListener';
import { checkMultiMode } from './utils/checkMultiMode';

dotenv.config();

const port = process.env.PORT || 3000;
const server = createServer(requestListener);

const isMultiMode = checkMultiMode();

let startServer;

if (isMultiMode) {
    // balancer
    startServer = () => console.log('balancer');
} else {
    startServer = () => {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    }
}

 

export { startServer, server };
