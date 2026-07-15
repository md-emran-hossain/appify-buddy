"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { useAuth } from "@/lib/auth-context";
import { authApi } from "@/lib/api";

import regImg from "@/public/assets/images/registration.png";
import regDarkImg from "@/public/assets/images/registration1.png";
import logoImg from "@/public/assets/images/logo.svg";
import googleImg from "@/public/assets/images/google.svg";

export default function RegistrationPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms & conditions");
      return;
    }

    setSubmitting(true);
    try {
      await register({ firstName, lastName, email, password });
      router.push("/feed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const leftContent = (
    <>
      <div className="d-theme-dark-none">
        <Image
          src={regImg}
          alt="Registration Illustration"
          priority
          className="img-fluid w-100 d-block"
        />
      </div>
      <div className="d-theme-dark-block">
        <Image
          src={regDarkImg}
          alt="Registration Dark Illustration"
          priority
          className="img-fluid w-100 d-block"
        />
      </div>
    </>
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
          Create a new account
        </p>

        <a
          href={authApi.googleRedirect()}
          className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 mb-5 py-2"
        >
          <Image
            src={googleImg}
            alt="Google Logo"
            className="me-2"
            width={20}
          />
          Register with Google
        </a>

        <form className="text-start" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="form-control"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="regEmail" className="form-label">
                  Email
                </label>
                <input
                  id="regEmail"
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="regPassword" className="form-label">
                  Password
                </label>
                <input
                  id="regPassword"
                  type="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="regRepeatPassword" className="form-label">
                  Repeat Password
                </label>
                <input
                  id="regRepeatPassword"
                  type="password"
                  className="form-control"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-check text-center text-md-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agreeTerms"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label
                  className="form-check-label small fw-normal"
                  htmlFor="agreeTerms"
                >
                  I agree to terms &amp; conditions
                </label>
              </div>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={submitting}
              >
                {submitting ? "Registering..." : "Register now"}
              </button>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col-12">
            <p className="text-center small">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
