const registerSocketEvents = (socket) => {

    socket.on('chatroom', (chatroom) => {
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
