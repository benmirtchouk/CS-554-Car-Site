import React from "react";
import '../../App.css';
import '../../Carigs.css';

const Search = () => {

   const searchHandler = (e) => {
      console.log(`In searchHandler, ${e.target.value}`);
   };

   const submitHandler = (e) => {
      e.preventDefault();
      alert(`search word submitted: ${e.target.elements.searchWord.value}`);
      e.target.elements.searchWord.value = '';
   };

   return (
      <div className="searchbox">
         <form method="POST" onSubmit={submitHandler} className="form-inline">
            <input id="searchWord" type="text" placeholder="search" name="searchWord" onChange={searchHandler} />
         </form>
      </div>
   );
};

export default Search;
