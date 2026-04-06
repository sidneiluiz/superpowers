"use client";

import { useEffect, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "page_view",
        source: "landing_page",
        path: window.location.pathname,
      }),
    });
  }, []);

  async function submitSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "form_submission",
        source: "landing_page",
        path: "/",
      }),
    });

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        firstName,
        source: "landing_page",
      }),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Nao foi possivel enviar agora. Tente novamente em instantes.");
      return;
    }

    setStatus("success");
    setMessage("Inscricao concluida. Confira sua caixa de entrada.");
    setEmail("");
    setFirstName("");
  }

  return (
    <form
      onSubmit={submitSignup}
      className="grid w-full max-w-md gap-3 rounded-2xl bg-white/90 p-5 shadow-lg shadow-sky-900/10"
    >
      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Nome
        <input
          className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-sky-400 transition focus:ring-2"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          name="firstName"
          placeholder="Seu nome"
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Email
        <input
          className="rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-sky-400 transition focus:ring-2"
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="voce@email.com"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 rounded-xl bg-sky-700 px-4 py-2 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Enviando..." : "Quero receber novidades"}
      </button>

      {message ? <p className="text-sm text-slate-700">{message}</p> : null}
    </form>
  );
}
