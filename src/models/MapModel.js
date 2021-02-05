import { useEffect } from 'react';
import axios from 'axios'

const MapModel = ({character, setMapData, setError, setLoading}) => {
    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 Data 를 초기화하고
            setError(null);
            setMapData(null);

            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // POST 전송
            let response = await axios.post('/field/mapdata', {
                gameNo: character.game_no,
                userId: character.user_id
            })
            .catch(function (error) {
                setError(error);
            });

            // 데이터는 response.data 안에 들어있습니다.
            setMapData(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDatas();
    }, []);
}

export default MapModel;
