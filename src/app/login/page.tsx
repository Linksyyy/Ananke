"use client";

import { useState } from "react";
import {
  AuthFormContainer,
  FormInput,
  FormButton,
} from "@/Components/AuthForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <AuthFormContainer title="Enter">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="login-email"
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          id="login-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="pt-2">
          <FormButton>Confirm</FormButton>
        </div>
      </form>
    </AuthFormContainer>
  );
}
