"use client";

import React, { ReactNode } from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getAllTemplates } from "~~/services/frames";

type LayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: LayoutProps) => {
  const { address } = useAccount();
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["myFrames"],
    queryFn: async () => {
      return getAllTemplates(address as `0x${string}`);
    },
  });

  const dehydratedState = dehydrate(queryClient);
  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default DashboardLayout;
