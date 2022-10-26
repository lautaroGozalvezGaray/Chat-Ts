import ChatService from "../domain/model/ChatService";

const service = new ChatService();

export default () => service.start();
