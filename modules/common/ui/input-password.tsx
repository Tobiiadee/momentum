/*eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

interface InputPasswordProps {
  control: any;
  placeholder?: string;
  label?: string;
}

export default function InputPassword({
  control,
  placeholder = "Choose your password",
  label = "Password",
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name='password'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='relative'>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                {...field}
              />
              <ShowPassword show={showPassword} setShow={setShowPassword} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ShowPassword({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  return (
    <Button
      type='button'
      onClick={() => setShow(!show)}
      variant={"ghost"}
      size={"sm"}
      className='absolute top-1/2 -translate-y-1/2 right-1 bg-transparent hover:bg-transparent'>
      {!show ? (
        <EyeOff size={24} strokeWidth={1.5} />
      ) : (
        <Eye size={24} strokeWidth={1.5} />
      )}
    </Button>
  );
}
