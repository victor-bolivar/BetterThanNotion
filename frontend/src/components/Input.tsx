import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

type InputProps = {
  id: string;
  label: string;
  type?: 'input' | 'textarea';
  register: UseFormRegister<any>;
  errors: FieldErrors;
  defaultValue?: string;
  validationRules?: Record<string, any>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'input',
  register,
  errors,
  defaultValue = '',
  validationRules,
}) => {

    const commonStyles = "w-full border p-2"

  return (
    <div className="text-left flex flex-col gap-1">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          className={commonStyles}
          defaultValue={defaultValue}
          {...register(id, validationRules)}
        />
      ) : (
        <input
          id={id}
          className={commonStyles}
          defaultValue={defaultValue}
          {...register(id, validationRules)}
        />
      )}
      {errors[id] && <p className="text-red-700">{errors[id]?.message}</p>}
    </div>
  );
};

export default Input;
