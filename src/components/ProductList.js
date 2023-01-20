import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({p_id, p_name, p_price,p_img}) => {
    return (
        <li>
            <Link to={`detailView/${p_id}`}>
            <img src={p_img} alt=""/>
            <h3>{p_name}</h3>
            <p>{p_price}원</p>
            <p>간단한 설명입니다.</p>
            </Link>
        </li>
    );
};

export default ProductList;