
import React from 'react'
import CodeBlock from './CodeBlock'

import ReactMarkdown from 'react-markdown'

export default function PostBody ({ content }) {
  return (
    <ReactMarkdown
      source={content}
      renderers={{ code: CodeBlock }}
    />

  )
}
