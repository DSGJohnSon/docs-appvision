import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { loginSchema, signUpSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID, Query } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, PROFILES_ID } from "@/config";

const app = new Hono()
  .get("current", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const { databases } = await createAdminClient();

    // Recherchez le profil associé à l'utilisateur actuel
    const profile = await databases.listDocuments(DATABASE_ID, PROFILES_ID, [
      Query.equal("userId", user.$id), // Filtrez par userId
    ]);

    return c.json({ data: user, profile: profile.documents[0] || null });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { email, password, name } = c.req.valid("json");

    //Création du compte utilisateur
    const { account } = await createAdminClient();
    const user = await account.create(ID.unique(), email, password, name);

    //Connexion de l'utilisateur
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    //Création du profil pour les infos secondaires
    const { databases } = await createAdminClient();
    await databases.createDocument(DATABASE_ID, PROFILES_ID, ID.unique(), {
      userId: user.$id,
    });

    return c.json({ success: true });
  })
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");
    await account.deleteSession("current");

    deleteCookie(c, AUTH_COOKIE);

    return c.json({ success: true });
  });

export default app;
