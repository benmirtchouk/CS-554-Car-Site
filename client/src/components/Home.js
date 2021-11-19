import React, {useContext} from 'react';
import { AuthContext } from './firebase/Auth';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/SideBar.js';

const Home = () => {
  const {currentUser} = useContext(AuthContext);
  const slinks = [{ 
    name: "Recent Sales", link: "/recent_sales",
  }];

  if (currentUser)
  {
     console.log(`currentUser: ${currentUser.uid}`);
     //console.log(currentUser);
  }

  return (
    <div className="main_layout">
      <SideBar side_links={slinks} />
        <div className="mainbody">
	   <h1>Home</h1>
           <br /><br />
           <p>
              This is the Home page.
           </p>
        </div>
    </div>
  );
};

export default Home;
