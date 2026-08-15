"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/user";

interface UserFormProps {
  onAddUser: (user: Omit<User, "id">) => void;
  onUpdateUser: (user: User) => void;
  editingUser: User | null;
  onCancelEdit: () => void;
}

export const UserForm = ({ onAddUser, onUpdateUser, editingUser, onCancelEdit }: UserFormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setAge(String(editingUser.age));
      setDepartment(editingUser.department);
    } else {
      setName("");
      setAge("");
      setDepartment("");
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !department) return;

    if (editingUser) {
      onUpdateUser({ ...editingUser, name, age: Number(age), department });
    } else {
      onAddUser({ name, age: Number(age), department });
    }
    
    setName("");
    setAge("");
    setDepartment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 p-4 border rounded">
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="number"
        placeholder="年齢"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="text"
        placeholder="部署"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingUser ? "更新" : "追加"}
      </button>
      {editingUser && (
        <button type="button" onClick={onCancelEdit} className="bg-gray-500 text-white p-2 rounded">
          キャンセル
        </button>
      )}
    </form>
  );
};
