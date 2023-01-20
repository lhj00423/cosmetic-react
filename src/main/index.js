import axios from 'axios';
import React from 'react';
import ProductList from '../components/ProductList';
import useAsync from '../customHook/useAsync';
import './index.css';

async function productFecth(){
    const response = await axios.get('http://localhost:8080/products');
    return response.data;
}
const MainPage = () => {
    const state = useAsync(productFecth,[]);
    const { loading, data, error } = state;
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null; 
    return (
        <div className='main'>
            <div className='visual'>
                <img src="images/main_banner1.jpg" alt="배너이미지"/>
            </div> 
            <div className='product'>
                <h2>신상품</h2> 
                <ul>
                    {data.map(pro=>
                    <ProductList key={pro.p_id}
                    p_id ={pro.p_id} 
                    p_name={pro.p_name}
                    p_price={pro.p_price}
                    p_img={pro.p_img}
                    />)}
                </ul>    
            </div>            
        </div>
    );
};

export default MainPage;
