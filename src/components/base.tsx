import { Heading, Text, HeadingProps, TextProps } from '@chakra-ui/react'
import React from 'react'

export const BaseTitle: React.FC<HeadingProps> = ({ children, ...other }) => {
  return (
    <Heading fontSize={'16px'} {...other}>
      {children}
    </Heading>
  )
}

export const BaseDesc: React.FC<TextProps> = ({ children, ...other }) => {
  return (
    <Text fontSize={'14px'} color={'#aaa'} {...other}>
      {children}
    </Text>
  )
}
