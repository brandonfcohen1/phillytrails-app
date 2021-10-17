import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Componen, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp