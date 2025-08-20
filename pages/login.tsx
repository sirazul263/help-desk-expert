import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import { withAuth } from "@/lib/withAuth";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(1, "Password must be at least 1 characters")
      .max(256, "Password must be at best 256 characters"),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await axios.post("/api/login", values);
      if (status === 200) {
        router.push("/admin");
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="img/favicon-16x16.png"
        />
        <title>Login</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center py-16 ">
          <Card className="w-full h-full md:w-[487px] border shadow-none">
            <CardHeader className="flex items-center justify-center text-center px-7">
              <CardTitle className="text-2xl">Welcome back !</CardTitle>
            </CardHeader>

            <CardContent className="px-7">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-red-900">*</span>{" "}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter email address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Password <span className="text-red-700">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter password"
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && (
                    <div className="flex items-center">
                      <AlertTriangle className="size-5 text-red-700 mr-2" />
                      <p className="text-red-700 text-sm font-medium">
                        {error}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full "
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = withAuth(async () => {
  return { props: {} };
}, "public");
export default LoginPage;
