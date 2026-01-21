type Props = {
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
};

export default function Input({ value, onChange, placeholder }: Props) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 w-full rounded"
    />
  );
}
