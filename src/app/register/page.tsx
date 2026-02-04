"use client";

import { useState } from "react";
import {
  AuthFormContainer,
  FormInput,
  FormButton,
} from "@/Components/AuthForm";
import PersonalizedLink from "@/Components/PersonalizedLink";
import { redirect } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }).then((res) => {
      redirect("/login");
    });
  };

  return (
    <AuthFormContainer title="Registrar">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="register-username"
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          id="register-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          id="register-password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          id="register-confirm-password"
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="pt-2">
          <FormButton
            disabled={password !== confirmPassword || !username || !email}
          >
            Register
          </FormButton>
        </div>
      </form>
      <PersonalizedLink
        path="/login"
        text="Already have a account? Click here!"
      />
    </AuthFormContainer>
  );
}
