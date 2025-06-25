const registerSocketEvents = (socket) => {

    socket.on('join:chatroom', (chatroom) => {
        socket.leaveAll();
        socket.join(chatroom);
    });

    socket.on('typing', ({ chatroom, user }) => {
        socket.to(chatroom).emit('typing...', user);
    });

    socket.on('disconnect', () => {
        socket.disconnect(true)
    });
};

export default registerSocketEvents;
