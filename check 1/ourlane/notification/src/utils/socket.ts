/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import * as socket from 'socket.io';
import logger from '../utils/logger';
import TokenHandler from '../middlewares/auth';
import RedisCache from '../utils/cache';
import { cache } from '../config/constants';
export default class SocketConnection {
    public static notificationIO;

    public static IOeditAgreement;

    static init(httpServer) {
        this.notificationIO = this.socketConnectionForNotifications(httpServer);
    }

    static getNotificationIO() {
        return this.notificationIO;
    }

    static exitHandler(options) {
        if (options.IOeditAgreement) {
            this.disconnectAllSocket(options.IOeditAgreement);
        }
    }

    static disconnectAllSocket(io) {
        const sockets = Object.values(io.of('/').connected);
        sockets.forEach((s: any) => {
            s.disconnect(true);
        });
    }

    static socketConnectionForNotifications(httpServer) {
        const IO: any = socket(httpServer, {
            // path: '/notification'
        });

        IO.use((socketObj, next) => {
            TokenHandler.verifyIo(socketObj, next);
        });

        IO.on('connection', async (socketObj) => {
            await RedisCache.lPush(cache.notification_socket, socketObj.decoded.uuid, socketObj.id);

            socketObj.on('disconnect', async (data) => {
                await RedisCache.lRem(cache.notification_socket, socketObj.decoded.uuid, socketObj.id);
            });

        });

        IO.on('error', (err) => {
            logger.error(`[METHOD]: [socketConnectionForNotifications] ${err}`);
        });
        return IO;
    }
}


// export default (io) => {
//     io.sockets.on('connection', (socket) => {
//         console.log('socket connected');
//         io.emit('newNotification', "newNotification");
//     });
// };
