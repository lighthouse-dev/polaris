import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableHighlight,
  View
} from 'react-native';
import { Text } from '@ui-kitten/components';

import { Memo } from '../../screens/memo/MemoListScreen';
import Tag from '../../elements/Tag';

export interface Props {
  memo: Memo;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}

const MemoItem = (props: Props) => {
  const { memo, style, onPress } = props;

  const tagItem = (tagList: string[]) => {
    return (
      <View style={styles.tagLayout}>
        {tagList.map((tag: string, index: number) => {
          return <Tag key={index} text={tag} style={styles.tag} />;
        })}
      </View>
    );
  };

  return (
    <TouchableHighlight onPress={onPress} underlayColor="#FFF">
      <View style={style}>
        <View style={styles.titleLayout}>
          <Text category="h6">{memo.title}</Text>
        </View>
        <View style={styles.contentLayout}>
          <Text>{memo.content.substring(0, 120)} ...</Text>
        </View>
        {memo.tag.length ? tagItem(memo.tag) : null}
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
  },
  tagLayout: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    flexDirection: 'row',
    padding: 15
  },
  tag: {
    backgroundColor: '#E9EFFC',
    marginHorizontal: 5,
    paddingVertical: 2,
    paddingHorizontal: 7,
    color: '#3266FF',
    borderRadius: 10,
    fontSize: 14
  }
});

export default MemoItem;
