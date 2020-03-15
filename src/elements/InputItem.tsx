import React from 'react';
import { Input } from '@ui-kitten/components';

const InputItem = () => {
  const [value, setValue] = React.useState('');

  return (
    <Input
      placeholder="Place your Text"
      value={value}
      onChangeText={setValue}
    />
  );
};

export default InputItem;
