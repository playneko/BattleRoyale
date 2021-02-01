import { useEffect } from 'react';
import axios from 'axios'

const SessionModel = (setIsLogin) => {
    // 메인 리스트 취득
    const fetchDatas = async () => {
        try {
            // POST 전송
            let response = await axios.get('/user/isLogin')
            .catch(function (error) {
                console.log(error);
            });
            if (response.data.isLogin) {
                setIsLogin(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);
}

export default SessionModel;
