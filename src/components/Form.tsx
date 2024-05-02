"use client";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Form = ({ type }: { type: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit = async (data: Inputs) => {
    if (type === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/");
      }
      if (!res.ok) {
        toast.error("Something went wrong");
      }
    }
    if (type === "login") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.ok) {
        router.push("/chats");
      }
      if (!res?.ok) {
        toast.error("Invalid username or password");
      }
    }
  };

  return (
    <div className="auth">
      <div className="content">
        <Image src={""} width={10} height={10} alt="logo" />
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter username"
                  defaultValue={""}
                  className="input-field"
                  {...register("username", {
                    required: "Username is required",
                    validate: (value) => {
                      if (value.length < 3)
                        return "username must be at least 3 characters";
                    },
                  })}
                />{" "}
                <PersonOutline sx={{ color: "#737373" }} />
              </div>
              {errors.username && (
                <p className="text-red-300">{errors.username.message}</p>
              )}
            </div>
          )}
          <div>
            <div className="input">
              <input
                type="email"
                placeholder="Enter email"
                defaultValue={""}
                className="input-field"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <EmailOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.email && (
              <p className="text-red-300">{errors.email.message}</p>
            )}
          </div>
          <div>
            <div className="input">
              <input
                type="password"
                placeholder="Enter password"
                defaultValue={""}
                className="input-field"
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    if (
                      value.length < 5 ||
                      !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                    )
                      return "Password must be at least 5 characters and should contain at least one special character";
                  },
                })}
              />
              <LockOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.password && (
              <p className="text-red-300">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="button">
            {type === "register" ? "Join Free" : "Let's Chat"}
          </button>
        </form>
        {type === "register" ? (
          <Link href={"/"} className="link">
            {" "}
            Already have an account? Sign in here{" "}
          </Link>
        ) : (
          <Link href={"/register"} className="link">
            Don't have an accout? Register now{" "}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Form;
