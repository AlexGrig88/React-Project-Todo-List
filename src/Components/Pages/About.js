import React from 'react';

const About = () => {

  const styleAbout = {
      marginTop: "50px"
  };

  return(
    <React.Fragment>
      <h1 style={ styleAbout }>About</h1>
      <h3>To-Do App</h3>
      <p>The classic To-Do application where a user can write down all
         the things he wants to accomplish. The initial state is created from 
         <a href="https://jsonplaceholder.typicode.com/todos">https://jsonplaceholder.typicode.com/todos</a> server.
      </p>
      <h4>User Stories</h4>
      <ul>
        <li>User can see an input field where he can type in a to-do item</li>
        <li>By pressing enter (or a button), the User can submit the to-do item and can see that being added to a list of to-do's</li>
        <li>User can mark a to-do as completed (click on record)</li>
        <li>User can remove a to-do item by pressing on a button</li>
        <li>User can see a list with all the completed to-do's</li>
        <li>User can see a list with all the active to-do's</li>
      </ul>
    </React.Fragment>
  );
}

export default About;