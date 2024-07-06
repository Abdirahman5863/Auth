"use client";
import { LogInUserAction } from "@/actions";
import CommonTypeElement from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IntialLoginFormData, Loginformcontrol } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignIn() {
  const [signinFormdata, setSiginFormdata] = useState(IntialLoginFormData);
  const router = useRouter()
  async function handleSignIn(){
    const result = await LogInUserAction(signinFormdata)
    console.log(result)
    if(result?.success) return router.push('/')
  }
  return (
    <div>
      <h1>Log in</h1>
      <form action={handleSignIn}>
        {Loginformcontrol.map((items) => (
          <div key={items.name}>
            <Label>{items.label}</Label>
            <CommonTypeElement
              currentItem={items}
              value={signinFormdata[items.name]}
              onChange={(event) =>
                setSiginFormdata({
                  ...signinFormdata,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        ))}
        <Button type="submit">Log In</Button>

      </form>
      <Link href="/sign-up">else go to sign up</Link>
    </div>
  );
}
