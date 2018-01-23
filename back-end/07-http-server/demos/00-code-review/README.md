### TCP Chat Server Lab

# Cmd Module

1. Parser is a function that takes in a buffer of data, turns it into a string and parses commands from the front of the string by seperating each "word" of the string and checking the first for an "@" command, it then verifies a valid command was given and returns an object with the information required for the chosen command or message type.

      This function is O(n) on average case operation.

      It requires two inputs, a valid buffer of data and an array of currently connected clients.


# Client Module

1. Client is a constructor function that takes in a socket provided by server connection and instantiates a Client object with a randomized uuid value as a nickname, a random user number, and an assigned socket.

      This function is O(1) on average case operation.

      It requires a single input, a valid socket.


# Server Module

The Server entry point file, this file handles all events emitted by processes. These events include the following:

  1. Connection: On connection the server assigns a socket to the connection and calls for new client creation on that socket as well as assigns listeners for available commands.

  2. Data: On submission of data from any connected client this sends that data into the command parser module and emits an event based on that data sending the data along to that event.

  3. List: When the data event emits an @list command this creates a list of connected users for the client who executed it.

  4. Nickname: When the data event emits an @nickname command this changes the clients nickname based on the name passed after the command.

  5. Message: When the data event emits a message event because no @ command was used this passes the entire block of information provided as a message to the server.

  6. Direct Message: When the data event emits an @dm command this targets the 2nd word of the message as a name of a user and attempts to send rest of the message to them.

  7. Close: When the data event emits an @quit command it closes the connection of the requesting client.

  8. Error: This event is emitted if the requested command is invalid in some way, it passes a message back to the Client saying what needs to be corrected.

  9. Jeep & Facepalm: These are easter egg events emitted when @jeep or @facepalm are used as a command with nothing following it.