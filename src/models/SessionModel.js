import { useEffect } from 'react';
import axios from 'axios'

const SessionModel = (isLogin, setAccount, setError) => {
    // 메인 리스트 취득
    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error를 초기화하고
            setError(false);

            // POST 전송
            let response = await axios.get('/user/isLogin')
            .catch(function (error) {
                setError(true);
            });
            if (response.data.auth) {
                setAccount(response.data);
            }
        } catch (e) {
            setError(true);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, [isLogin]);
}

export default SessionModel;
