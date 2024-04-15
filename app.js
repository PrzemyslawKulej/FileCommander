const fs = require("node:fs/promises");

(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r");

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

      if (command.includes("create a file")){
        const filePath = command.substring("create a file" + 1);
      }
    
});

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {

      commandFileHandler.emit("change")
      
    }
  } 

})();
