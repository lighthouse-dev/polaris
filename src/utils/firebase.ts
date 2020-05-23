import firebase from 'firebase';
import 'firebase/firestore';
import ENV from '../../env.json';

import { Todo, TodoList } from '../screens/todo/TodoListScreen';
import { MemoList } from '../screens/memo/MemoListScreen';
import { Memo } from '../screens/memo/MemoListScreen';

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.FIREBASE_APPID,
  measurementId: ENV.FIREBASE_MEASUREMENT_ID
};

const initFirebase = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const initialFirebase = firebase.app();
const db = initialFirebase.firestore();
const auth = initialFirebase.auth();

const updateTodoCompleted = (key: string, checked: boolean): Promise<void> => {
  return db
    .collection(`groups/${auth.currentUser.uid}:default/todos`)
    .doc(key)
    .update({ completed: checked })
    .catch(err => {
      console.error(err);
    });
};

const updateTodoDetail = (key: string, todo: Todo): Promise<void> => {
  return db
    .collection(`groups/${auth.currentUser.uid}:default/todos`)
    .doc(key)
    .update(todo)
    .catch(err => {
      console.error(err);
    });
};

const getTodoList = (
  setTodoList: React.Dispatch<React.SetStateAction<TodoList | []>>
) => {
  // TODO: 日付でsort
  return db
    .collection(`groups/${auth.currentUser.uid}:default/todos`)
    .where('completed', '==', false)
    .onSnapshot(
      snapshot => {
        const tempTodoList: TodoList = [];

        snapshot.forEach(doc => {
          tempTodoList.push({ key: doc.id, ...doc.data() } as Todo);
        });

        setTodoList(tempTodoList);
      },
      err => {
        console.error(`getTodoList:-  ${err}`);
      }
    );
};

const addTodo = (title: string): Promise<void> => {
  const currentDate = new Date();
  // TODO: title以外の情報もちゃんと入るようにする
  const data: Todo = {
    title: title,
    detail: null,
    completed: false,
    tag: [],
    priority: 1,
    person: 'julee',
    deadline: currentDate,
    creator: auth.currentUser.uid,
    create_date: currentDate,
    updater: auth.currentUser.uid,
    update_date: currentDate
  };

  // TODO: firebase関連処理を一つのファイル（utils?）にまとめる
  return db
    .collection(`groups/${auth.currentUser.uid}:default/todos`)
    .doc()
    .set(data)
    .catch(err => {
      console.error(err);
    });
};

const deleteTodo = (key: string): Promise<void> => {
  return db
    .collection(`groups/${auth.currentUser.uid}:default/todos`)
    .doc(key)
    .delete()
    .catch(err => {
      console.error(err);
    });
};

const getMemoList = (
  setMemoList: React.Dispatch<React.SetStateAction<MemoList | []>>
) => {
  return db
    .collection(`groups/${auth.currentUser.uid}:default/memos`)
    .onSnapshot(
      snapshot => {
        const tempMemoList: MemoList = [];

        snapshot.forEach(doc => {
          tempMemoList.push({ key: doc.id, ...doc.data() } as Memo);
        });

        setMemoList(tempMemoList);
      },
      err => {
        console.error(`getMemoList:-  ${err}`);
      }
    );
};

export {
  initFirebase,
  updateTodoCompleted,
  updateTodoDetail,
  getTodoList,
  addTodo,
  deleteTodo,
  getMemoList
};
