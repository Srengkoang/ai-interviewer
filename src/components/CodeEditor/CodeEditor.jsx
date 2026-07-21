import { useState } from 'react'
import Editor from '@monaco-editor/react'

const CodeEditor = () => {
  const [value, setValue] = useState('')

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      value={value}
      onChange={setValue}
    />
  )
}

export default CodeEditor