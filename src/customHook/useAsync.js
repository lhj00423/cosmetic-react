import  { useEffect, useReducer } from 'react';
//1.상태 초기화
const initialState = {
    loadig : false,
    date : null,
    error : null
}
//2.리듀서함수 구현
//로딩중일때 상태
//데이터를 성공적으로 받을때 상태 업데이트, SUCCESS
//에러가 발생했을 경우 상태 업데이트,   ERROR
function reducer(state, action){
    switch(action.type){
        case 'LOADING':
            return{
                loadig : true,
                data : null,
                error : null
            };
        case 'SUCCESS':
            return{
                loadig : false,
                data : action.data,
                error : null
            };
        case 'ERROR':
            return{
                loadig : false,
                data : null,
                error : action.error
            };        
            default:
                return state;
    }
}
const useAsync = (callback,deps=[],id) => {
    const [state,dispatch] = useReducer(reducer,initialState);
    //데이터 요청 함수 async 함수 앞에 붙이는 키워드
    const fetchDate = async () =>{
        //로딩값을 트루로 상태 업데이트 -> 디스패치로 리듀서 호출
        dispatch({type:"LOADING"});
        //에러가 발생할 확률이 높은 코드작성시 에러 핸들링을 하기 위해 트라이캐치문씀
        try{
            const data = await callback(id);
            //data:data => 키 : 변수 => 생략하면 data로 쓸수있음
            dispatch({type:"SUCCESS",data:data})
        }
        //트라이에서 에러 발생하면 뒤에 코드까지 안가고 바로 캐치문으로 감 -> 에러처리
        catch(e){
            dispatch({type:"ERROR" , error : e })
        }
    }
    useEffect(()=>{
        fetchDate();
    },deps) 
    return state;
};

export default useAsync;