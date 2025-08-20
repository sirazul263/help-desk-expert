import Head from "next/head";
import { withAuth } from "../../lib/withAuth";
import { Sidebar } from "@/components/Admin/Sidebar";
import Layout from "@/components/Layout/Layout";

function AdminPage() {
  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <Layout>
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="flex min-h-screen flex-col">
              <div className="max-w-7xl mx-auto p-5 flex w-full grow gap-5">
                <Sidebar className="sticky top-[5.50rem] h-fit hidden sm:block flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80" />
                <p>Hi</p>
              </div>
              <Sidebar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

export default AdminPage;
