const fs = require("node:fs/promises");




(async () => {

  function handleCommand(command, keyword, action) {
    if (command.includes(keyword)) {
      const filePath = command.substring(keyword.length + 1).trim();
      action(filePath);
    }
  }

  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete a file";
  const RENAME_FILE = "rename a file";
  const ADD_TO_FILE = "add to file";

  const createFile = async (filePath) =>  {
    
    try {
      // we want to check whether or not we already have that file
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandel.close();
      // we already have that file...

      return console.log(`The file ${filePath} already exists.`);
    } catch (error) {
      // we don't have the file, now we should create it
      const newFileHandle = await fs.open(filePath, "w");
      console.log("A new file was successfully created");
      newFileHandle.close();
    }


  }
  const deleteFile = async (filePath) =>  {
  
    try {
      // we want to check whether or not we already have that file
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandel.close();
      // we already have that file...

      return console.log(`The file ${filePath} already exists.`);
    } catch (error) {
      // we don't have the file, now we should create it
      const newFileHandle = await fs.open(filePath, "w");
      console.log("A new file was successfully created");
      newFileHandle.close();
    }


  }


  const commandFileHandler = await fs.open("./command.txt", "r");
  // commands
  

  commandFileHandler.on("change", async () => {
    const size = (await commandFileHandler.stat()).size;
      // allocate our buffer with the size of the file 
      const buff = Buffer.alloc(size);
      // the location at with we want to start filling our buffer

      const offset = 0;
      // how many bytes we want to read 
      const length = buff.byteLength;
      // the position that we want to start reading the file form
      const position = 0;

      // we always want to read the whole content (from being all the way to the end )

      await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );

      // decoder 01 => meaningful
      // encoder meaningful => 01

      const command = (buff.toString("utf-8"));

      //create a file  
      //create a file <path>

      handleCommand(command, CREATE_FILE, action);
      handleCommand(command, DELETE_FILE, action);
      
      //rename file
      // rename the file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ")
      const prevPath = command.substring(RENAME_FILE, length + 1, _idx).trim();
      const nextPath = command.substring(idx + 4)
      }
      
    //add to file 
    
});

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {

      commandFileHandler.emit("change")
      
    }
  } 

})();
