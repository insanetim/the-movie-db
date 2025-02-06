import '@testing-library/jest-dom'
import 'src/utils/testHelpers/matchMedia'
import { TextDecoder, TextEncoder } from 'node:util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as never
