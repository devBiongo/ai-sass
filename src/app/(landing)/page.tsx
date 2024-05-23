import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      Landing page unprotected
      <Link href={"/sign-in"}>
        <Button>Login</Button>
      </Link>
      <Link href={"/sign-up"}>
        <Button>register</Button>
      </Link>
    </div>
  );
}
