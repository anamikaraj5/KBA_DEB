// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Logos from './Logos'

// function App() {
//   const [count, setCount] = useState(0)
//   const [liked, settoggle] = useState(false)

//   function setlike()
//   {
//     settoggle((prevlike) =>  !prevlike)
//   }
//   return (
//     <>
//       <Logos/>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>

//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//       <div>
//         <button className='heart' onClick={setlike}> {liked?'LIKED':'LIKE'} </button>
//       </div>
//     </>
//   )
// }

// export default App


//USE STATE 

// import React, { useState } from 'react';

// function Counter() {
//   // Step 2: Create a state variable "count" with initial value 0
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       {/* Step 3: Update state when button is clicked */}
//       <button onClick={() => setCount(count + 1)}>Increase</button>
//     </div>
//   );
// }

// export default Counter;

// import React,{useState} from "react";

// const App = () => {

//   const [count,setCount] = useState(0)
//   const [yes,setState] = useState(false)
//   return (
//     <div>

//     <button onClick={()=> setCount(count+2)}>Count: {count}</button>
//     <button onClick={()=>setState(!yes)}>{yes? "No":"Yes"}</button>
//     </div>
//   )
// }

// export default App





//USE EFFECT


// Running Code on Every Render

// import React, { useState, useEffect } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);

//   // Runs every time the component renders
//   useEffect(() => {
//     console.log("Component rendered!");
//   });

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={() => setCount(count + 1)}>Increase</button>
//     </div>
//   );
// }

// export default Counter;


// Run Only Once (When Component Loads)

// import React, { useEffect } from 'react';

// function Welcome() {
//   useEffect(() => {
//     console.log("Welcome to the app!");
//   }, []); // Empty dependency array

//   return <h1>Hello, User!</h1>;
// }

// export default Welcome;



// Run When a State Changes

// import React, { useState, useEffect } from 'react';

// function Message() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     console.log("Message changed:", message);
//   }, [message]); // Runs when "message" changes

//   return (
//     <div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type something..."
//       />
//       <p>You typed: {message}</p>
//     </div>
//   );
// }

// export default Message;

