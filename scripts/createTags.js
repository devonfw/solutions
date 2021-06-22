const { map, add } = require('cheerio/lib/api/traversing');
const fs = require('fs');
const path = require('path');

function main(solutionsDir, outputFile) {
    var tags = {};
    var frequence = new Map();
    var tagsWithoutDup = [];
    var max;
    var finalTag;
    
    let dirContent = fs.readdirSync(solutionsDir);
    dirContent.forEach(function (dirItem) {
        item = `${solutionsDir}/${dirItem}`;
        fileStats = fs.lstatSync(item);

        if (!fileStats.isFile()) {
            var indexAsciiDocPath = path.join("./", item, "index.asciidoc");
            var indexAsciiDoc = fs.readFileSync(indexAsciiDocPath, {encoding: "utf-8"});
            var lines = indexAsciiDoc.split("\n");
            for(var i in lines){
                var line = lines[i];
                if(line.startsWith("//")){
                    var parts = line.replace("//","").split("=", 2);
                    var duplicatePos = tagCompare(tagsWithoutDup, parts[0]);
                    if(duplicatePos > -1){
                        if(!frequence.has(parts[0])){
                            frequence.set(parts[0],1)
                            parts[0] = parts[0].toLowerCase().replace(/\s+/g,"");
                        }
                        else{
                            frequence.set(parts[0],frequence.get(parts[0]) + 1);
                            parts[0] = parts[0].toLowerCase().replace(/\s+/g,"");
                        }
                    }
                    else{
                        frequence.set(parts[0],1);
                        tagsWithoutDup.push(parts[0].toLowerCase().replace(/\s+/g,""));
                        parts[0] = parts[0].toLowerCase().replace(/\s+/g,"");         
                    }
                    if(parts.length == 2){
                        var tagValues = parts[1].split(";");
                        tagValues.forEach(tagValue => {
                            duplicatePos = tagCompare(tagsWithoutDup, tagValue);
                            if(duplicatePos > -1){
                                if(!frequence.has(tagValue.trim())){
                                    frequence.set(tagValue.trim(),1)
                                     tagValue = tagValue.trim().toLowerCase().replace(/\s+/g,"");
                                } 
                                else{
                                    frequence.set(tagValue.trim(),frequence.get(tagValue.trim()) + 1);
                                    tagValue = tagValue.trim().toLowerCase().replace(/\s+/g,"");
                                }
                            }
                            if(duplicatePos == -1){
                                frequence.set(tagValue.trim(),1);
                                tagsWithoutDup.push(tagValue.toLowerCase().replace(/\s+/g,'').trim());
                                tagValue = tagValue.toLowerCase().replace(/\s+/g,"").trim();
                            }
                            if(!tags[parts[0]]){
                                tags[parts[0]] = {};
                            }
                            if(!tags[parts[0]][tagValue.trim()]){
                                tags[parts[0]][tagValue.trim()] = [];
                            } 
                            tags[parts[0]][tagValue.trim()].push(dirItem);
                        });
                    }
                }
                else{
                    break;
                }
            }
        }
    });

    for (tag in tags){
        max = 0;
        for (k of frequence.keys()){
            if(k.toLowerCase().replace(/\s+/g,"") == tag){
                if(max < frequence.get(k)){
                    max = frequence.get(k);
                    finalTag = k;
                } 
            }
         }
         tags[finalTag] = tags[tag];
         if(finalTag != tag)
         delete tags[tag];     
    }

    for(t in tags){
        for (tag in (tags[t])){
            max = 0;
            for (k of frequence.keys()){
                if(k.toLowerCase().replace(/\s+/g,"") == tag){
                    if(max < frequence.get(k)){
                        max = frequence.get(k);
                        finalTag = k;
                    } 
                }
             }
            tags[t][finalTag] = tags[t][tag];
            if(finalTag != tag)
            delete tags[t][tag];
        }
    }

    console.log(tags);
    fs.writeFileSync(path.join("./", outputFile), JSON.stringify(tags));
}

function tagCompare(arr, tag){
    return arr.indexOf(tag.toLowerCase().replace(/\s+/g,""));
}

if (process.argv.length > 3) {

    main(process.argv[2], process.argv[3]);
}