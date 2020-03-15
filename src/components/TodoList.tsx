import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList
} from 'react-native';
import { List, CheckBox, Layout } from '@ui-kitten/components';

const dateString = date => {
  if (date == null) {
    return '';
  }

  return date
    .toDate()
    .toISOString()
    .split('T')[0];
};

class TodoList extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    await Font.loadAsync({ FontAwesome: fontAwesome });
    this.setState({ fontLoaded: true });
  }

  todoItem({ item, index }) {
    const onCheckedChange = isChecked => {
      item.completed = !!item.completed;
    };
    return (
      <Layout>
        <CheckBox
          text={item.title.substring(0, 20)}
          checked={item.completed}
          onChange={onCheckedChange}
        />
      </Layout>
    );
  }

  render() {
    return (
      <View style={styles.todoList}>
        <List
          data={this.props.todoList}
          renderItem={this.todoItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todoList: {
    width: '100%',
    flex: 1
  },
  todoListItem: {
    marginBottom: -7
  },
  todoTitle: {
    fontSize: 18,
    marginBottom: 4
  },
  todoDate: {
    fontSize: 12,
    color: '#a2a2a2'
  },
  unChecked: {
    fontFamily: 'FontAwesome',
    fontSize: 25,
    lineHeight: 32,
    color: '#3F52B5'
  }
});

export default TodoList;
