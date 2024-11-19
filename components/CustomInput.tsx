import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldPath, useForm } from "react-hook-form"
import { z } from "zod"
import { Control } from 'react-hook-form'


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authFormSchema } from '@/lib/utils'



const formSchema = authFormSchema('sing-up') 



interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    type: string,
    placeholder: string
}

const CustomInput = ({ control, name, type, placeholder, label }: CustomInput) => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='flex w-full flex-col gap-1'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <FormControl >
                        <Input placeholder={placeholder} className='inpute-class' {...field} type={type} />
                    </FormControl>
                    <FormMessage className='form-message mt-2' />
                </div>
            )}
        />


    )
}

export default CustomInput