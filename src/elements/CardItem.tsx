import React from 'react';
import { StyleProp, ViewStyle, View, TouchableHighlight } from 'react-native';
import { CardHeader, Card, Text } from '@ui-kitten/components';
import { Memo } from '../screens/memo/MemoListScreen';

export interface Props {
  memo: Memo;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
}

const CardItem = (props: Props) => {
  const { memo, style, onPress } = props;

  const Header = () => <CardHeader title={memo.title} />;
  return (
    <Card style={style} header={Header} key={memo.index}>
      <TouchableHighlight onPress={onPress} underlayColor="#FFF">
        <View>
          <Text>{memo.content.substring(0, 120)} ...</Text>
          {/* TODO: Tag表示できるように対応 */}
          <Text>{memo.tag}</Text>
        </View>
      </TouchableHighlight>
    </Card>
  );
};

export default CardItem;
