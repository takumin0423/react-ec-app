import React from 'react';
import {TextInput} from '../components/generic';

const SignUp = () => {
  return (
      <div className="container">
        <h2 className="text-headline text-center">アカウント登録</h2>

        {/* 空白を表現するためのDOM */}
        <div className="medium-space"/>

        <TextInput/>
      </div>
  );
};

export default SignUp;