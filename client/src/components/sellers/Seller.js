import React from "react";

const Seller = (props) => {

    const { name, sellerId } = props;
    return (
        <div className="card">
            <div className="card-body">
                <h3>{name}</h3>
                <p>SellerId: {sellerId}</p>
            </div>
        </div >
    );
}


export default Seller; 