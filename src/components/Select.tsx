import { generateId } from "../utils/apps.utils";

export default function Select({ name, onChange = () => { }, value, required = false, disabled = false, label, select="Select one", options = [] }: SelectPropTypes) {
  const id = generateId();
  return (
    <>
      {label && (
        <label htmlFor={id} className="text-sm lg:text-base font-medium">
          {label}
        </label>
      )}
      <select name={name} disabled={disabled} onChange={(e: any) => onChange(e)} defaultValue={value} required={required} className="outline-none h-10 lg:h-12  items-center block p-2.5 lg:pl-4 border rounded text-base font-normal w-full focus:ring-neutral-800 focus:border-black focus:border-2 mb-6 mt-2">
        <option defaultChecked disabled value={''}>{select}</option>
        {options.map((option: string | { name: string; value: string }, key: number) => (
          <option value={typeof option === 'string' ? option : option.value} key={key}>
            {typeof option === 'string' ? option : option.name}
          </option>
        ))}
      </select>
    </>
  )
}

interface SelectPropTypes {
  label?: string;
  value?: string | number;
  required?: boolean;
  name: string;
  select?: string;
  disabled?: boolean;
  options?: string[] | { name: string; value: string }[];
  onChange?: Function;
}