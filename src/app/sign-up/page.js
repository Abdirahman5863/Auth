"use client"
import { RegisterUser } from "@/actions"
import CommonTypeElement from "@/components/form-element"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { IntialSigupFormdata, RegestrationformControl } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUp(){
    const [signUpFormdata, setSignUpFormdata]=useState(IntialSigupFormdata)
    const router = useRouter()
async function  handleSigup(){
    const  result = await RegisterUser(signUpFormdata)
    console.log(result)
    if(result?.data)return router.push('/sign-in')

}
    return <div>
        <h1>Registration for SignUp</h1>
        <form action={handleSigup}>
            {
RegestrationformControl.map(itemControl => (
    <div key={itemControl.name}>
        <Label>{itemControl.label}</Label>
<CommonTypeElement currentItem={itemControl} value={signUpFormdata[itemControl.name]} onChange={(event)=>setSignUpFormdata({
    ...signUpFormdata,
    [event.target.name]:event.target.value
})}
/>
    </div>
))

            }
            <Button type="submit">SignUp</Button>
        </form>
    </div>
}