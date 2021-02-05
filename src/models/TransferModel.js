import { useEffect } from 'react';
import axios from 'axios'

const TransferModel = ({charData, setResult, setError, setLoading}) => {
    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 Data 를 초기화하고
            setError(null);
            setResult({success: false});
            let response = {};

            if (charData.transfer === true) {
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);

                // POST 전송
                response = await axios.post('/transfer/transfer', {
                    gameNo: charData.gameNo,
                    userId: charData.userId,
                    charIcon: charData.charIcon,
                    charName: charData.charName,
                    charSex: charData.charSex
                })
                .catch(function (error) {
                    setError(error);
                });
            }
            // 데이터는 response.data 안에 들어있습니다.
            setResult(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDatas();
    }, [charData]);
}

export default TransferModel;
