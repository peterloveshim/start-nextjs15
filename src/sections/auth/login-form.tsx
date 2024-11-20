"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ButtonLoading } from "@/components/buttons";

import { sendOtpCode, signInWithOtp } from "@/actions/auth";
import { IOtpInfo } from "@/types/auth";
import { toast } from "sonner";
import { customToast, ToastType } from "@/lib/toast";
import { BasicSpinner, SmallSpinner } from "@/components/spinner";
import { CustomCountdown } from "@/components/countdown";
import { useRouter } from "next/navigation";
import { paths } from "@/static";

export type SignInSchemaType = z.infer<typeof SignInSchema>;

const SignInSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }).trim(),
  password: z.string().min(1, { message: "비밀번호를 입력하세요." }).trim(),
  /*
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
    */
});

export function LoginForm({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [otp, setOtp] = useState<IOtpInfo>({
    value: null,
    validUntil: 0,
    errMessage: "",
  });

  const defaultValues = {
    email,
    password,
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const { control, handleSubmit, getValues } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { email, password } = data;

      if (!otp.value) {
        startTransition(async () => {
          await handleSendOtpCode(email, password);
        });
      } else {
        startTransition(async () => {
          if (otp.value === null) return;
          const resObj = await signInWithOtp({
            email,
            password,
            otp: otp.value,
          });

          console.log("123 : ", resObj);

          if (resObj.result === "success") {
            router.push(paths.dashboard);
          } else if (resObj.result === "error") {
            customToast({
              type: ToastType.ERROR,
              message: "로그인 실패",
              description: `${resObj.error.message}`,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleSendOtpCode = async (email: string, password: string) => {
    const resObj = await sendOtpCode({ email, password });
    if (resObj.result === "success" && resObj.data !== null) {
      const validUntil = resObj.data.validUntil;
      setOtp((prev) => ({
        ...prev,
        validUntil,
      }));

      customToast({
        type: ToastType.SUCCESS,
        message: "인증 번호를 전송했습니다.",
        description: `${resObj.data.phone}`,
      });
    } else if (resObj.result === "error") {
      customToast({
        type: ToastType.ERROR,
        message: resObj.error?.message ?? "",
      });
    }
  };

  return (
    <Form {...methods}>
      <form className="mb-12" onSubmit={onSubmit}>
        <Card>
          <CardHeader className="text-center gap-1">
            <CardTitle>Sign in</CardTitle>
            <CardDescription className="text-sm">
              Don't have an account?{" "}
              <a href="#" className="text-gray-800 hover:underline">
                Sign Up
              </a>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormField
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="space-y-0 mb-4">
                  <FormLabel className="text-xs">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Email ID"
                      type="text"
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="space-y-0 mb-4">
                  <FormLabel className="text-xs">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Password"
                      type="password"
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {otp.validUntil > 0 && (
              <FormItem>
                <div className="relative">
                  <FormLabel className="text-xs">OTP</FormLabel>
                  <Input
                    value={otp.value ?? ""}
                    type="text"
                    onChange={(e) => {
                      setOtp({ ...otp, value: String(e.target.value) });
                    }}
                  />
                  {isPending ? (
                    <div className="absolute bottom-[9px] right-[14px]">
                      <SmallSpinner />
                    </div>
                  ) : (
                    <CustomCountdown
                      expUnixTime={otp.validUntil}
                      onClick={() => {
                        const email = getValues("email");
                        const password = getValues("password");
                        handleSendOtpCode(email, password);
                      }}
                    />
                  )}
                </div>
              </FormItem>
            )}
            <Separator className="mt-7 mb-1" orientation="horizontal" />
          </CardContent>

          <CardFooter>
            {isPending ? (
              <ButtonLoading className="w-full">Loading...</ButtonLoading>
            ) : (
              <Button type="submit" className="w-full">
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
