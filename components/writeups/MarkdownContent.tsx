'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CopyButton } from './CopyButton';

function extractCodeContent(children: React.ReactNode): string {
  const child = React.Children.toArray(children)[0] as
    | React.ReactElement<{ children?: React.ReactNode }>
    | undefined;
  const c = child?.props?.children;
  if (typeof c === 'string') return c;
  if (Array.isArray(c))
    return c
      .map((x: React.ReactNode) => (typeof x === 'string' ? x : ''))
      .join('');
  return '';
}

interface MarkdownContentProps {
  content: string;
}

export default function WriteupsMarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none font-[family-name:var(--font-share-tech-mono)]">
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
              className="font-mono text-xl font-bold mt-8 mb-4"
              style={{ color: 'var(--primary)' }}
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="font-mono text-lg font-semibold mt-6 mb-3"
              style={{ color: 'var(--primary)' }}
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="font-mono text-base font-semibold mt-4 mb-2"
              style={{ color: 'var(--primary)' }}
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              className="leading-relaxed my-4"
              style={{ color: 'var(--foreground)' }}
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className="underline transition-colors hover:opacity-80"
              style={{ color: 'var(--cyan)' }}
              {...props}
            />
          ),
          pre: ({ node, ...props }) => (
            <div className="relative my-4">
              <pre
                className="p-4 rounded overflow-x-auto"
                style={{
                  background: '#010f03',
                  border: '1px solid var(--border)',
                  color: 'var(--cyan)',
                }}
                {...props}
              />
              <CopyButton content={extractCodeContent(props.children)} />
            </div>
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
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-2 my-4 ml-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 my-4 ml-4" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li style={{ color: 'var(--foreground)' }} {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-2 text-left"
              style={{
                background: 'rgba(0,255,65,0.1)',
                color: 'var(--primary)',
                border: '1px solid var(--border)',
              }}
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-2"
              style={{ border: '1px solid var(--border)' }}
              {...props}
            />
          ),
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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
