arr=[]
let qty1,qty2,qty3
        function Add()
        {
            qty1=document.getElementById("qty1").value
            qty2=document.getElementById("qty2").value
            qty3=document.getElementById("qty3").value
         
            Q1={
                I1:"Item1",
                Qty:qty1,
                P1:500
            }
        
            Q2={
                I2:"Item2",
                Qty:qty2,
                P2:1000
            }    

            Q3={
                I3:"Item3",
                Qty:qty3,
                P3:700
            }

            arr=[Q1,Q2,Q3]
            console.log(arr)
        }

        function Check()
        {

            total=(arr[0].Qty * arr[0].P1 + arr[1].Qty * arr[1].P2 + arr[2].Qty * arr[2].P3 )
            // total=(qty1*Q1.P1)+(qty2*Q2.P2)+(qty3*Q3.P3)
            document.getElementById("c").innerHTML=total
        }
        