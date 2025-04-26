import { Fugaz_One } from "next/font/google";
import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const Login = () => {
  const [error, setError] = React.useState<Record<string, string> | null>(null);
  const [isRegister, setIsRegister] = React.useState<boolean>(false);

  const {signup, login} = useAuth();

  const validateForm = (email: string, password: string): boolean => {
    // Add your validation logic here
    // For example, check if email is valid and password is strong enough
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/; // At least 8 characters, max 20 characters, 1 uppercase, 1 lowercase, 1 number, 1 number

    if(!emailRegex.test(email)) {
      setError((prev) => ({ ...prev, email: "Invalid email format" }));
    }else {
      setError((prev) => ({ ...prev, email: "" }));
    }

    if(!passwordRegex.test(password)) {
      setError((prev) => ({ ...prev, password: "Invalid password format" }));
    }else {
      setError((prev) => ({ ...prev, password: "" }));
    }

    return emailRegex.test(email) && passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
  
      const isValid = validateForm(data.email as string, data.password as string);
  
      if (!isValid){
        return;
      }
  
      if(isRegister){
        await signup(data.email as string, data.password as string)
      }
      else {
        await login(data.email as string, data.password as string)
      }
      
    } catch (error) {
        setError((prev) => ({ ...prev, auth: `Failed to ${isRegister? 'register user' : 'login user'}` }));
        console.error(error);
    }
  };

  const passwordRules = [
    "Atleast 8 characters and maximum of 20 characters",
    "Atleast 1 number",
    "Atleast 1 uppercase",
    "Atleast 1 symbol",
  ];

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={"text-4xl sm-text-5xl md:text-6xl " + fugaz.className}>
        {isRegister ?  'Register' : 'Log in'}
      </h3>
      <p>You&#39;re one step away!</p>
      <form
        className="w-full max-w-[400px] mx-aut flex flex-col justify-center items-center gap-4"
        action=""
        method="post"
        onSubmit={handleSubmit}
      >
        <Input name="email" placeholder="Email" error={error?.email} />
        <Input name="password" placeholder="Password" type="password" error={error?.password} />
        {isRegister && <ul className="text-xs text-gray-400 text-left w-full">
          {passwordRules.map((rule, index) => (
            <li key={index} className="flex items-start gap-2">
              <i>{rule}</i>
            </li>
          ))}
        </ul>}
        <Button type="submit" text="Submit" full></Button>
        {error?.auth && <i><p className="text-red-500 text-xs sm:text:sm">{error.auth}</p></i>}
        <p>
          {!isRegister ? "Don't have an account?" : "Already have an account?"} {" "}
          <button className={"text-amber-600 "} onClick={() => setIsRegister(prev => !prev)}>{!isRegister ? 'Sign up' : 'Log In'}</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
