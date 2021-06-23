# Architectures / Pattern Catalog of devonfw
This catalog is maintaining the sources for the [architectures website section](https://devonfw.com/website/pages/architectures/).

## How to create a new architecture
To create a new architecture, copy over the [solution-template.asciidoc](https://github.com/devonfw/architectures/blob/master/solution-template.asciidoc) file from the root of the repository to a newly created folder within https://github.com/devonfw/architectures/tree/master/solutions. For ease of use, the folder name should encode at least the name of your architecture sample / pattern. Afterwards, rename the solution-template.asciidoc file to index.asciidoc to make it be generated properly.

## Tags
You can setup any tags of your choice on top of the asciidoc file as comments. At the moment the copy template provides the two tags `Category` and `Products`. Multiple values for one tag can be separated by colon. It's possible to add additional tags on demand by simply create a new line of key and value pair.

```
//Category=coolCategory 2
//Products=A cool product 2;Coolest product
```
