import React, {useCallback, useState} from 'react';
import {PrimaryButton, TextInput} from '../components/generic';
import {resetPassword} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router'
import SecondaryButton from '../components/generic/SecondaryButton';

const PasswordReset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  return (
      <div className="container">
        <h1 className="text-headline text-center">パスワードリセット</h1>

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

        {/* 空白を表現するためのDOM */}
        <div className="medium-space"/>

        <div className="center">
          <PrimaryButton
              label={'パスワードをリセットする'}
              onClick={() => dispatch(resetPassword(email))}
          />
          <SecondaryButton
              label={'アカウント登録ページ'}
              onClick={() => dispatch(push('/signup'))}
          />
          <SecondaryButton
              label={'ログインページ'}
              onClick={() => dispatch(push('/signin'))}
          />
        </div>
      </div>
  );
};

export default PasswordReset;