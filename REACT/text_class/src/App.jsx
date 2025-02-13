import React from 'react'
import Demo from './Demo'
import Card from './Card'


const App = () => {

  const cardData=[{
  title:'card 1',
  text:'This is the first card',
  customClasses:'bg-green-200'
},
{
  title:'card 2',
  text:'This is the second card',
  customClasses:'bg-blue-200'
},
{
  title:'card 3',
  text:'This is the third card',
  customClasses:'bg-yellow-200'
}]
  return (
    <div>
      <div className='text-4xl'>App</div>
      <Demo/>
      {cardData.map((card,index)=>(
        <Card key={index}                                 //this method is called prop - properties
            title={card.title}
            text={card.text}
            customClasses={card.customClasses}/>
      ))}
    </div>
    
  )}

export default App