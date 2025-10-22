import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Hello World!</h2>
      <Button>Click Here</Button>
      <UserButton />
    </div>
  );
}
