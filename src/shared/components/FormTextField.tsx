// shared/components/FormTextField.tsx
import { Control, Controller, FieldValues, Path } from "react-hook-form"

import { TextField, TextFieldProps } from "./TextField"

interface FormTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, "value" | "onChangeText"> {
  control: Control<T>
  name: Path<T>
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  ...textFieldProps
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          {...textFieldProps}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          status={error ? "error" : undefined}
          helper={error?.message}
        />
      )}
    />
  )
}
