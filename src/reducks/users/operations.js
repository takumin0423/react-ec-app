import {signInAction} from './actions';
import {push} from 'connected-react-router';

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    // ログイン済みの場合、早期リターンをする
    if (isSignedIn) {
      return;
    }

    // 非同期処理の仮実装として、githubのAPIを叩く
    const url = 'https://api.github.com/users/takumin0423';
    const response = await fetch(url)
        .then(res => res.json())
        .catch(() => null);

    const userName = response.name;

    dispatch(signInAction({
      isSignedIn: true,
      uid: 10000,
      userName: userName,
    }));

    dispatch(push('/'));
  };
};