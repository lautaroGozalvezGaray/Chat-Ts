import net from "net";
import ChatSeviceInterface from "../interface/ChatServiceInterface";
import consoleCustom from "../../../lib/consoleCustom";
import bufferToString from "../../../lib/bufferToString";
import formatForDuplicates from "../../../lib/formatForDuplicates";

export default class ChatService implements ChatSeviceInterface {
  minimumNumberOfUsers: number;
  maximumNumberOfUsers: number;
  usernames: string[];
  userList: string[] | object;
  offlineUsers: string[];
  sockets: string[] | any;
  port: number;

  constructor() {
    this.minimumNumberOfUsers = 2;
    this.maximumNumberOfUsers = 5;
    this.usernames = [];
    this.userList = [];
    this.offlineUsers = [];
    this.sockets = [];
    this.port = 4000;
  }

  start(): void {
    process.stdout.write(
      `▸ Allowed ${this.minimumNumberOfUsers} to ${this.maximumNumberOfUsers} users. \n▸ Write: username + Intro. \n▸ Confirm: Press two times Intro.\n▸ Run sudo nc localhost {port_number} \n\n`
    );
    process.stdin.on("data", (data: string): void => {
      const incomingUsername: string = bufferToString(data);
      this.usernames.push(incomingUsername);

      if (incomingUsername === "") {
        if (this.usernames.length === this.minimumNumberOfUsers) {
          process.exit();
        } else {
          this.usernames.pop();
          this.configForDuplicates();
        }
      }
    });
  }

  private configForDuplicates(): void {
    this.userList = formatForDuplicates(this.usernames);
    this.chat();
  }

  private chat(): void {
    const list: string[] | any = this.userList;
    net
      .createServer()
      .on("connection", (client: any): void => {
        this.sockets.push(client);

        if (list.length === 0) {
          consoleCustom.error("error trying to access room");
          this.sockets.pop();
          client.destroy();
        }

        if (list.length !== 0) {
          client.username = list.shift();
          consoleCustom.ok(`${client.username} is online`);

          client.on("data", (data: any): void => {
            for (let i = 0; i < this.sockets.length; i++) {
              if (this.sockets[i] === client) continue;
              this.sockets[i].write(`${client.username}: ${data}`);
            }
          });
        }
        client.on("end", (): void => {
          consoleCustom.error(`${client.username} is offline`);
          this.offlineUsers.push(client.username);
          if (this.offlineUsers.length === this.sockets.length) {
            consoleCustom.error("\nfinished service");
            process.exit();
          }
        });
      })
      .listen(this.port, () => {
        process.stdin.pause();
        consoleCustom.ok(`Room ${this.port} open`);
        consoleCustom.warning("press ctrl+c to exit");
      });
  }
}
