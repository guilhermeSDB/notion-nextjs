'use client'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import js from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-dark.css'
import { lowlight } from 'lowlight'
import Image from 'next/image'
import {
  RxChatBubble,
  RxChevronDown,
  RxCode,
  RxFontBold,
  RxFontItalic,
  RxStrikethrough
} from 'react-icons/rx'
import { BubbleButton } from './BubbleButton'
import { initialContent } from './initialContent'

export interface EditorProps{}

lowlight.registerLanguage('js', js)

export function Editor(props: EditorProps){
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight
      })
    ],
    onUpdate(editor) {
      editor.editor.getJSON()
    },
    content: initialContent,
    editorProps:{
      attributes:{
        class: 'outline-none'
      }
    }
  })

  return (
    <>
      <EditorContent 
        editor={editor} 
        className="max-w-[700px] mx-auto pt-16 prose"
      />
      {editor && 
        <BubbleMenu className='bg-zinc-700 shadow-xl text-zinc-100 border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600' editor={editor}>
          <BubbleButton>
            Text
            <RxChevronDown className='w-4 h-4' />
          </BubbleButton>
          <BubbleButton>
            <RxChatBubble className='w-4 h-4' />
            Comment
          </BubbleButton>
          <div className='flex items-center'>
            <BubbleButton
              data-active={editor.isActive('bold')}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <RxFontBold className='w-4 h-4'/>
            </BubbleButton>
            <BubbleButton
              data-active={editor.isActive('italic')}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <RxFontItalic className='w-4 h-4' />
            </BubbleButton>
            <BubbleButton
              data-active={editor.isActive('strike')}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <RxStrikethrough className='w-4 h-4' />
            </BubbleButton>
            <BubbleButton
              data-active={editor.isActive('code')}
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <RxCode className='w-4 h-4' />
            </BubbleButton>
          </div>
        </BubbleMenu>
      }

      {editor && 
      <FloatingMenu 
        editor={editor} 
        className='bg-zinc-700 py-2 px-1 shadow-xl text-zinc-100 border border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col'
        shouldShow={({ state }) => {
          const { $from } = state.selection
          const currentLineText = $from.nodeBefore?.textContent

          return currentLineText === '/'
        }}>
        <button className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600'>
          <Image 
            src='https://www.notion.so/images/blocks/text/en-US.png' 
            width={150} 
            height={150} 
            alt={'Text'} 
            className='w-12 border border-zinc-600 rounded'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
           />
          <div className='flex flex-col text-left'>
            <span className='text-sm'>Text</span>
            <span className='text-xs text-zinc-400'>Just start writing with plain text.</span>
          </div>
        </button>
        <button className='flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600'>
          <Image 
            src='https://www.notion.so/images/blocks/header.57a7576a.png' 
            width={150} 
            height={150} 
            alt={'Heading'} 
            className='w-12 border border-zinc-600 rounded'
           />
          <div className='flex flex-col text-left'>
            <span className='text-sm'>Heading</span>
            <span className='text-xs text-zinc-400'>Just start writing with plain text.</span>
          </div>
        </button>
      </FloatingMenu>
      }
    </>
  )
}