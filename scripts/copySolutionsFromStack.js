const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const fsEx = require('fs-extra');

function main(repositoryDir) {
    var prefix;
    let dirContent = fs.readdirSync(repositoryDir);
    var subfolders;
    var solutions;
    
    dirContent.forEach(function (dirItem){
        item = `${repositoryDir}/${dirItem}`;
        fileStats = fs.lstatSync(item);

        if(fileStats.isDirectory()){
            if(path.extname(item) == '.wiki'){
                subfolders = fs.readdirSync(item);
                prefix = path.basename(item,'.wiki') + '_';

                subfolders.forEach(function (subfolder){
                    if(path.basename(subfolder) == 'solutions' ){
                        let solutionFolder = `${item}/${subfolder}`;
                        let destPath = path.join(__dirname, '../solutions'); 
                        solutions = fs.readdirSync(solutionFolder);
                        solutions.forEach(function (solution){
                            let oldPathName = `${solutionFolder}/${solution}`;
                            let newPathName = path.join(oldPathName, '../'+prefix+path.basename(solution));
                            if(path.basename(solution).search(prefix) != -1){
                                return;
                            }
                            fs.renameSync(oldPathName,newPathName);
                        });
                        fsEx.copySync(solutionFolder,destPath);
                    }
                });
            }
        }
    });
}

if (process.argv.length > 2) {

    main(process.argv[2]);
}