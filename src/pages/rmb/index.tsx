import {
  Box,
  Input,
  Container,
  Text,
  Flex,
  Button,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
} from '@chakra-ui/react'
import { BaseHeading, BaseTitle } from '@/components/base'
import React, { useState } from 'react'

/**
 * 人民币大写转换器
 * @constructor
 */
const Rmb = () => {
  // 大写数字
  const [capitalNumber, setCapitalNumber] = useState<string>('')
  // 要生成的数字
  const [generateNumber, setGenerateNumber] = useState<number>(1)

  return (
    <Box>
      <Container pt={'40px'}>
        <BaseHeading>人民币大写转换器</BaseHeading>

        <Flex gap={'10px'} my={'30px'}>
          <NumberInput
            value={generateNumber}
            min={1}
            max={100}
            onChange={(value) => {
              setGenerateNumber(Number(value))
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button px={'25px'}>转为人民币大写</Button>
          <Button px={'25px'} variant="outline">
            转为人民币大写
          </Button>
        </Flex>

        <Input value={capitalNumber} isReadOnly></Input>

        <BaseTitle mt={'100px'}>阿拉伯数字与中文大写数字对应表</BaseTitle>
      </Container>
      <Text></Text>
    </Box>
  )
}

export default Rmb
