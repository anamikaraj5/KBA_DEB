const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function show()
{
    console.log(`
        1.Add Details
        2.Show Expense
        3.Exit
        `)
    rl.question("Enter any option ",Options)
}

categories=[]
amount=[]
date=[]
// details=[]
let total=0

function Options(option)
{
    switch(option)
    {
        case '1' :
                 rl.question("Enter categories : ",(input1)=>
                {
                    if(input1!='')
                    {
                        categories.push(input1)
                        console.log("Category Added : ",input1)
                    }

                    rl.question("Enter expense : ",(input2)=>
                    {
                        if(input2!='')
                        {
                            amount.push(input2)
                            console.log("Expense Added : ",input2)
                        }

                        rl.question("Enter date : ",(input3)=>
                            {
                                if(input3!='')
                                {
                                    date.push(input3)
                                    // details.push({categories:input1 , amount:input2, date:input3})
                                    console.log("Month Added : ",input3)
                                }
                                show()
                            })
                    } )

               
                })
                break

        case '2':
                // console.log(details)
                // rl.question("Enter the month ",Month)
                // function Month(month){
                //     switch(month)
                //     {
                //         case '1':

                //     }
                // }

                categories1=categories.length?categories.join(','):"no categories given"
                amount1=amount.length?amount.join(','):"no amount given"
                date1=date.length?date.join(','):"no date given"
                console.log(`Categories : ${categories1}`)
                console.log(`Date : ${date1}`)
                console.log(`Amount : ${amount1}`)
                for(i of amount)
                {
                    total+=parseInt(i)
                }
                console.log(`Total Expense : ${total}`)
                show()
                break

        case '3':
                console.log("Exiting.....")
                rl.close()
                break


        default:
                console.log("Enter a valid option")
                show()
                break
    }
}

show()