import React from "react";

import getAllSellersData from '../../data/sellers';
import useData from "../../utils/useData";

import Seller from "./Seller";
import Loading from '../Loading';

const Sellers = () => {

  const { data, loading } = useData(getAllSellersData);

  if (loading) {
    return (<Loading />);
  }

  console.log(data);

  const sellers = data.map((seller) => (
    /* eslint no-underscore-dangle: 0 */
    <Seller key={seller._id} name={seller.name} sellerId={seller.sellerId} />
  )
  );

  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>Sellers</h1>
        <br />
        <br />
        {sellers}
      </div>
    </div>
  );

};

export default Sellers;
