import { ComponentProps, ReactNode } from "react";

export interface FloatingButtonProps extends ComponentProps<'button'>{
  children: ReactNode
}

export function BubbleButton(props: FloatingButtonProps){
  return(
    <button className='p-2 text-zinc-200 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-50 hover:bg-zinc-500 data-[active=true]:text-violet-400' {...props} />
  )
}