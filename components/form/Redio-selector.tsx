import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type RedioMultiSelectProps = {
  name: string;
  value: string[]; // multiple selections
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export const RedioMultiSelectCheckbox = ({
  name,
  value,
  options,
  onChange,
  required,
}: RedioMultiSelectProps) => {
  const toggleValue = (option: string) => {
    const newValues = value.includes(option)
      ? value.filter((item) => item !== option) // remove if exists
      : [...value, option];
    // mimic event so it works with your form context
    onChange({
      target: { name, value: newValues.join(",") }, // store as comma string
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="w-full mt-4">
      

      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={value.includes(option)}
              onCheckedChange={() => toggleValue(option)}
            />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};