const { log } = require("console");
const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;
const copyFiles = fsPromises.copyFile;
const pathToFolderProject = path.join(__dirname, "project-dist");
const pathInitialAssets = path.join(__dirname, "assets");
const pathNewFolderAssets = path.join(__dirname, "project-dist/assets");

fs.access(pathToFolderProject, (error) => {
  if (!error) {
    fs.rm(pathToFolderProject, { recursive: true }, (err) => {
      if (err) {
        throw err;
      } else {
        createBuildPageFolder();
      }
    });
  } else {
    createBuildPageFolder();
  }
});

function createBuildPageFolder() {
  fs.mkdir(pathToFolderProject, (err) => {
    if (err) {
      throw err;
    }

    createStyleCss();
    createIndexHtml();
    createAssets();
  });
}

function createAssets() {
  fs.access(pathNewFolderAssets, (error) => {
    if (!error) {
      fs.rm(pathNewFolderAssets, { recursive: true }, (erro) => {
        if (erro) {
          throw erro;
        } else {
          createFolder();
        }
      });
    } else {
      createFolder();
    }
  });

  function createFolder() {
    fs.mkdir(pathNewFolderAssets, (err) => {
      if (err) {
        throw err;
      }

      creatFolderToAssets();
    });
  }
}

function creatFolderToAssets() {
  fsPromises.readdir(pathInitialAssets).then((folderInFolder) => {
    folderInFolder.forEach((everyFolder) => {
      fs.access(
        path.join(__dirname, `project-dist/assets/${everyFolder}`),
        (error) => {
          if (!error) {
            fs.rm(
              path.join(__dirname, `project-dist/assets/${everyFolder}`),
              { recursive: true },
              (erro) => {
                if (erro) {
                  throw erro;
                } else {
                  createFolderInAssets();
                }
              }
            );
          } else {
            createFolderInAssets();
          }
        }
      );

      function createFolderInAssets() {
        fs.mkdir(
          path.join(__dirname, `project-dist/assets/${everyFolder}`),
          (err) => {
            if (err) {
              throw err;
            }

            fsPromises
              .readdir(path.join(__dirname, `assets/${everyFolder}`))
              .then((fileInFolder) => {
                fileInFolder.forEach((everyFile) => {
                  const filePath = path.join(
                    __dirname,
                    `assets/${everyFolder}`,
                    everyFile
                  );

                  copyFiles(
                    filePath,
                    path.join(
                      __dirname,
                      `project-dist/assets/${everyFolder}`,
                      everyFile
                    )
                  );
                });
              });
          }
        );
      }
    });
  });
}

function createStyleCss() {
  const pathToFolderStyle = path.join(__dirname, "styles");
  const pathToFolderProjectCss = path.join(__dirname, "project-dist/style.css");
  const writeStream = fs.createWriteStream(pathToFolderProjectCss);
  fsPromises
    .readdir(pathToFolderStyle, { withFileTypes: true })
    .then((files) => {
      files.forEach((file) => {
        if (!file.isDirectory()) {
          const pathFile = path.join(__dirname, "styles", file.name);
          const typeFile = path.extname(pathFile);

          if (typeFile.replace(".", "") === "css") {
            const readStream = fs.createReadStream(pathFile);
            readStream.on("data", (text) => {
              writeStream.write(text);
            });
          }
        }
      });
    });
}

function createIndexHtml() {
  const pathToFolderProjectHtml = path.join(
    __dirname,
    "project-dist/index.html"
  );
  fs.copyFile(
    path.join(__dirname, "template.html"),
    pathToFolderProjectHtml,
    (error) => {
      if (error) {
        throw error;
      } else {
        insertFileIntoIndexHtml();
      }
    }
  );
}

function insertFileIntoIndexHtml() {
  fs.readFile(
    path.join(__dirname, "project-dist/index.html"),
    "utf8",
    (error, fileContent) => {
      if (!error) {
        fsPromises.readdir(path.join(__dirname, "components")).then((files) => {
          files.forEach((file) => {
            const pathFile = path.join(__dirname, "components", file);
            const name = path.basename(pathFile).slice(0, -5);
            fs.readFile(
              path.join(__dirname, `components/${file}`),
              "utf8",
              (error, fileContentHeader) => {
                if (error) {
                  throw error;
                }
                fileContent = fileContent.replace(
                  new RegExp(`{\{${name}\}\}`),
                  fileContentHeader
                );

                fs.rm(
                  path.join(__dirname, `project-dist/index.html`),
                  (erro) => {
                    if (erro) {
                      throw erro;
                    } else {
                      fs.writeFile(
                        path.join(__dirname, "project-dist/index.html"),
                        fileContent,
                        (err) => {
                          if (err) {
                            throw err;
                          }
                        }
                      );
                    }
                  }
                );
              }
            );
          });
        });
      } else {
        throw error;
      }
    }
  );
}
