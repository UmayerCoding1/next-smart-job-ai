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
import Requirements from "../dashboard/recruiter/post-job/Requirements";

import { RedioMultiSelectCheckbox } from "../form/Redio-selector";
import CustomSwitch from "../form/Switch";


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
  options,
  dynamic_add_list_style
  
}: {
  handleInput: {
    type: "text" | "textarea" | "file" | "chackbox" | "dropdown" | 'date' | 'dynamic_add_list' | 'redio_select';
    name: string;
    required?: boolean;
    placeholder?: string;
    value?: string | number;
    defaultValue?: string | number | boolean;
  };
  label?: boolean;
  options?: string[];
  dynamic_add_list_style?: 'row' | 'column';
  className?: string;
  id?: string;
  accept?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  imageandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const [enabled, setEnabled] = useState(false);
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
              <SelectValue placeholder={`Select a ${handleInput.name}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options?.map((item,inx) =>  <SelectItem key={inx} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ) : handleInput.type === 'date' ? <div className="w-full">  
        <CustomDatePicker
  name={handleInput.name}
  value={formdata[handleInput.name]}
  handleChange={handleChange}
  required={handleInput.required}
/>
</div> : 

handleInput.type === 'dynamic_add_list' ? <div className="w-full">
       <Requirements name={handleInput.name} handleChange={handleChange} style={dynamic_add_list_style || 'column'} />
</div> : handleInput.type === "chackbox" ? (
       <div>
        <CustomSwitch
          name={handleInput.name}
          onChange={handleChange}
          enabled={enabled}
          setEnabled={setEnabled}
        /> 
       </div>
      ) : handleInput.type === 'redio_select' ? <div>
        <RedioMultiSelectCheckbox
  name={handleInput.name}
  value={(formdata[handleInput.name]?.split(",") || [])}
  options={options || []}
  onChange={handleChange}
  required
/>
      </div> :
(
        <DefaultInput
          type={handleInput.type}
          name={handleInput.name}
          required={handleInput.required}
          placeholder={
            handleInput.placeholder ? handleInput.placeholder : handleInput.name
          }
          className={className ? className : "w-full h-10 mb-2"}
          value={formdata[handleInput.name] || handleInput.value || ""}
          defaultValue={formdata[handleInput.name] || handleInput.value || ""}
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
  wrapperClassName="w-full"
    selected={selectedDate}
    onChange={(date: Date | null) => {
      if (date) {
        handleChange({
          target: { name, value: date.toISOString().split("T")[0] },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }}
    minDate={new Date()}
    placeholderText="Select a date"
    className={className || "react-datepicker__input   h-10 px-3 py-2 border rounded-md shadow-sm"}
    required={required}
    dateFormat="yyyy-MM-dd"
  />


  );
};







