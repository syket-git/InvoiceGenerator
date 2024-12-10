import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface TextInputWithLabelProps extends TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  withoutLabel?: boolean;
  containerClassName: string;
  className?: string;
}

const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  label,
  value,
  onChangeText,
  withoutLabel,
  containerClassName,
  className,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust offset as needed
    >
      <View className={containerClassName}>
        {!withoutLabel && label && <Text className="mb-2 text-lg font-bold">{label}</Text>}
        <TextInput
          className={`${className ? className : ''} rounded-md border border-gray-300 px-3 py-2 text-base`}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default TextInputWithLabel;
