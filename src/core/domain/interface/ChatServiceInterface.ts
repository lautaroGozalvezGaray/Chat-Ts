export default interface ChatSeviceInterface {
  minimumNumberOfUsers: number;
  maximumNumberOfUsers: number;
  usernames: string[];
  userList: string[] | object;
  offlineUsers: string[];
  sockets: string[] | any;
  port: number;
}
