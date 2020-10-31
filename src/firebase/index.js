// 各firebaseサービスのエントリーポイント
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);

// 各firebaseサービスのメソッドを定数化
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const firebaseTimestamp = firebase.firestore.Timestamp;