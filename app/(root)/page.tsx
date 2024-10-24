import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <div className="px-10 pt-[100px]">
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">logout</Button>
      </form>
    </div>
  );
}

export default Home;
