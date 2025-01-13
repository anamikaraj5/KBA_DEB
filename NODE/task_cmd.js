// const tasks=[]
// const args=process.argv.slice(2)
// command = args[0]
// task=args[1]
// if(command==='add')
// {
//     if(task)
//     {
//         tasks.push(task)
//         console.log(`Task added : ${task}`)
//         console.log(tasks)
//     }
//     else{
//         console.log("Please enter any task")
//     }
// }
// else{
//     console.log("Invalid command")
// }

//addition of 2 nos
sum=0
args=process.argv.slice(2)
command=args[0]
a=parseInt(args[1])
b=parseInt(args[2])
if(command==='add')
{
    sum=a+b
    console.log(sum)
}
else{
    console.log("invalid command ")
}

