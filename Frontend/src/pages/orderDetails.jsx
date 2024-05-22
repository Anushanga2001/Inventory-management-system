import React from 'react';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
    const { orderNumber } = useParams();

    return (
        <div>
            <h2>Order Details</h2>
            <p>Order Number: {orderNumber}</p>
            {/* Display other order details */}
        </div>
    );
}
