import React, {useState} from 'react';
import CodeModal from './codeModal';
import {useHistory} from 'react-router-dom';
import UsernameModal from './usernameModal';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const history = useHistory();

  const handleCodeSent = () => {
    setIsCodeSent(!isCodeSent);
  };

  const getBack = () => {
    history.push('/SignIn');
  };

  return (
    !isCodeSent ? (
        <UsernameModal getBack={getBack} handleCodeSent={handleCodeSent} username={username} setUsername={setUsername}/>
      ) : (
        <CodeModal getBack={getBack} username={username} setUsername={setUsername}/>
      )
  );
};

export default ForgotPassword;
