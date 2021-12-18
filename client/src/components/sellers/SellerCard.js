import { Link } from "react-router-dom";
import { seller } from "../../data";
const sellerDataFetching = seller;


const SellerCard = (props) => {

    const { seller, setSeller } = props;

    if(!seller) {
        throw new Error("Seller must be provided!")
    }

    const {firstName, lastName, displayName, city, state, totalListings, _id, like, dislike, ratio} = seller;
    const shouldShowSellerLink = props.showSellerLink !== undefined ? !!props.showSellerLink : true;
    const userCanRateSeller = props.allowRatings !== undefined ? !!props.allowRatings : false;

    const rateSellerOnClick = async (e, isLike) => {
        e.preventDefault();

        const {data, status} = await sellerDataFetching.rateUser(_id, isLike, true);
        if(status >= 400 || !data) {
            alert("Failed to apply rating");
            alert(JSON.stringify(data))
            return
        }

        if(typeof setSeller !== 'function') { return; }
        const {like, dislike} = data.ratings;
        setSeller({...seller, like, dislike})
    }

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


        <div>
            <button type="button" disabled={!userCanRateSeller} onClick={(e) => rateSellerOnClick(e, false)}>👎 {dislike || 0}</button>
            <button type="button" disabled={!userCanRateSeller} onClick={(e) => rateSellerOnClick(e, true)}>👍 {like || 0} </button>
            {ratio !== undefined ?
                <span> {ratio.toFixed(2)}% positive feedback! </span> :
                ''
            }
        </div> 
 

        
      </div>
      ); 
}

export default SellerCard;