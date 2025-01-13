//packages or importing 
lodash=require("lodash")
const add1= require('./addition.js')



console.log("Hello World")
a="Node js"
console.log(`Javascript - ${a}`)

if(a==='Node js')
{
    console.log("Running.....")
}

for(i=1;i<=5;i++)
{
    console.log(i," ")
}


arr=[1,2,3,4,5]
console.log("Array : ",arr)
console.log("Reverse of Array : ",lodash.reverse(arr))

console.log("Capitalized String : ",lodash.capitalize("anamika raj"))

console.log(add1.add(5,5))