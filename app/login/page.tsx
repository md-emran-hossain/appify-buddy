"use client";

import { type FormEvent, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { useAuth } from "@/lib/auth-context";
import { authApi } from "@/lib/api";

import loginImg from "@/public/assets/images/login.png";
import logoImg from "@/public/assets/images/logo.svg";
import googleImg from "@/public/assets/images/google.svg";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") ?? "/feed";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push(callbackUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const leftContent = (
    <div>
      <Image
        src={loginImg}
        alt="Login Illustration"
        className="left_img img-fluid w-100 d-block"
        priority
      />
    </div>
  );

  return (
    <AuthLayout leftContent={leftContent}>
      <div className="bg-theme-card p-4 p-lg-5 rounded-3 mt-4 mt-lg-0 text-center text-lg-start">
        <div className="mb-4 text-center">
          <Image
            src={logoImg}
            alt="Buddy Script Logo"
            className="left_logo img-fluid w-100 d-block"
          />
        </div>
        <p className="text-center fw-normal lh-sm text-body mb-4">
          Welcome back
        </p>

        <a
          href={authApi.googleRedirect()}
          className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 mb-5 py-2"
        >
          <Image
            src={googleImg}
            alt="Google logo"
            className="me-2"
            width={20}
          />
          Sign-in with Google
        </a>

        <form className="social_login_form text-start" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="row">
            <div className="col-12">
              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-2">
                <label htmlFor="password" className="form-label fw-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-check social_login_form_check text-center text-md-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label
                  className="form-check-label small fw-normal"
                  htmlFor="rememberMe"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="social_login_forget">
                <Link href="#" className="small text-primary">
                  Forget password?
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Login now"}
              </button>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col-12">
            <p className="text-center small">
              Don&apos;t have an account?{" "}
              <Link href="/registration" className="text-primary">
                Create new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
