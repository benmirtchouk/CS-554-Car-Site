import { Link } from "react-router-dom";
import { seller } from "../../data";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../firebase/Auth";
import { useContext } from "react";
const sellerDataFetching = seller;


const SellerCard = (props) => {

    const { seller, setSeller } = props;
    const { currentUser } = useContext(AuthContext);

    if(!seller) {
        throw new Error("Seller must be provided!")
    }

    const {firstName, lastName, displayName, city, state, totalListings, _id, like, dislike, ratio, sellerComments} = seller;
    const shouldShowSellerLink = props.showSellerLink !== undefined ? !!props.showSellerLink : true;
    const userCanRateSeller = props.allowRatings !== undefined ? !!props.allowRatings : false;
    const userCanComment = currentUser && props.allowNewComments !== undefined ? !!props.allowNewComments : false;

    const rateSellerOnClick = async (e, isLike) => {
        e.preventDefault();

        const {data, status} = await sellerDataFetching.rateUser(_id, isLike, true);
        if(status >= 400 || !data) {
            alert("Failed to apply rating");
            return
        }

        if(typeof setSeller !== 'function') { return; }
        const {like, dislike} = data.ratings;
        setSeller({...seller, like, dislike})
    }

    const addComment = async(e) => {
        e.preventDefault();

        const comment = e.target.elements.comment.value;

        const { data, status } = await sellerDataFetching.putComment(comment, _id)
        if(status >= 400 || !data) {
            alert(status)
            return
        }

        e.target.reset();

        if(typeof setSeller !== 'function') { return; }
        setSeller(data.seller)
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

        {userCanComment &&
            <div>
                <form onSubmit={addComment}>
                    <label>
                        Add Comment: 
                        <input name="comment" type="text" placeholder="How did a sale go?"required />
                        <Button type="submit"> Comment </Button>
                    </label>
                </form>

            </div>
        }


        <div>
            {Array.isArray(sellerComments) &&
                <div>
                    {sellerComments.map(({displayName, commentText}) =>  
                    <div>
                        {displayName}: {commentText}
                    </div>
                    )}
                </div>

            }
        </div>
 

        
      </div>
      ); 
}

export default SellerCard;