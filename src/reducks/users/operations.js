import {signInAction} from './actions';
import {push} from 'connected-react-router';
import {auth, firebaseTimestamp, firestore} from '../../firebase';

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    // ログイン済みの場合、早期リターンをする
    if (isSignedIn) {
      return;
    }

    // 非同期処理の仮実装サンプルとして、githubのAPIを叩く
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

// アカウント登録のメソッド
// アカウント登録に必要な情報を引数で受け取る
export const signUp = (userName, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (userName === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です');
      return false;
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致していません');
      return false;
    }

    return auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
          const user = result.user;

          if (!!user) {
            const uid = user.uid;
            const timestamp = firebaseTimestamp.now();

            const userInitialData = {
              createdAt: timestamp,
              updatedAt: timestamp,
              uid: uid,
              userName: userName,
              email: email,
              role: 'customer',
            };

            firestore.collection('users')
                .doc(uid)
                .set(userInitialData)
                .then(() => {
                  dispatch(push('/'));
                })
          }
        });
  };
};