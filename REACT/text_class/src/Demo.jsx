import React from 'react'

const Demo = () => {
    const Name='Anamika'
    const x=10
    const y=20
    const names=['Anamika','Avanthika','Gowri']
    const passed=true
  return (
    <>
     <div>Demo</div>
     <p>Hello {Name}</p>
     <p>{x+y}</p>
     <ul>
        {names.map((name,index)=>(
            <li key={index}>{name}</li>
        ))}
     </ul>
     {passed?<p className='text-3xl text-green-800'>Green</p>:<p className='text-3xl text-red-800'>Red</p>}
    </>
  )
}

export default Demo