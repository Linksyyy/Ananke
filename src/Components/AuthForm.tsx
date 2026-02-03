"use client";

import React from "react";

export const FormInput = ({ id, type, placeholder, value, onChange }: { id: string; type: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
  <input
    id={id}
    type={type}
    className="mt-1 block w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-white transition-all"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
  />
);

export const FormButton = ({ children }: { children: React.ReactNode }) => (
  <button
    type="submit"
    className="w-full flex justify-center py-3 px-4 border border-purple-700 rounded-md shadow-sm text-base font-medium text-purple-400 bg-purple-900/20 hover:bg-purple-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-purple-500 transition-colors duration-300"
  >
    {children}
  </button>
);

export const AuthFormContainer = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground p-4">
    <div className="w-full max-w-md">
      <div className="flex flex-col justify-center p-8 rounded-lg border border-neutral-800 bg-neutral-900/50">
        <h2 className="text-3xl font-light text-center text-white mb-8 pointer-events-none select-none">{title}</h2>
        {children}
      </div>
    </div>
  </main>
);
