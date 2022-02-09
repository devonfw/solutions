const fs = require('fs');
const path = require('path');
const fsEx = require('fs-extra');

function copyIncludeFiles(solutionsDir, outputDir) {
    let dirContent = fs.readdirSync(solutionsDir);

    dirContent.forEach(function (dirItem) {
        item = `${solutionsDir}/${dirItem}`;
        fileStats = fs.lstatSync(item);

        if (!fileStats.isFile()) {
            var indexAsciiDocFile = path.join("./", item, "index.asciidoc");
            if (fs.existsSync(indexAsciiDocFile)) {
                readFromFilename(indexAsciiDocFile, `${outputDir}/${dirItem}`);
            }
        }
    })
}

function readFromFilename(file, outputDir) {
    let regexMatch = null;
    let fileContent = fs.readFileSync(file, { encoding: "utf-8" });
    let includeFileRegex = /include::((.*?\/([^\/\\[]+))\/([^\/\\[]+\.asciidoc))/isg;

    while ((regexMatch = includeFileRegex.exec(fileContent)) !== null) {
        let snippetDir = path.join(path.dirname(file), regexMatch[2]);
        let includeFile = path.join(snippetDir, regexMatch[4]);

        readFromFilename(includeFile, outputDir);
        fsEx.copySync(snippetDir, outputDir);
        fileContent = fileContent.replace("include::" + regexMatch[1], "include::./" + regexMatch[3] + "/" + regexMatch[4]);
    }
    fs.writeFileSync(file, fileContent, {encoding: 'utf-8'});
}

if (process.argv.length > 3) {
    copyIncludeFiles(process.argv[2], process.argv[3]);
}
