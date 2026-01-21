type Props = {
  headers: string[];
  children: React.ReactNode;
};
export default function Table({ headers, children }: Props) {
  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="border p-2 text-left bg-gray-50">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
