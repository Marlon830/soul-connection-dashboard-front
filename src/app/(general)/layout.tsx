import SideTopBarLayout from "../layouts/sidetopbar-layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideTopBarLayout>{children}</SideTopBarLayout>
  );
}
