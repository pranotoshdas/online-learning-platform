"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import HomeDemo from "./workspace/home/page";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      {user && (
        <div>
      <h2>Hello World!</h2>
      <Button>Click Here</Button>
      <UserButton /></div>
      )}
      <HomeDemo />
    </div>
  );
}
