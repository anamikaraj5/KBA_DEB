const readline = require("readline")

rl=readline.createInterface(
    {
        input:process.stdin,
        output:process.stdout
    }
)

rl.question('What is your name ? ',(name)=>{
    console.log(`Your name is : ${name}`)
    rl.close()
})