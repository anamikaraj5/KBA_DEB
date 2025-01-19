const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function Show()
{
    console.log(`
        1.Add Task
        2.List Task
        3.Exit`)

    rl.question("Choose any option ",handleoption)
}

tasks=[]

function handleoption(option)
{
    switch(option)
    {
        case '1':
                rl.question("Enter any task",(task)=>{
                    if(task!='')
                    {
                        tasks.push(task)
                        console.log(`Entered Task : ${task}`)
                    }
                    else{
                        console.log("NO tasks")
                    }
                    Show()
                })
                break

        case '2':
                tasks1=tasks.length?tasks.join(","):"no tasks"
                console.log(tasks1)
                Show()
                break

        case '3':
                console.log("Exiting....")
                rl.close()
                break

        default:
                console.log("Enter valid option")
                Show()
                break
    }
}

Show()