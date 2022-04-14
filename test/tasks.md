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


# Folder structure format
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
Research and development
## git based specification system
idea: Code and specs in git, connected by git commits and possibly git tags. Achieving traceability from specs to code and back. 
Properties: need to have links from diagram elements like class to detail-document and/or detail-diagram like from class to state-diagram of that class. directory tree, but net structure between diagrams, diagram elements and documents. 

1. task: finding and evaluating editors having pair programming capabilities. Other capabilities to compare? list and discuss. 
Check support for PlantUML and Umlet. 

2. task: Study how to link a diagram element to document in subfolder. For two tools: PlantUML and Umlet
PekkaR studies: seems that relative links are not possible? Similar functionality as with vscode MD documents is preferred: click link when editing=>open diagram link points to.


3. task: preparing to modify open source components. Find link handling in PlantUML 

4. task: preparing to modify open source components. Find link handling in Umlet. 

