
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
     <div className="w-full mt-4 border-t p-1">
      <div className="grid grid-cols-2 gap-3">
       {options.map((option) => {
          const uniqueValue = option; // ekhane tumi companyId + "-" + name korte paro jodi duplicate thake
          return (
            <div key={uniqueValue} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={uniqueValue}
                value={uniqueValue}
                checked={value.includes(uniqueValue)}
                onChange={() => toggleValue(uniqueValue)}
              />
              <Label htmlFor={uniqueValue}>{option}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};