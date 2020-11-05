import React, {useCallback, useState} from 'react';
import {signIn} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import TextInput from '../components/generic/TextInput';
import PrimaryButton from '../components/generic/PrimaryButton';
import SecondaryButton from '../components/generic/SecondaryButton';

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  return (
      <div className="container">
        <h1 className="text-headline text-center">ログイン</h1>

        {/* 空白を表現するためのDOM */}
        <div className="medium-space"/>

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

        {/* 空白を表現するためのDOM */}
        <div className="medium-space"/>

        <div className="center">
          <PrimaryButton
              label={'ログイン'}
              onClick={() => dispatch(signIn(email, password))}
          />
          <SecondaryButton
              label={'アカウント登録ページ'}
              onClick={() => dispatch(push('/signup'))}
          />
          <SecondaryButton
              label={'パスワードリセットページ'}
              onClick={() => dispatch(push('/reset'))}
          />

          <div className="medium-space"/>

          <div>
            <p>サンプルユーザーID : sample0@sample.com</p>
            <p>サンプルユーザーPASSWORD : password</p>
          </div>
        </div>
      </div>
  );
};

export default SignIn;