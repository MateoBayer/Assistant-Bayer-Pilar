// TestMarkdown.jsx
import React from 'react'
import MarkdownToHtml from './MarkdownToHtml'

export default function TestMarkdown() {
/*
    const markdownText = `
# This is a header

**This is bold text**

* List item 1
* List item 2

\`\`\`javascript
const hello = "Hello World";
console.log(hello);
\`\`\`

[This is a link](https://www.google.com)
`
*/
    const markdownText = "hola"
    return (
        <div style={{ padding: '20px' }}>
            <h2>Original Text:</h2>
            <pre>{markdownText}</pre>
            
            <h2>Converted to Markdown:</h2>
            <MarkdownToHtml text={markdownText} />
        </div>
    )
}