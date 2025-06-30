import Layout from "@/components/layout/Layout";
import AuthGuard from "@/components/auth/AuthGuard";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={["CUSTOMER"]}>
      <Layout>{children}</Layout>
    </AuthGuard>
  );
}
