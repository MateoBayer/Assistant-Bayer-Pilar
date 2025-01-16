import React from 'react'
import ReactMarkdown from 'react-markdown'
export default function MarkdownToHtml({text}){
  return(
    <ReactMarkdown>{text}</ReactMarkdown>
  )
}