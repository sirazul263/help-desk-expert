import { useRouter } from "next/router";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return logout;
}
