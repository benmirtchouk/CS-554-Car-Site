import { useEffect, useState } from "react";
import { account } from "../../data";
import Loading from "../Loading";
import SellerCard from "./SellerCard";

const Seller = (props) => {

    const { match: { params: { sellerId } } } = props;
    const [seller, setSeller] = useState(null);

    useEffect( () => {
        (async ()=> {
            const { data, status }= await account.getAccount(sellerId);
            if(status > 400 || !data) {
                alert("Failed to fetch seller");
                return;
            }
            setSeller(data)
        })()
    }, [sellerId])


    if(!seller) {
        return <Loading />
    }


    return <SellerCard seller={seller} showSellerLink={false} setSeller={setSeller} allowRatings={true} />
}

export default Seller