"use server"
import {inngest} from '../app/inngest/client'

export const trigerhelloworld=async()=>{

        await inngest.send({
            name:'test/hello.world',
            data:{
                email:"roxian@gmail.com"
            }
        })
    }

export const triggerSummarization=async(text:string)=>{
    await inngest.send({
        name:'ai/summarize.content',
        data:{
            text,
        }
    })
}