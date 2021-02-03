import { useEffect } from 'react';
import axios from 'axios'

const CharacterModel = ({id, account, setCharData, setError, setLoading}) => {
    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 Data 를 초기화하고
            setError(null);
            setCharData(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // POST 전송
            let response = await axios.post('/field/character', {
                gameNo: id,
                userId: account.userId
            })
            .catch(function (error) {
                setError({msg: "데이터 취득중 에러가 발생 했습니다."});
            });

            // 데이터는 response.data 안에 들어있습니다.
            setCharData(response.data);
        } catch (e) {
            setError({msg: "데이터 취득중 에러가 발생 했습니다."});
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDatas();
    }, [account]);
}

export default CharacterModel;
