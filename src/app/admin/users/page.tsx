import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { accounts: true },
  });
  return (
    <>
      <h1 className="display text-6xl font-black">Registered users.</h1>
      <div className="panel mt-10 overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr>
              <th className="p-5">NAME</th>
              <th>EMAIL</th>
              <th>METHOD</th>
              <th>ROLE</th>
              <th>JOINED</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="border-t" key={user.id}>
                <td className="p-5 font-bold">{user.name ?? "—"}</td>
                <td>{user.email}</td>
                <td>{user.accounts[0]?.provider ?? "password"}</td>
                <td>{user.role}</td>
                <td>{user.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
