# Lab 10 - Express

## API endpoints

* POST: "/api/v1/note"
    Requires: Title and Content as JSON;

    This endpoint takes a JSON string containing a title and content, it then feeds that into the note constructor before finally passing it to the storage module. The storage module then writes the JSON to a file under the correct directory.

* PUT: "/api/v1/note/:_id"
    Requires: ID as a parameter; Title Content and ID as JSON;

    This endpoint takes the parameter provided and verifies it against the JSON provided it then builds a new note object using the provided data including the ID provided. It then passes the note and ID to the storage module which writes it to the appropriate file.

* GET: "/api/v1/note" or "/api/v1/note/:_id"
    Required: No requirements for getting a list of available files; ID as a parameter for one file;

    This endpoint first verifies whether an ID was passed as a parameter. If ID is not present it will get a list of the file names from the storage module and pass them back as a response. If ID is present it will pass that ID to the storage module and get a single file with that name.

* DELETE: "/api/v1/note/:_id"
    Required: ID as a parameter;

    This endpoint using the ID provided locates and deletes the file that shares the same ID.