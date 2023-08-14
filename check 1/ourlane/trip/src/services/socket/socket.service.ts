import DriverService from "../driver/index";
// import jwt from '../../middlewares/auth';

var socket;
module.exports = {
    SocketIO: async (io) => {
        try {
            console.log('socket started listening..');
            socket = io;
            io.on('connection', async (socket) => {
                try {
                    console.log('User Connected');
                    socket.on('joined', function (data) {
                        console.log(data);
                        socket.emit('acknowledge', 'Acknowledged');
                    });
                    // socket.use((socketObj, next) => {
                    //     jwt.verifyIo(socketObj, next);
                    // })
                    socket.on('DRIVER_LOCATION', async function (data) {
                        console.log('DRIVER_LOCATION---->', data);
                        if (data && data.locationName && data.latitude && data.longitude && data.id) {
                            const param = {
                                locationName: data.locationName,
                                addressLatitude: data.latitude,
                                addressLongitude: data.longitude
                            };
                            socket.emit('GET_GRIVER_LOCATION', data);
                            // this.sendTOClient('ACTIVE_TRIP', data)
                            await DriverService.updateDriverLocation(param, data.id)
                            //module.exports.sendTOClient(data.userId,data)
                            //socket.emit('test',)//please check identify
                            //io
                            /* socket.emit("abc")//Please check and idenity paricular user.


io("namespace").emit("abc1")

io(Rooms).emit("cdf")
how to send message using socket.id 
socket.broadcast.emit("abc") */
                        }
                    });

                    socket.on('chat message', function (msg) {
                        console.log('message: ' + msg);
                        socket.emit('response message', msg + '  from server');
                        //socket.broadcast.emit('response message', msg + '  from server');
                    });

                    socket.on('disconnect', function () {
                        console.log('socket disconnected!');

                    });

                } catch (error) {
                    console.log("Socket Exception :", error)
                    socket.disconnect()
                }


            });
        } catch (err) {
            console.log('init socket err  : ', err)
        }
    },

    sendTOClient: async (socketId, data) => {
        try {
            console.log('init socket data : ', data)
            socket.emit(socketId, data)
        } catch (err) {
            console.log('init socket err  : ', err)
        }
    }
}



