import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';
import TextInputItem from '../elements/TextInputItem';

export const MemoEditScreen = (props): React.ReactElement => {
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');

  useEffect(() => {
    const { params } = props.navigation.state;
    setTitle(params.memo.title);
    setBody(params.memo.content);
  }, []);

  return (
    <Layout style={styles.container}>
      <TextInputItem
        style={styles.memoTitleInput}
        value={title}
        onChangeText={text => setTitle(text)}
        textAlignVertical="center"
        placeholder="タイトル"
      />
      <TextInputItem
        style={styles.memoEditInput}
        value={body}
        onChangeText={text => setBody(text)}
        textAlignVertical="top"
        multiline={true}
        placeholder="メモを入力してください"
      />
      <CircleButton
        iconName="edit-outline"
        onPress={() => {
          // TODO: Edit処理作成
        }}
      />
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  memoTitleInput: {
    backgroundColor: '#FFF',
    padding: 16,
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  memoEditInput: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16
  }
});

export default MemoEditScreen;
