import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/css/globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import ProfileHeader from "./ProfileHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sharehub",
  description: "A sharehub nextjs app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<Sidebar />
			<div className="flex flex-col">
				<ProfileHeader />
				{children}
			</div>
		</div>
	);
}
