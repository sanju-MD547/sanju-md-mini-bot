import { getUser } from '@netlify/identity'

// Server-side authorization check for the admin dashboard. Reads the nf_jwt
// Identity cookie sent with the request — never trusts anything the client
// claims about its own role.
export default async (req: Request) => {
  const user = await getUser()
  const roles = user?.roles ?? []

  if (!user || !roles.includes('admin')) {
    return Response.json({ authorized: false }, { status: 403 })
  }

  return Response.json({
    authorized: true,
    email: user.email,
    name: user.name ?? user.email,
  })
}
