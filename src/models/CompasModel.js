import { useEffect } from 'react';
import axios from 'axios'

const CompasModel = ({mapData, moveMap, setMoveCheck, setError, setLoading}) => {
    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 Data 를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            let response = {};

            // POST 전송
            if (moveMap != null) {
                response = await axios.post('/field/mapmove', {
                    gameNo: mapData.game_no,
                    userId: mapData.user_id,
                    mapCode: moveMap
                })
                .catch(function (error) {
                    setError(error);
                });
            }

            // 데이터는 response.data 안에 들어있습니다.
            setMoveCheck(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (moveMap !== mapData.map_code) {
            fetchDatas();
        }
    }, [moveMap]);
}

export default CompasModel;
