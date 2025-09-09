"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Input as DefaultInput } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

type AppFormProps = {
  children: React.ReactNode;
  submitFn: (data: { [key: string]: string }) => void;
};

interface FormContextProps {
  formdata: { [key: string]: string };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const AppFormProvider = createContext<FormContextProps | null>(null);

const AppForm = ({ children, submitFn }: AppFormProps) => {
  const [formdata, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    cb: (cb: { [key: string]: string }) => void
  ) => {
    e.preventDefault();
    cb(formdata);
  };
  return (
    <AppFormProvider.Provider value={{ formdata, handleChange }}>
      <form
        onSubmit={(e) => handleSubmit(e, submitFn)}
        className="flex flex-col gap-3"
      >
        {children}
      </form>
    </AppFormProvider.Provider>
  );
};

export default AppForm;

// ---------------------

export const Input = ({
  handleInput,
  className,
  id,
  accept,
  ref,
  imageandleChange,
  label,
}: {
  handleInput: {
    type: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    value?: string | number;
  };
  label?: boolean;
  className?: string;
  id?: string;
  accept?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  imageandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const context = useContext(AppFormProvider);

  if (!context) {
    throw new Error("Input must be used within an AppFormProvider");
  }

  const { formdata, handleChange } = context;

  useEffect(() => {
    if (handleInput.value && formdata[handleInput.name] === undefined) {
      handleChange({
        target: {
          name: handleInput.name,
          value: handleInput.value,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [formdata, handleInput, handleChange]);

  return (
    <>
      {label && (
        <Label htmlFor={handleInput.name}>
          {handleInput.name.toUpperCase()}
        </Label>
      )}
      {handleInput.type === "textarea" ? (
        <Textarea
          value={formdata[handleInput.name] || handleInput.value || ""}
          name={handleInput.name}
          onChange={handleChange}
          className={`${
            className ? className : "w-full h-40 resize-none mb-2"
          }`}
          placeholder={
            handleInput.placeholder ? handleInput.placeholder : handleInput.name
          }
        />
      ) : handleInput.type === "file" ? (
        <DefaultInput
          type={handleInput.type}
          name={handleInput.name}
          required={handleInput.required}
          placeholder={
            handleInput.placeholder ? handleInput.placeholder : handleInput.name
          }
          className={className ? className : "w-full h-10 mb-2"}
          value={formdata[handleInput.name] || handleInput.value || ""}
          onChange={imageandleChange}
          id={id}
          accept={accept}
          ref={ref}
        />
      ) : (
        <DefaultInput
          type={handleInput.type}
          name={handleInput.name}
          required={handleInput.required}
          placeholder={
            handleInput.placeholder ? handleInput.placeholder : handleInput.name
          }
          className={className ? className : "w-full h-10 mb-2"}
          value={formdata[handleInput.name] || handleInput.value || ""}
          onChange={handleChange}
        />
      )}
    </>
  );
};
