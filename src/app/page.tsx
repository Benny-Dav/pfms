import { redirect } from "next/navigation";

// Root page — redirect to dashboard (auth guard will intercept if not logged in)
export default function RootPage() {
  redirect("/dashboard");
}
