import React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import { CardHeader, Card, Text } from '@ui-kitten/components';
import { Memo } from '../screens/MemoListScreen';

export interface CardItemItemProps {
  memo: Memo;
  style: StyleProp<ViewStyle>;
}

const CardItem = (props: CardItemItemProps) => {
  const { memo, style } = props;

  const Header = () => <CardHeader title={memo.title} />;
  return (
    <Card style={style} header={Header} key={memo.index}>
      <Text>{memo.content.substring(0, 120)} ...</Text>
      <View>
        {/* TODO: Tag表示できるように対応 */}
        <Text>{memo.tag}</Text>
      </View>
    </Card>
  );
};

export default CardItem;
