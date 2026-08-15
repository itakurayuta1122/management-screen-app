interface SummaryProps {
  count: number;
}

export const Summary = ({ count }: SummaryProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <p className="text-lg font-semibold text-gray-800">登録ユーザー数: {count}名</p>
    </div>
  );
};
