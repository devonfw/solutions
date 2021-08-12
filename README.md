# Architectures / Pattern Catalog of devonfw
This catalog is maintaining the sources for the [architectures website section](https://devonfw.com/website/pages/architectures/).

If you want to edit this repository in the cloud, please click [here](https://gitpod.io/from-referrer/).

## How to create a new architecture
To create a new architecture, copy over the [solution-template.asciidoc](https://github.com/devonfw/architectures/blob/master/solution-template.asciidoc) file from the root of the repository to a newly created folder within https://github.com/devonfw/architectures/tree/master/solutions. For ease of use, the folder name should encode at least the name of your architecture sample / pattern. Afterwards, rename the solution-template.asciidoc file to index.asciidoc to make it be generated properly.

## Tags
You can setup any tags of your choice on top of the asciidoc file as comments. At the moment the copy template provides the two tags `Category` and `Product`. Multiple values for one tag can be separated by colon. It's possible to add additional tags on demand by simply create a new line of key and value pair.

Please add the tag `Maturity level` and set it to one of the values `Initial`, `Advanced`, `Complete` to describe the progress of the architecture description.

```
//Category=coolCategory 2
//Product=A cool product 2;Coolest product
//Maturity level=Complete
```
