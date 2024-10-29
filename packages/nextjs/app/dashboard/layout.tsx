"use client";

import React, { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getAllTemplates } from "~~/services/frames";
import { notification } from "~~/utils/scaffold-eth";

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

  // useEffect(() => {
  //   if (!address) {
  //     notification.error(`You need to connect your wallet to access this page`);
  //     redirect("/");
  //   }
  // }, [address]);
  const dehydratedState = dehydrate(queryClient);
  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};

export default DashboardLayout;
