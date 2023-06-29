import axios from 'axios';

export const logoutUserToken = async () => {
    const path = '/v1/oauth/logout';

    try {
        const response = await axios.post(`${path}`, {
            // 요청 헤를 설정합니다.
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        console.log(response);
        localStorage.setItem('token', null);
        
        // 응답이 성공적인지 확인
        if (response.status != 200) {
            throw new Error('bad server condition');
        }
        
        // 성공적으로 요청을 처리한 경우 true 반환
        return true;
    } catch (e) {
        // 오류가 발생한 경우 에러 메시지를 출력하고 false를 반환
        console.error('postLogout Error: ', e.message);
        
        return false;
    }
};