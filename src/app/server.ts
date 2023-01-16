import * as dotenv from 'dotenv';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';
import { createServer, request, IncomingMessage, ServerResponse } from 'node:http';

import { requestListener } from './requestListener';
import { checkMultiMode } from './utils/checkMultiMode';
import { databaseController } from './controllers/databaseController';
import { IMessage } from './utils/types';

dotenv.config();

const port = +process.env.PORT || 4000;
const server = createServer(requestListener);

const isMultiMode = checkMultiMode();

const startServer = () => {
    if (isMultiMode) {
        const cpuCount = cpus().length;
        let currentWorkerPort = port + 1;
        
        if (cluster.isPrimary) {
            console.log(`Primary ${process.pid} is running on port ${port}`);
            console.log(`Please, wait for workers to start, you will see ${cpuCount} messages`);
            console.log('Format of messages will be: Worker ${worker pid} is running on port ${worker port}');

            const primaryServer = createServer((primaryRequest: IncomingMessage, primaryResponse: ServerResponse) => {
                const requestOptions = {
                    hostname: 'localhost',
                    port: currentWorkerPort,
                    path: primaryRequest.url,
                    method: primaryRequest.method,
                    headers: primaryRequest.headers
                };

                const proxy = request(requestOptions, (proxyResponse) => {
                    primaryResponse.writeHead(proxyResponse.statusCode, proxyResponse.headers);

                    proxyResponse.pipe(primaryResponse, {
                        end: true
                    });

                    if (currentWorkerPort === port + cpuCount) {
                        currentWorkerPort = port + 1;
                    } else {
                        currentWorkerPort += 1;
                    }
                });

                primaryRequest.pipe(proxy, {
                    end: true
                });
            });
            
            primaryServer.listen(port);

            for (let i = 0; i < cpuCount; i++) {
                cluster.fork({ WORKER_PORT: port + 1 + i });
            }

            cluster.on('message', (worker, msg: IMessage) => {
                const newDatabase = msg.newDatabase;
                const newestWorkerPid = worker.process.pid;

                for(const i in cluster.workers) {
                    if (cluster.workers[i].process.pid !== newestWorkerPid) {
                        cluster.workers[i].process.send({ newDatabase });
                    }
                }
            });

            cluster.on('exit', (worker) => {
                console.log(`Worker ${worker.process.pid} died`);
            });

            process.on('SIGINT', () => {
                primaryServer.close(() => process.exit());
            });
        }
        
        if (cluster.isWorker) {
            process.on('message', (msg: IMessage) => {
                const newDatabase = msg.newDatabase;
                databaseController.updateDatabase(newDatabase);
            });

            const workerPort = +process.env.WORKER_PORT;
            const workerServer = createServer(requestListener);

            console.log(`Worker ${process.pid} is running on port ${workerPort}`);
            workerServer.listen(workerPort);

            workerServer.on('request', (req: IncomingMessage, res: ServerResponse) => {
                console.log(`Request was sent from load-balancer to worker ${process.pid}, port: ${workerPort}`);

                res.on('finish', () => {
                    const currentDatabase = databaseController.getAllUsers();
                    process.send({ newDatabase: currentDatabase });
                });
            });
        }
    } else {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    }
} 

export { startServer, server, port };
