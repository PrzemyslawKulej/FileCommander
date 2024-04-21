const fs = require("node:fs/promises");

const { open, rename, unlink } = require("fs/promises");





(async () => {

  function handleCommand(command, keyword, action) {
    if (command.includes(keyword)) {
      const filePath = command.substring(keyword.length + 2).trim();
      console.log(filePath);
      action(filePath);
    }
  }

  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete a file";
  const RENAME_FILE = "rename the file";
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
    await unlink(filePath)      
      console.log(`Deleting ${filePath}...`);
    } catch (error) {
      console.error(`Got an error during deleting the file ${error.message}`);
    } finally {
      console.log(`File ${filePath} deleted.`);
    }


  }

  const renameFile = async (oldPath, newPath) => {
    try {
    await rename(oldPath, newPath)
    console.log(`Renamed ${oldPath} to ${newPath}`);
  } catch (error) {
    console.error(`Got an error trying to rename the file: ${error.message}`);
  }
}

  const addToFile = async (filePath, data) => {
    try {
      const file = await open(filePath, 'a');
      await file.write(data);
      console.log(`Adding ${filePath}`);
    } catch (error) {
      console.error
    } finally {
      console.log(`Data: ${data}`);
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
      
      handleCommand(command, CREATE_FILE, createFile);
      handleCommand(command, DELETE_FILE, deleteFile);
      
       // rename the file <path> to <new-path>
       if (command.includes(RENAME_FILE)) {
        const _idx = command.indexOf(" to ")
        const oldPath = command.substring(RENAME_FILE.length + 2, _idx).trim();
        const newPath = command.substring(_idx + 4).trim();
        renameFile(oldPath, newPath);
      }
      
    //add to file <path>
    if (command.startsWith(ADD_TO_FILE)) {
      const content = command.substring(ADD_TO_FILE.length).trim(); // Usuwamy identyfikator komendy
      const firstSpaceIndex = content.indexOf(' '); // Znajdujemy pierwszą spację po nazwie pliku
      if (firstSpaceIndex === -1) {
          console.error('Invalid command format');
          return;
      }
      const pathName = content.substring(0, firstSpaceIndex).trim(); // Nazwa pliku
      const data = content.substring(firstSpaceIndex + 1).trim(); // Dane do dodania
  
      addToFile(pathName, data);
  }
    
    
});

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {

      commandFileHandler.emit("change")
      
    }
  } 

})();
