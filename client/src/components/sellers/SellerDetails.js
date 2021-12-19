import { useEffect, useState, useContext } from "react";
import { account } from "../../data";
import Loading from "../Loading";
import SellerCard from "./SellerCard";

import { Link } from 'react-router-dom';
import { AuthContext } from "../../firebase/Auth";

const Seller = (props) => {

    const { match: { params: { sellerId } } } = props;
    const [seller, setSeller] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const clientId = currentUser.uid;

    useEffect(() => {
        (async () => {
            const { data, status } = await account.getAccount(sellerId);
            if (status > 400 || !data) {
                alert("Failed to fetch seller");
                return;
            }
            setSeller(data)
        })()
    }, [sellerId])


    if (!seller) {
        return <Loading />
    }


    return (
        <div>
            <SellerCard seller={seller} showSellerLink={false} setSeller={setSeller} allowRatings={true} allowNewComments={true} />
            {(sellerId !== clientId) &&
                (<Link
                    to={{
                        pathname: "/one_to_one_chat",
                        state: {
                            sellerId: sellerId
                        }
                    }}>Leave this seller a message!</Link>)
            }
        </div>

    )
}

export default Seller