const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function show()
{
    console.log(`
        1.Add Expense
        2.Show Expense
        3.Exit
        `)
    rl.question("Enter any option",Options)
}

categories=[]
amount=[]
date=[]

function Options(option)
{
    switch(option)
    {
        case '1' :
                 rl.question("Enter categories ",(input)=>
                {
                    if(input!='')
                    {
                        categories.push(input)
                        console.log("Category Added : ",input)
                    }

                    rl.question("Enter expense ",(input)=>
                    {
                        if(input!='')
                        {
                            amount.push(parseInt(input))
                            console.log("Expense Added : ",input)
                        }

                        rl.question("Enter date ",(input)=>
                            {
                                if(input!='')
                                {
                                    date.push(input)
                                    console.log("Date Added : ",input)
                                }
                                show()
                            })
                    } )

               
                })
                break

        case '2':
                if(amount.length)
                {
                    if(date.length)
                    {
                        rl.question
                    }
                }

    }
}

show()