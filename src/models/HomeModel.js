import { useEffect } from 'react';
import axios from 'axios'

const HomeModel = ({setLists, setError, setLoading}) => {
    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 lists 를 초기화하고
            setError(null);
            setLists(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // POST 전송
            let response = await axios.post('/home/lists')
            .catch(function (error) {
                setError({error:error});
            });
            // 데이터는 response.data 안에 들어있습니다.
            setLists(response.data);
        } catch (e) {
            setError({error:e});
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDatas();
    }, []);
}

export default HomeModel;
