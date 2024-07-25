import React from 'react'
import { Editor } from 'react-live'
import { Box, BoxProps } from '@chakra-ui/react'

interface CodeDisplayProps extends BoxProps {
  code: string
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, ...other }) => (
  <Box w={'100%'} {...other}>
    <Editor code={code} language={'JavaScript'} />
  </Box>
)

export default CodeDisplay
