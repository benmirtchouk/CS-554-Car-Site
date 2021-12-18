import { Link } from "react-router-dom";


const SellerCard = (props) => {

    const { seller } = props;

    if(!seller) {
        throw new Error("Seller must be provided!")
    }

    const {firstName, lastName, displayName, city, state, totalListings, _id} = seller;
    const shouldShowSellerLink = props.showSellerLink !== undefined ? !!props.showSellerLink : true;

    return (<div>
        <span>{firstName} {lastName} -- {displayName} </span>
        <span> Based in {city}, {state} </span>
        {totalListings > 0 ?
        <span> With a total of {totalListings} cars on Carigslist!</span>
        : ""
        }
        
        { shouldShowSellerLink ? 
            <Link to={`/seller/${_id}`}> Go to info </Link> :
            ""
        }
        
      </div>
      ); 
}

export default SellerCard;