import { User } from "@/types/user";

interface UserRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

export const UserRow = ({ user, onEdit, onDelete }: UserRowProps) => {
  return (
    <tr className="border-b">
      <td className="p-2">{user.id}</td>
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.age}</td>
      <td className="p-2">{user.department}</td>
      <td className="p-2 flex gap-2">
        <button 
          onClick={() => onEdit(user)}
          className="text-blue-500 hover:text-blue-700"
        >
          編集
        </button>
        <button 
          onClick={() => onDelete(user.id)}
          className="text-red-500 hover:text-red-700"
        >
          削除
        </button>
      </td>
    </tr>
  );
};
