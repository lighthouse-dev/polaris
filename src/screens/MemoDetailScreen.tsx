import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import CircleButton from '../elements/CircleButton';

export const MemoDetailScreen = (props): React.ReactElement => {
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const [createDate, setCreateDate] = React.useState<string>(null);

  const dateString = date => {
    if (date == null) {
      return '';
    }

    return date
      .toDate()
      .toISOString()
      .split('T')[0];
  };

  useEffect(() => {
    const { params } = props.navigation.state;
    setTitle(params.memo.title);
    setBody(params.memo.content);
    setCreateDate(params.memo.create_date);
  }, []);

  return (
    <Layout style={styles.container}>
      <View>
        <View style={styles.memoHeader}>
          <View>
            <Text category="h2">{title ? title.substring(0, 10) : ''}</Text>
            <Text category="c2">{dateString(createDate)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.memoContent}>
        <Text style={styles.memoBody}> {body} </Text>
      </View>
      <CircleButton
        iconName="edit-outline"
        onPress={() => {
          props.navigation.push('MemoEditScreen', {
            memo: props.navigation.state.params.memo
          });
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  memoHeader: {
    height: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    padding: 16,
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  memoContent: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    backgroundColor: '#FFF'
  },
  memoBody: {
    fontSize: 15,
    lineHeight: 25
  }
});

export default MemoDetailScreen;