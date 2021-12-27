import { Server, Socket } from 'socket.io';
import Chat from '@/models/chat';

/*
 * chat - register 'chat:message' event to socket
 */

export enum MessageEnum {
  NEW = 'new',
  MEMBERS = 'members',
  MESSAGE = 'message',
  OUT = 'out',
}

type messageType = {
  type: MessageEnum;
  message: string;
  date: string;
};

export const chatListener = (io: Server, socket: Socket): void => {
  socket.on('chat:message', async (message: messageType) => {
    await Chat.create({
      type: MessageEnum.MESSAGE,
      message: message.message,
      username: socket.user.sparcs_id,
      date: message.date,
    });
    socket.broadcast.emit('chat:message', socket.user.sparcs_id, message); // 유저가 chat message 로 메시지를 socket에게 보냄 -> 전체에게 메시지 뿌려줌
  });
};
