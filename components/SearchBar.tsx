interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="ユーザーを検索..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded w-full"
    />
  );
};
