import { User } from "@/types/user";
import { UserRow } from "./UserRow";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onSort: (key: keyof User) => void;
  sortConfig: { key: keyof User; direction: 'asc' | 'desc' } | null;
}

export const UserTable = ({ users, onEdit, onDelete, onSort, sortConfig }: UserTableProps) => {
  const getSortIcon = (key: keyof User) => {
    if (!sortConfig || sortConfig.key !== key) return "↕️";
    return sortConfig.direction === "asc" ? "⬆️" : "⬇️";
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="p-2 text-left cursor-pointer" onClick={() => onSort("id")}>ID {getSortIcon("id")}</th>
          <th className="p-2 text-left cursor-pointer" onClick={() => onSort("name")}>名前 {getSortIcon("name")}</th>
          <th className="p-2 text-left cursor-pointer" onClick={() => onSort("age")}>年齢 {getSortIcon("age")}</th>
          <th className="p-2 text-left cursor-pointer" onClick={() => onSort("department")}>部署 {getSortIcon("department")}</th>
          <th className="p-2 text-left">操作</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};
