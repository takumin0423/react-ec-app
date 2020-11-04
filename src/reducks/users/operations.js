import {signInAction, signOutAction} from './actions';
import {push} from 'connected-react-router';
import {auth, firebaseTimestamp, firestore} from '../../firebase';

// アカウント登録のメソッド
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

    // 入力されたメールアドレスとパスワードでアカウント登録をする
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
export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('必須項目が未入力です');

      return false;
    }

    // 入力されたメールアドレスとパスワードでログインをする
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

// ログアウトのメソッド
export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
        .then(() => {
          dispatch(signOutAction());

          dispatch(push('/signin'));
        });
  };
};

// 認証状態を監視するメソッド
export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
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
            });
      } else {
        dispatch(push('/signin'));
      }
    });
  };
};

// パスワードをリセットするメソッド
export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === '') {
      alert('必須項目が未入力です');
      return false;
    } else {
      auth.sendPasswordResetEmail(email)
          .then(() => {
            alert('パスワードリセット用のメールを入力されたメールアドレス宛に送信しました！');
            dispatch('/signin')
          }).catch(() => {
            alert('パスワードリセット用のメールの送信に失敗しました')
      })
    }
  };
};