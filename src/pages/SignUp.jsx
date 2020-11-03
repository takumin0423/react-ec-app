import React, {useCallback, useState} from 'react';
import {signUp} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import TextInput from '../components/generic/TextInput';
import PrimaryButton from '../components/generic/PrimaryButton';
import SecondaryButton from '../components/generic/SecondaryButton';

const SignUp = () => {
  const dispatch = useDispatch();

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
        <h1 className="text-headline text-center">アカウント登録</h1>

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
            label={'パスワード(6文字以上の英数字)'}
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

        {/* 空白を表現するためのDOM */}
        <div className="medium-space"/>

        <div className="center">
          <PrimaryButton
              label={'アカウントを登録する'}
              onClick={() => dispatch(signUp(userName, email, password, confirmPassword))}
          />
          <SecondaryButton
            label={'ログインページ'}
            onClick={() => dispatch(push('/signin'))}
          />
          <SecondaryButton
              label={'パスワードリセットページ'}
              onClick={() => dispatch(push('/reset'))}
          />
        </div>
      </div>
  );
};

export default SignUp;