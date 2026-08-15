"use client";

import { useState, useEffect, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { UserForm } from "@/components/UserForm";
import { UserTable } from "@/components/UserTable";
import { Summary } from "@/components/Summary";
import { User } from "@/types/user";

const initialUsers: User[] = [
  { id: 1, name: "山田 太郎", age: 30, department: "営業部" },
  { id: 2, name: "佐藤 花子", age: 25, department: "開発部" },
  { id: 3, name: "鈴木 一郎", age: 40, department: "人事部" },
];

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null);

  // 初回レンダリング時にlocalStorageから読み込み
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      const parsed = JSON.parse(savedUsers);
      // 配列であり、かつ中身がある場合のみセットする
      if (Array.isArray(parsed) && parsed.length > 0) {
        setUsers(parsed);
      } else {
        setUsers(initialUsers);
      }
    } else {
      setUsers(initialUsers);
    }
    setIsLoaded(true);
  }, []);

  // users が変更されるたびに localStorage へ保存
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("users", JSON.stringify(users));
  }, [users, isLoaded]);

  // users, searchTerm が変更されたときのみ再計算
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // filteredUsers, sortConfig が変更されたときのみ再計算
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  const requestSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const addUser = (newUser: Omit<User, "id">) => {
    const userWithId = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    };
    setUsers([...users, userWithId]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
  };

  const deleteUser = (userId: number) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">ユーザー管理画面</h1>
      
      <div className="grid gap-6">
        <Summary count={users.length} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <UserForm 
          onAddUser={addUser} 
          onUpdateUser={updateUser}
          editingUser={editingUser}
          onCancelEdit={() => setEditingUser(null)}
        />
        <UserTable 
          users={sortedUsers} 
          onEdit={setEditingUser} 
          onDelete={deleteUser}
          onSort={requestSort}
          sortConfig={sortConfig}
        />
      </div>
    </main>
  );
}
