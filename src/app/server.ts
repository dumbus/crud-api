import * as dotenv from 'dotenv';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';
import { createServer } from 'node:http';

import { requestListener } from './requestListener';
import { checkMultiMode } from './utils/checkMultiMode';

dotenv.config();

const port = +process.env.PORT || 4000;
const server = createServer(requestListener);

const isMultiMode = checkMultiMode();

const startServer = () => {
    if (isMultiMode) {
        const cpuCount = cpus().length;
        

        if (cluster.isPrimary) {
            console.log(`Primary ${process.pid} is running on port ${port}`);



            for (let i = 0; i < cpuCount; i++) {
                cluster.fork({ WORKER_PORT: port + 1 + i });
            }

            cluster.on('exit', (worker) => {
                console.log(`Worker ${worker.process.pid} died`);
            });
        }
        
        if (cluster.isWorker) {
            const workerPort = +process.env.WORKER_PORT;

            console.log(`Worker ${process.pid} started on port ${workerPort}`);
        }
        
    } else {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    }
} 

export { startServer, server, port };
