import * as dotenv from 'dotenv';
import { createServer } from 'node:http';
import { requestListener } from './requestListener';
import { checkMultiMode } from './utils/checkMultiMode';

dotenv.config();

const port = process.env.PORT || 4000;
const server = createServer(requestListener);

const isMultiMode = checkMultiMode();

const startServer = () => {
    if (isMultiMode) {
        // balancer
        console.log('balancer');
    } else {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    }
} 

export { startServer, server };
