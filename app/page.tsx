import prisma from "@/lib/utils";

export default async function Page() {
  const user = await prisma.user.findFirst();
  return (
    <div className="p-8">
      {user ? (
        <>
          Found user:
          <pre className="bg-gray-50 p-4 rounded-xl">
            {JSON.stringify(user, null, 4)}
          </pre>
        </>
      ) : (
        <>Trying to find a user...</>
      )}
    </div>
  );
}
