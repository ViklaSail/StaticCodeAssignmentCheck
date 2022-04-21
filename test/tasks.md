# task 1 making structure for task checking 
This is not quiz. This is for task folders
## Part 1 (preparations,for teachers manual udpating regarding tasks) this is run once
1. read folder names
2. create a json file taskChecking.json
    2.1 look at heading "folder structure format"
3. Write all folder names to that json file 
    3.1 create similar check structure as with quizzes. BUT EMPTY ONE. 

(teacher manually updates taskChecking for those folders... )

## part 2 (connected to the courserun) this is run multiple times
0. read json file to memory when the program starts. then you can find from the list that is already available. 
1. Write a function which is called with foldername as a parameter. 
2. Function returns object having check structure for that folder (task);
    (checking details are similar to quiz-task)


## Folder structure format
structure format LIST OF FOLLOWING ONE PER FOLDER
{checkThese: { 
  variables: [{name:"", count: 0} ],
  commands:  [{name:"", count: 0} ],
  codeLength: 5
  },
  name : {givenName: "NOT NEEDED", surname: "NOT NEEDED"},
  submission: "TO BE DEFINED"
}

# Specification preparations project
Research and development. It is by our experiences obvious that task communication need to be supported better. first goal is to have task and specifications easily navigated and updated. Following goals later: **unofficial communication** (chatting) saved and tagged to specification elements/documents as well as possible (discussion resolutions/notes that added to specs?). 
## git based specification system
idea: Code and specs in git, connected by git commits and possibly with help of git tags. Achieving traceability from specs to code and back. 
Properties: need to have links from diagram elements like class to detail-document and/or detail-diagram. Example: from class to state-diagram of that class. 
Specifications are saved in directory tree.  By links a net structure exists between diagrams, diagram elements and documents. UML is used. Example of [file structure](./spesificationFileStruct.uxf). And links between files and components should ideally functionlike [this one](spesificationFileStruct.uxf). 
Idea: how to keep private personal notes on task nicely available and linked to task? You can have a folder outside repository and have a link to it [like this](../../personalNotes/specSystemNotes.md). or then inside repository folder but outside repository control. From every task there should be link to task solution document, which is inside repository. 

0. Evaluating open source UML tools. Developing evaluation criteria further: components links to sub-diagrams. editor support. developer count, usage volume, last stable relase. development intensity. (support uxf-> the umlet standardized format for UML diagrams) 
Found tools so far: PlantUML, umlet, textuml, NClass, Jetuml. https://github.com/gbaychev/NClass https://www.jetuml.org/  http://abstratt.github.io/textuml/
[evaluation results](./taskResultDocs/UMLToolEvaluation.md)

1. task: finding and evaluating editors having pair programming capabilities. Other capabilities to compare? list and discuss. 
Check support for PlantUML and Umlet. 
* Atom alternatives study: check if good ones, should support pair programming. 
* Atom plantuml support and umlet support (plugin)
* gitlab plantuml or any other uml tool support. (gerrit)

2. task: Study how to link a diagram element to document in subfolder. For two tools: PlantUML and Umlet
PekkaR studies: seems that relative links are not possible? Similar functionality as with vscode MD documents is preferred: click link when editing=>open diagram link points to.
https://github.com/umlet/umlet/issues/122 umlet seems not to have this yet. 
another place to check for umlet: umlet VScode plugin. or any other editor plugin.  

3. task: preparing to modify open source components. Find link handling in PlantUML 

4. task: preparing to modify open source components. Find link handling in Umlet. 

5. Task: in case nothing works with relative links, start planning scripts used together with local absolute file-paths according to following link: https://stackoverflow.com/questions/7857416/file-uri-scheme-and-relative-files
file:///absolute/path/to/file
requirement1: when cloning repository to another folder, flle links need to be updated accordingly.  
Requirement2: when copying or pushing files to a web site, file links need to keep working.

