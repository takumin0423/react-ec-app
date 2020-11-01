import {signInAction} from './actions';
import {push} from 'connected-react-router';
import {auth, firebaseTimestamp, firestore} from '../../firebase';

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
                });
          }
        });
  };
};

// ログインのメソッド
// ログインに必要な情報を引数で受け取る
export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('必須項目が未入力です');
      return false;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(result => {
          const user = result.user;

          if (!!user) {
            const uid = user.uid;

            firestore.collection('users')
                .doc(uid)
                .get()
                .then(snapshot => {
                  const data = snapshot.data();

                  dispatch(signInAction({
                    isSignedIn: true,
                    role: data.role,
                    uid: data.uid,
                    userName: data.userName,
                  }));

                  dispatch(push('/'));
                });
          }
        });
  };
};