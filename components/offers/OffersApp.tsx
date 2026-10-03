"use client";

import { useEffect, useState, type FormEvent } from "react";
import OfferEditor from "./OfferEditor";

// Frontend-only sign-in, as requested: it keeps casual visitors out of the
// editor but is NOT security — the credentials ship in this file, so anyone
// reading the page source can get in. Nothing here is secret anyway (the
// editor only edits text in the visitor's own browser). For real protection,
// reuse the server-checked /admin login (lib/adminAuth.ts).
const USERNAME = "grapevine";
const PASSWORD = "offers2026";
const SESSION_KEY = "gv-offers-session";

export default function OffersApp() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setSignedIn(localStorage.getItem(SESSION_KEY) === "1");
    } catch {
      setSignedIn(false);
    }
  }, []);

  function signOut() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
    setSignedIn(false);
  }

  if (signedIn === null) return <div className="offer-loading" />;
  if (signedIn) return <OfferEditor onSignOut={signOut} />;
  return <SignIn onSignedIn={() => setSignedIn(true)} />;
}

function SignIn({ onSignedIn }: { onSignedIn: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (username.trim().toLowerCase() === USERNAME && password === PASSWORD) {
      try {
        localStorage.setItem(SESSION_KEY, "1");
      } catch {}
      onSignedIn();
    } else {
      setError(true);
    }
  }

  return (
    <main className="signin">
      <div className="signin-label">შეთავაზება · Offer</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="wordmark signin-wordmark" src="/offers/wordmark-dark.svg" alt="Grapevine" />
      <form className="signin-card" onSubmit={submit} noValidate>
        <h1>შესვლა · Sign in</h1>
        <label htmlFor="offer-user">მომხმარებელი · Username</label>
        <input
          id="offer-user"
          autoComplete="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(false);
          }}
          required
        />
        <label htmlFor="offer-pass">პაროლი · Password</label>
        <input
          id="offer-pass"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          required
        />
        {error && (
          <p className="signin-error" role="alert">
            მომხმარებელი ან პაროლი არასწორია. · Wrong username or password.
          </p>
        )}
        <button type="submit">შესვლა · Sign in</button>
      </form>
    </main>
  );
}
