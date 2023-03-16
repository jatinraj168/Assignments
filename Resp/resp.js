const net = require("node:net");
const { type } = require("node:os");
const { start } = require("node:repl");

let streamData;
let length;
let transmissionData = [];
let arrayData = [];
let blkStrData = [];
let smplstrData = [];
let intData = [];
let errData = [];

const server = net
  .createServer((socket) => {
    socket.on("data", (data) => {
      socket.setEncoding("utf8");
      streamData = data.toString("ascii").replace(/\r\n/g, "");

      // command.push(streamData)
      // console.log(command)
      // console.log(streamData.split(""))
      length = typelencheck(streamData);
      if (length === "it is an array") {
        socket.write("its a array\n");
        arrayData.push(streamData);
        console.log(arrayData);
      } else {
        if (length === "it is an bulk string") {
          socket.write("its a bulkstring\n");
          blkStrData.push(streamData);
          console.log(blkStrData);
        } else {
          if (streamData === "it is an simple string") {
            socket.write("its a simple string");
            smplstrData.push(streamData);
            console.log(smplstrData);
          } else {
            if (length === "it is an int") {
              socket.write("This is a int");
              intData.push(streamData);
              console.log(intData);
            } else {
              if (length == "it is an err") {
                socket.write("this is a err");
                errData.push(streamData);
                console.log(errData);
              } else {
                if ((length = "POST")) {
                  socket.write("set the value");
                } else {
                  if ((length = "GET")) {
                    socket.write("get the value");
                  } else {
                    socket.write("err");
                  }
                }
              }
            }
          }
        }
      }
      const x = {
        command: true,
        value: "",
        type: "bulkstring",
      };

      // console.log(lengthChk)
      // console.log(command)
    });
  })
  .on("error", (err) => {
    // Handle errors here.
    throw err;
  });

function typelencheck(streamData, socket) {
  console.log(streamData);
  let lengthChk = streamData.toString("ascii").replace(/\r\n/g, "");
  if (lengthChk[0] == "*") {
    console.log("it is an array");
    return "it is an array";
  } else {
    if (lengthChk[0] == "+") {
      console.log("it is an simple string");
      return "it is an simple string";
    } else {
      if (lengthChk[0] == "$") {
        console.log("it is an bulk string");
        return "it is an bulk string";
      } else {
        if (lengthChk[0] == "-") {
          console.log("it is an err");
          return "it is an err";
        } else {
          if (lengthChk[0] == ":") {
            console.log("it is an int");
            return "it is an int";
          } else {
            if (lengthChk[0] === "SET") {
              return "POST";
            } else {
              if (lengthChk[0] === "GET") {
                return "GET";
              } else {
                return false;
              }
            }
          }
        }
      }
    }
  }
}

function datachk(streamData) {}

// Grab an arbitrary unused port.
server.listen(() => {
  console.log("opened server on", server.address());
});
