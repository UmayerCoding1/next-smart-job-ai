"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Input as DefaultInput } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  dropdownValue,
}: {
  handleInput: {
    type: "text" | "textarea" | "file" | "chackbox" | "dropdown" | 'date';
    name: string;
    required?: boolean;
    placeholder?: string;
    value?: string | number;
  };
  label?: boolean;
  dropdownValue?: string[];
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
    <div className="flex flex-col w-full">
      {label && (
        <Label
          htmlFor={handleInput.name}
          className={`${handleInput.required && "after:content-['*']"}`}
        >
          {handleInput.name.charAt(0).toUpperCase() + handleInput.name.slice(1)}
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
      ) : handleInput.type === "dropdown" ? (
        <div className="w-full h-full">
          <Select
        onValueChange={(value) => {
          
          handleChange({
            target: {
              name: handleInput.name,
              value: value,
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
      >          
            <SelectTrigger className="w-full" >
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dropdownValue?.map((item,inx) =>  <SelectItem key={inx} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ) : handleInput.type === 'date' ? <div className="w-full bg-red-50">  
        <CustomDatePicker
  name={handleInput.name}
  value={formdata[handleInput.name]}
  handleChange={handleChange}
  required={handleInput.required}
  className="w-full h-10 p-2 rounded-2xl bg-sky-100 "
/>

      </div> :  (
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
    </div>
  );
};


interface Props {
  name: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
}


const CustomDatePicker = ({ name, value, handleChange, className, required }: Props) => {
  const selectedDate = value ? new Date(value) : null;

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => {
        if (date) {
          // convert to YYYY-MM-DD format
          handleChange({
            target: { name, value: date.toISOString().split("T")[0] },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }}
      minDate={new Date()} // disable past dates
      placeholderText="Select a date"
      className={className || " bg-sky-100  h-10 px-3 py-2 border rounded-md shadow-sm"}
      required={required}
      dateFormat="yyyy-MM-dd"
    />
  );
};