import { useEffect } from 'react';
import axios from 'axios'

const SessionModel = (isLogin, setIsLogin) => {
    // 메인 리스트 취득
    const fetchDatas = async () => {
        try {
            // POST 전송
            let response = await axios.get('/user/isLogin')
            .catch(function (error) {
                console.log(error);
            });
            if (response.data.auth) {
                setIsLogin(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, [isLogin]);
}

export default SessionModel;
