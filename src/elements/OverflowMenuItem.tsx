import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, OverflowMenu, Icon } from '@ui-kitten/components';

export interface Props {
  iconSize: number;
  onPress?: () => void;
}

const OverflowMenuItem = (props: Props) => {
  const { iconSize } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);

  const menuIcon = style => (
    <Icon
      {...style}
      width={iconSize}
      height={iconSize}
      name="more-vertical-outline"
    />
  );
  const TrashIcon = () => <Icon name="trash-outline" />;
  const data = [{ title: 'メモ削除', icon: TrashIcon }];

  const onItemSelect = index => {
    setMenuVisible(false);
    // TODO: 削除機能実装
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <Layout>
      <OverflowMenu
        backdropStyle={styles.backdrop}
        data={data}
        visible={menuVisible}
        onSelect={onItemSelect}
        onBackdropPress={toggleMenu}
      >
        <Button appearance="ghost" icon={menuIcon} onPress={toggleMenu} />
      </OverflowMenu>
    </Layout>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default OverflowMenuItem;
