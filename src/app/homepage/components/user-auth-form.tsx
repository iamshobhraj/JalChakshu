"use client"

import * as React from "react"
import { useState } from "react";
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [payload,setPayload] = useState({
    phone:'',
    password:''
  });
  const handleChange=(e: { target: { name: string; value: string; }; })=>{
    console.log("name: ",e.target.name,"val: ",e.target.value);
    setPayload((pre)=>{
     console.log("pre: ",pre);
      return(
        {
         phone: (e.target.name=='phone')? e.target.value:pre.phone,
          password:(e.target.name=='password')? e.target.value:pre.password,
        }
      )
    })
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    console.log("payload: ",payload);

    //validations
  
    // const firstcheck = /@/; 
    // const seccheck = /@/; 
    // const thirdcheck = /@/; 
    // const fourcheck = /@/; 
    // const firstcheck = /@/; 
    // const firstcheck = /@/; 
    // const firstcheck = /@/; 
    if(payload.phone?.length == 10)
    {
      //invalid credentials
      return;
    }

    const config = {
      method:'POST',
      header:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(payload)
    }

    let res = (await (await fetch('http://localhost:3003/api/SignIn',config)).json())


    //setting up the toast notifications

     if(res.message.name)
     {
      //user founded
     }
    else if(res.name)
     {
      //Invalid credentials 
     }
     else {
      //Something went wrong
     }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="number">
              phone number
            </Label>
            <Input
              id="phone_number"
              placeholder="+91"
              type="number"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange} value={payload.phone}
              name="phone"
            />
            <Input
            id="password"
            type="text"
            placeholder="password"
            onChange={handleChange} value={payload.password}
            name="password"
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  )
}
