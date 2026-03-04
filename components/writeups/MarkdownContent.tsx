'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { CopyButton } from './CopyButton'

function extractCodeContent(children: React.ReactNode): string {
  const child = React.Children.toArray(children)[0] as React.ReactElement<{ children?: React.ReactNode }> | undefined
  const c = child?.props?.children
  if (typeof c === 'string') return c
  if (Array.isArray(c)) return c.map((x: React.ReactNode) => (typeof x === 'string' ? x : '')).join('')
  return ''
}

interface MarkdownContentProps {
  content: string
}

export default function WriteupsMarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-6 text-accent" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-bold mt-8 mb-4 text-primary" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-semibold mt-6 mb-3 text-accent" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl font-semibold mt-4 mb-2 text-primary" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-foreground leading-relaxed my-4" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-primary hover:text-accent transition-colors underline" {...props} />
          ),
          pre: ({ node, ...props }) => (
            <div className="relative my-4">
              <pre className="bg-slate-950 text-emerald-300 p-4 rounded-lg overflow-x-auto border border-primary/30" {...props} />
              <CopyButton content={extractCodeContent(props.children)} />
            </div>
          ),
          code: ({ node, inline, ...props }: any) => {
            if (inline) {
              return <code className="text-primary bg-primary/10 px-2 py-1 rounded text-sm font-mono" {...props} />
            }
            return <code {...props} />
          },
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-2 my-4 ml-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 my-4 ml-4" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-foreground" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="bg-primary/10 text-primary border border-primary/30 px-4 py-2 text-left" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-border px-4 py-2" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
