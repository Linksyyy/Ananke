"use client";

import { useState } from "react";
import {
  AuthFormContainer,
  FormInput,
  FormButton,
} from "@/Components/AuthForm";
import Link from "next/link";
import PersonalizedLink from "@/Components/PersonalizedLink";
import { redirect } from "next/navigation";
import { useUser } from "@/store/userStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res.user);
        redirect("/krisis");
      });
  }

  return (
    <AuthFormContainer title="Enter">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="login-username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          id="login-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="pt-2">
          <FormButton disabled={!username || password.length < 4}>
            Confirm
          </FormButton>
        </div>
      </form>

      <PersonalizedLink
        path="/register"
        text="Dont have any account? Click here!"
      />
    </AuthFormContainer>
  );
}
