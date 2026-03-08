'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

export default function BlogsMarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div
      className="prose prose-invert max-w-none font-[family-name:var(--font-share-tech-mono)] text-[0.85rem] leading-[1.9]"
      style={{ color: 'var(--foreground)' }}
    >
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="font-[family-name:var(--font-vt323)] text-3xl font-bold mt-8 mb-6"
              style={{ color: 'var(--primary)' }}
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="font-[family-name:var(--font-vt323)] text-2xl font-bold mt-8 mb-4"
              style={{ color: 'var(--primary)' }}
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="font-[family-name:var(--font-vt323)] text-xl font-semibold mt-6 mb-3"
              style={{ color: 'var(--primary)' }}
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="my-4" style={{ color: 'var(--foreground)' }} {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="underline transition-colors hover:opacity-80"
              style={{ color: 'var(--cyan)' }}
              {...props}
            />
          ),
          pre: ({ node, ...props }) => (
            <pre
              className="p-4 overflow-x-auto rounded my-4"
              style={{
                background: '#010f03',
                border: '1px solid var(--border)',
                color: 'var(--cyan)',
              }}
              {...props}
            />
          ),
          code: (props: { inline?: boolean; children?: React.ReactNode; className?: string }) => {
            const { inline, ...rest } = props;
            if (inline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded text-sm font-mono"
                  style={{
                    background: '#010f03',
                    border: '1px solid var(--border)',
                    color: 'var(--cyan)',
                  }}
                  {...rest}
                />
              );
            }
            return <code {...rest} />;
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="pl-4 italic my-4 border-l-[3px]"
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--primary-dim)',
              }}
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-2 my-4 ml-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 my-4 ml-4" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li style={{ color: 'var(--foreground)' }} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
