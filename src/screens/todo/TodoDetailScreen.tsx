import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

export const TodoDetailScreen = (props): React.ReactElement => {
  const [title, setTitle] = React.useState<string>('');

  useEffect(() => {
    const { params } = props.navigation.state;
    setTitle(params.todo.title);
  }, []);

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Text> {title}</Text>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  }
});

export default TodoDetailScreen;
