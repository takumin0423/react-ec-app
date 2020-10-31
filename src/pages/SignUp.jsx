import React, {useCallback, useState} from 'react';
import {TextInput} from '../components/generic';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const inputUserName = useCallback((event) => {
    setUserName(event.target.value);
  }, [setUserName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, [setConfirmPassword]);

  return (
      <div className="container">
        <h2 className="text-headline text-center">アカウント登録</h2>

        {/* 空白を表現するためのDOM */}
        <div className="medium-space"/>

        <TextInput
            fullWidth={true}
            label={'ユーザー名'}
            multiline={false}
            required={true}
            rows={1}
            value={userName}
            type={'text'}
            onChange={inputUserName}
        />

        <TextInput
            fullWidth={true}
            label={'メールアドレス'}
            multiline={false}
            required={true}
            rows={1}
            value={email}
            type={'email'}
            onChange={inputEmail}
        />

        <TextInput
            fullWidth={true}
            label={'パスワード'}
            multiline={false}
            required={true}
            rows={1}
            value={password}
            type={'password'}
            onChange={inputPassword}
        />

        <TextInput
            fullWidth={true}
            label={'パスワード(再確認)'}
            multiline={false}
            required={true}
            rows={1}
            value={confirmPassword}
            type={'password'}
            onChange={inputConfirmPassword}
        />
      </div>
  );
};

export default SignUp;