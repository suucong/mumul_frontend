import React from 'react';
import Spinner from '../img/Spinner.gif';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#ffffffb7'}}>
      <img src={Spinner} alt="로딩중" width="8%" style={{ opacity: '1' }}/>
    </div>
  );
}

export default Loading;
