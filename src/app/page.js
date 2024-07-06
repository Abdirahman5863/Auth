import { FetchUserAction } from "@/actions";
import LogOut from "@/components/logout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function Home() {
  const userDetails = await FetchUserAction();
  if (!userDetails?.success) redirect("/sign-in");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>User Profile</CardHeader>
        <CardContent>
          <CardTitle className="mb-6">{userDetails.data.userName}</CardTitle>
          <CardDescription className="mb-6">
            {userDetails.data.email}
          </CardDescription>
          <LogOut />
        </CardContent>
      </Card>
    </main>
  );
}
