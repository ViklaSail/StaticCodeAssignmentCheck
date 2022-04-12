# task 1 making structure for task checking 
This is not quiz. This is for task folders
## Part 1
1. read folder names
2. create a json file taskChecking.json
3. Write all folder names to that json file 
    3.1 create similar check structure as with quizzes. BUT EMPTY ONE. 

(teacher manually updates taskChecking for those folders... )

## part 2
1. Write a function which is called with foldername as a parameter. 
2. Function returns object having check structure for that folder (task);
    (checking details are similar to quiz-task)


structure format LIST OF FOLLOWING ONE PER FOLDER

{checkThese: { 
  variables: [{name:"", count: 0} ],
  commands:  [{name:"", count: 0} ],
  codeLength: 5
  },
  name : {givenName: "NOT NEEDED", surname: "NOT NEEDED"},
  submission: "TO BE DEFINED"
}