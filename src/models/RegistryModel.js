import { useEffect } from 'react';
import axios from 'axios'

const RegistryModel = ({account, setUsers, setError, setLoading}) => {
    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setUsers(null);
            let response = {};

            if (account != null && account.userRegistry === true) {
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);
                // POST 전송
                response = await axios.post('/user/registry', {
                    userId: account.user_id,
                    userPw: account.user_pw,
                    userName: account.user_name
                })
                .catch(function (error) {
                    setError(response.data);
                });
            }

            // 데이터는 response.data 안에 들어있습니다.
            setUsers(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchDatas();
    }, [account]);
}

export default RegistryModel;
