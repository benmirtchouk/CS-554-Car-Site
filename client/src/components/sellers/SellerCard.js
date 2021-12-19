import { LinkContainer } from "react-router-bootstrap";
import { seller } from "../../data";
import { Button, Card, Row, Col, Nav, Form } from "react-bootstrap";
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
    const key = `${firstName}${lastName} -- ${displayName}`;

    return(
        <Card key={key}>
            <Row>
                <Col>
                <Card.Body>
                    <Card.Title>
                    { firstName} {lastName} -- {displayName}
                    </Card.Title>
                    <Row>
                        <Col>
                            Based in {city}, {state}
                            {totalListings > 0 && <span> with a total of {totalListings} cars on Carigslist! </span>}
                            {shouldShowSellerLink &&  
                            <LinkContainer to={`/seller/${_id}`}>
                                <Nav.Link>Go to seller Page</Nav.Link>
                            </LinkContainer>}
                        </Col>
                        <Col className="text-right">
                            <Button type="button" disabled={!userCanRateSeller} className={userCanRateSeller ? 'btn btn-primary' :'btn btn-dark'} onClick={(e) => rateSellerOnClick(e, false)}>👎 {dislike || 0}</Button>
                            <Button type="button" disabled={!userCanRateSeller} className={userCanRateSeller ? 'btn btn-primary' :'btn btn-dark'} onClick={(e) => rateSellerOnClick(e, true)}>👍 {like || 0} </Button>
                            {ratio  && <span> {ratio.toFixed(2)}% positive feedback! </span> }
                        </Col>
                    </Row>
                    <Row>
                    {userCanComment &&
                        <Col>
                            <Form onSubmit={addComment}>
                                <Form.Group>
                                    <Form.Label>
                                        Add Comment: 
                                        <Form.Control name="comment" type="text" maxLength="475" placeholder="How did a sale go?" required />
                                    </Form.Label>
                                    <Button type="submit"> Comment </Button>
                                </Form.Group>
   
                            </Form>

                        </Col>
                        }
                    </Row>
                    {Array.isArray(sellerComments) && 
                     <Row>
                        <Col>
                            {sellerComments.map(({displayName, commentText}, i) =>  
                            <div key={`${_id}-${displayName}-${commentText}-${i}`}>
                                {displayName}: {commentText}
                            </div>
                            )}
                        </Col>
                     </Row>
                    
                    }                 
                </Card.Body>
                </Col>
            </Row>
            </Card>
        )
};


export default SellerCard;