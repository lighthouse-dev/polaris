import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableHighlight,
  View
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { Memo } from '../screens/memo/MemoListScreen';

export interface Props {
  memo: Memo;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}

const CardItem = (props: Props) => {
  const { memo, style, onPress } = props;

  return (
    <TouchableHighlight key={memo.index} onPress={onPress} underlayColor="#FFF">
      <View style={style}>
        <View style={styles.titleLayout}>
          <Text category="h6">{memo.title}</Text>
        </View>
        <View style={styles.contentLayout}>
          <Text>{memo.content.substring(0, 120)} ...</Text>
          {/* TODO: Tag表示できるように対応 */}
          <Text>{memo.tag}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  titleLayout: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    padding: 15
  },
  contentLayout: {
    padding: 15
  }
});

export default CardItem;
