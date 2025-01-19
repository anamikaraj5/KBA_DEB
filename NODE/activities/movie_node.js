const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function Menu()
{
    console.log(`1.Add Movie and Priority \n 2.Mark Watched \n 3.Edit \n 4.Remove \n 5.Exit`)
    rl.question("Enter any option ",Options)
}

movies=[]
priority=[]

function Options(option)
{
    switch(option)
    {
        case '1':
                rl.question("Enter movie name and priority : ",(input)=>
                {
                    const [movie, prio] = input.split(' ')
                    if(movie!="" || prio>1 || prio<3)
                    {
                        movies.push(movie)
                        priority.push(parseInt(prio))

                        console.log(`Movie name : ${movie}   Priority : ${prio}`)
                    }
                    else{
                        console.log("Enter valid inputs")
                    }
                    Menu()
                })
                break

        case '2':
                rl.question("Enter movie that is watched ",(input)=>
                {
                    index=movies.indexOf(input)
                    console.log(`The movie watched is : ${movies[index]}`)
                    Menu()
                })
                break

        case '3':
                console.log(`List: Movies - ${movies} Priorities - ${priority}`);
                rl.question("Enter movie to be edited: ", (input) => {
                    const index = movies.indexOf(input);
                    if (index !== -1) {
                        rl.question("Enter new movie name: ", (newMovieName) => {
                            movies[index] = newMovieName;

                            rl.question("Enter new priority (1, 2, or 3): ", (newPriority) => {
                                newPriority = parseInt(newPriority);
                                if (newPriority >= 1 && newPriority <= 3) {
                                    priority[index] = newPriority;
                                    console.log(`Updated list: Movies - ${movies}, Priorities - ${priority}`);
                                } else {
                                    console.log("Invalid priority. Priority must be 1, 2, or 3.");
                                }
                                Menu(); // Call the Menu after completing all input
                            });
                        });
                    } else {
                        console.log("Movie not found.");
                        Menu(); // Call the Menu if the movie is not found
                    }
                });
                break;

                

        case '4':
                rl.question("Enter movie name to be removed : ",(input)=>{
                    index=movies.indexOf(input)
                    if(index!=-1)
                    {
                        movies.splice(index,1)
                        priority.splice(index,1)
                    }
                    console.log(`Updated list : ${movies} ${priority}`)
                    Menu()
                })
                break


        case '5':
                console.log("Exiting....")
                rl.close()
                break

        default:
                console.log("Enter a valid option ")
                Menu()
                break
    }

}

Menu()
