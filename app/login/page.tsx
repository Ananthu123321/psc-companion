"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "@/firebase/config";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [user, setUser] =
    useState<any>(null);

  const [isRegister, setIsRegister] =
    useState(false);

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [
    showForgotPassword,
    setShowForgotPassword,
  ] = useState(false);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

        }
      );

    return () => unsubscribe();

  }, []);

  const handleAuth = async () => {

    try {

      if (isRegister) {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert(
          "Account Created Successfully"
        );

        setEmail("");
        setPassword("");
        setIsRegister(false);

      } else {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        router.push("/");

      }

    } catch (error: any) {

      console.log(error);

      alert(error.code);

    }

  };

  const handleLogout = async () => {

    await signOut(auth);

    router.push("/login");

  };

  const resetPassword = async () => {

    if (!email) {

      alert("Enter your email");

      return;

    }

    try {

      await sendPasswordResetEmail(
        auth,
        email
      );

      alert(
        "Password reset email sent"
      );

      setShowForgotPassword(false);

    } catch (error: any) {

      alert(error.code);

    }

  };

  const changePassword = async () => {

    try {

      const currentUser =
        auth.currentUser;

      if (
        !currentUser ||
        !currentUser.email
      ) {
        return;
      }

      const credential =
        EmailAuthProvider.credential(
          currentUser.email,
          oldPassword
        );

      await reauthenticateWithCredential(
        currentUser,
        credential
      );

      await updatePassword(
        currentUser,
        newPassword
      );

      alert(
        "Password updated successfully"
      );

      setOldPassword("");
      setNewPassword("");

    } catch (error: any) {

      alert(error.message);

    }

  };

  return (

    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-blue-700 text-center">
          PSC Companion
        </h1>

        {!user ? (

          <>

            <p className="text-gray-600 mt-4 text-center">

              {isRegister
                ? "Create your account"
                : "Login to continue"}

            </p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-xl p-4 mt-8 text-black"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-xl p-4 mt-4 text-black"
            />

            <button
              onClick={handleAuth}
              className="bg-blue-600 text-white px-6 py-4 rounded-xl mt-6 w-full hover:bg-blue-700 transition"
            >

              {isRegister
                ? "Register"
                : "Login"}

            </button>

            <button
              onClick={() => {

                setIsRegister(
                  !isRegister
                );

                setShowForgotPassword(
                  false
                );

              }}
              className="mt-5 text-blue-600 w-full"
            >

              {isRegister
                ? "Already have an account? Login"
                : "New user? Register"}

            </button>

            {!isRegister && (

              <>

                <button
                  onClick={() =>
                    setShowForgotPassword(
                      !showForgotPassword
                    )
                  }
                  className="mt-4 text-red-500 w-full"
                >
                  Forgot Password?
                </button>

                {showForgotPassword && (

                  <div className="mt-6">

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      className="w-full border rounded-xl p-4 text-black"
                    />

                    <button
                      onClick={resetPassword}
                      className="bg-red-500 text-white px-6 py-3 rounded-xl mt-4 w-full hover:bg-red-600 transition"
                    >
                      Send Reset Link
                    </button>

                  </div>

                )}

              </>

            )}

          </>

        ) : (

          <>

            <h2 className="text-2xl font-bold mt-8 text-center text-black">
              {user.email}
            </h2>

            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) =>
                setOldPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4 mt-6 text-black"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-4 mt-4 text-black"
            />

            <button
              onClick={changePassword}
              className="bg-green-600 text-white px-6 py-3 rounded-xl mt-6 w-full hover:bg-green-700 transition"
            >
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-xl mt-4 w-full hover:bg-red-600 transition"
            >
              Logout
            </button>

          </>

        )}

      </div>

    </main>

  );

}