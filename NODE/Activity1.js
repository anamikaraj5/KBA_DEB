const readline = require('readline')

const rl= readline.createInterface({
    input: process.stdin,
    output:process.stdout
})

const tasks=[]
function ShowMenu(){
    console.log( ` 
    ===Task Manager===
        1.Add Task
        2.List Task
        3.Exit 
    ==================`)

 rl.question("Choose an option(1,2 or 3) : ",handleOption)
}


function handleOption(option){
    switch(option){
        case '1':
            rl.question("Enter any task ",(task)=>{
                if(task!=='')
                    {
                    tasks.push(task)
                    console.log(`Task added :${task}`)
                }
                else{
                    console.log("Enter a valid task")
                }
                ShowMenu()
            })
            break
        case '2':
            {
                const tasks=tasks.length?tasks.join(','):"No task specified"
                console.log(`Tasks : ${tasks}`)
                ShowMenu()
                break
            }
            
        case '3':
            {
                console.log("Exiting...");
                rl.close();
                break;
            } 
        
        default : 
                console.log("Please enter a valid task") 
                ShowMenu()  
           
    }
 }
 ShowMenu()