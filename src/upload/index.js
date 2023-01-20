import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";

const UploadPage = () => {
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        p_name : "",
        p_price : "",
        p_img : "",
        p_desc : "",
        p_quantity : ""
    })
    const onChange = (e) => {
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const onReset = () => {
        setFormData({
            p_name : "",
            p_price : "",
            p_img : "",
            p_desc : "",
            p_quantity : ""
        })
    }

    const onSubmit = (e) => {
        //form에 연결된 이벤트를 제거
        e.preventDefault();
        //입력이 다 되어있는지 체크
        if(formData.p_name && formData.p_img && formData.p_desc 
            && formData.p_price && formData.p_quantity){
                insertProduct();
            }
    }
    function insertProduct(){
        axios.post("http://localhost:8080/addProduct", formData)
        .then(res=>{
            console.log(res);
           navigate("/");
            
        })
        .catch(e=>{
            console.log(e);
        })
    }
    return (
        <div className='upload'>
           <h2>제품등록하기</h2>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                <tr>
                    <td>
                        상품이름
                    </td>
                    <td>
                        <input type = "text" name = "p_name"
                        value={formData.p_name} onChange={onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        상품이미지
                    </td>
                    <td>
                        <input type = "text" name = "p_img"
                        value={formData.p_img} onChange={onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        가격
                    </td>
                    <td>
                        <input type = "number" name = "p_price" step={10}
                        value={formData.p_price} onChange={onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        상품수량
                    </td>
                    <td>
                        <input type = "number" name = "p_quantity"
                        value={formData.p_quantity} onChange={onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        상세설명
                    </td>
                    <td>
                        <textarea name = "p_desc" onChange={onChange}
                        value={formData.p_desc}>
                            {formData.p_desc}
                        </textarea>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button type="submit">등록</button>
                        <button type="reset" onClick={onReset}>취소</button>
                    </td>
                </tr>
                </tbody>
             </table>
           </form>
        </div>
    );
};

export default UploadPage;