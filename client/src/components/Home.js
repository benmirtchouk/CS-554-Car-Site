import React from 'react';
import '../App.css';
import '../Carigs.css';
import SideBar from './sidebars/Home.js';

const Home = () => {
  return (
	  <div className="main_layout">
	  <SideBar />
	  <div className="mainbody">
            <br /><br />
            <p>
              Welcome to Carigslist! Carigslist is a website to suport a platform for buying and selling used automobiles.  
            </p>
            <p>
              As a seller, you can get analytics of recent prices of sold cars to better undertand what value your vehicle should be listed for.  Listings support information such as: seller ratings, comments, and dicussion links.
            </p>
            <p>
              As a buyer, Carigslist provides you price points to give you a basis on what to expect for your desired car puchase (i.e. model, make), along with a visulaitziaton of price trends for you dream car.  
            </p>

            <p className="hometext">
              This site uses the data from the following API sites...: 
              <a rel="noopener noreferrer" target="_blank" href="http://google.com" > google is here for now...</a>
            </p>
      </div>
      </div>
  );
};

export default Home;
