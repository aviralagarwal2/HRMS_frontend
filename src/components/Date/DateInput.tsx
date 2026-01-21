type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

/** Date input component */
export default function DateInput({ value, onChange, placeholder }: Props) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border p-2 rounded w-full"
    />
  );
}
