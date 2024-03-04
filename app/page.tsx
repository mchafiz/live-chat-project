import ChatAbout from "@/components/chatAbout";
import ChatHeader from "@/components/chatHeader";
import ChatInput from "@/components/chatInput";
import ChatMessages from "@/components/chatMessages";
import InitUser from "@/lib/store/initUser";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getSession();

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md flex flex-col relative">
          <ChatHeader user={data?.session?.user} />
          {data.session?.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <ChatAbout />
          )}
        </div>
      </div>
      <InitUser user={data?.session?.user} />
    </>
  );
}
