const registerSocketEvents = (socket) => {

    socket.on('join:chatroom', (chatroom) => {
        socket.leaveAll();
        socket.join(chatroom);
    });

    socket.on('start:typing', ({ chatroom, user, typing }) => {
        socket.to(chatroom).emit('start:typing', {
            user, typing
        });
    });

    socket.on('stop:typing', (chatroom) => {
        socket.to(chatroom).emit('stop:typing');
    });

    socket.on('disconnect', () => {
        socket.disconnect(true)
    });
};

export default registerSocketEvents;
