const fs = require("fs");
const net = require("net");
const user = require("./user");

var adminSocket = null;

const ARGS_MISSING = "args_missing";
const WRONG_PASSWORD = "wrong_password";
const AUTH_SUCCESS = "auth_success";
const SOCKET_BUSY = "socket_busy";

exports.main = () =>
{
    return;
    const server = new net.Server();
    server.listen(6662);

    server.on("connection", (socket) =>
    {
        socket.on("data", (data) => 
        {
            const args = data.toString().split(" ");
            if (args[0] == "auth")
            {
                if (adminSocket != null) return socket.write(SOCKET_BUSY);
                if (args.length < 1) return socket.write(ARGS_MISSING);
                if (args[1] !== "okboomer666")
                {
                    return socket.write(WRONG_PASSWORD);
                } else
                {
                    adminSocket = socket;
                    return socket.write(AUTH_SUCCESS);
                }
            }

            if (socket == adminSocket)
            {
                //todo maybe send entire data in order, e.g. coins;ip and so on
                //? instead of requesting get multiple times, its basically impossible to tank it because its only 1 user
                if (args[0] == "get")
                {
                    if (args.length < 3) return socket.write(ARGS_MISSING);
                    return socket.write(user.get(args[1], args[2]).toString());
                }
            }

            socket.write("no_auth");
        });

        socket.on('error', () =>
        {
            if (socket != adminSocket) return;
            adminSocket = null;
        });

        socket.on("close", () =>
        {
            if (socket != adminSocket) return;
            adminSocket = null;
            console.log("Admin is disconnected");
        });

        socket.on("end", () => {
            if (socket != adminSocket) return;
            adminSocket = null;
        })
    });
}