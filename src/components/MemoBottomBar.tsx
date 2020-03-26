import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Icon } from '@ui-kitten/components';

import OverflowMenuItem from '../elements/OverflowMenuItem';

export interface Props {
  onPress: () => void;
}

export const MemoBottomBar = (props): React.ReactElement => {
  const { onPress } = props;

  const editIcon = style => (
    <Icon {...style} width={35} height={30} name="edit-outline" />
  );

  return (
    <Layout style={styles.container} level="2">
      <Layout style={styles.editIconLayout}>
        <Button
          style={styles.editButton}
          icon={editIcon}
          appearance="ghost"
          onPress={onPress}
        />
      </Layout>
      <OverflowMenuItem iconSize={28} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    height: 60
  },
  editIconLayout: {
    flex: 1
  },
  editButton: {
    marginLeft: 10,
    width: 60
  }
});

export default MemoBottomBar;
