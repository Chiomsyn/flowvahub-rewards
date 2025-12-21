import { Suspense } from "react";
import { Skeleton } from "../components/ui/skeleton";
import LayoutCompnent from "./_component/layout-component";
import DashboardLayout from "./_component/layout-component";

function LayoutLoading() {
  return (
    <div className="flex-col lg:px-10 relative dark:bg-ligth-main w-full h-screen lg:flex-row">
      {/* Sidebar Skeleton */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-white p-6 hidden lg:block">
        <div className="space-y-8">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="lg:pl-64">
        {/* Top Nav Skeleton */}
        <div className="sticky top-0 z-40 border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-40 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<LayoutLoading />}>
      <div suppressHydrationWarning={true}>
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </Suspense>
  );
}
