import { GetServerSideProps, GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";

type PageType = "private" | "public";

export function withAuth<P extends { [key: string]: any }>(
  gssp: GetServerSideProps<P>,
  pageType: PageType = "private" // default is private page
): GetServerSideProps<P> {
  return async (ctx: GetServerSidePropsContext) => {
    const token = ctx.req.cookies.token;

    if (pageType === "private") {
      // 🔒 Private page (e.g. /admin)
      if (!token) {
        return {
          redirect: { destination: "/login", permanent: false },
        };
      }

      try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return gssp(ctx);
      } catch {
        return {
          redirect: { destination: "/login", permanent: false },
        };
      }
    } else {
      // 🔓 Public page (e.g. /login, /register)
      if (token) {
        try {
          jwt.verify(token, process.env.JWT_SECRET!);
          return {
            redirect: { destination: "/admin", permanent: false },
          };
        } catch {
          // invalid token → allow to continue to login/register
        }
      }
      return gssp(ctx);
    }
  };
}
