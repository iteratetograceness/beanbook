import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Theme } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sips',
  description: 'A simple coffee tasting journal app',
  icons: {
    icon: '/favicon_sips.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: Theme.colors.primary,
          colorText: Theme.colors.primary,
          colorDanger: Theme.colors.error,
          colorSuccess: Theme.colors.success,
          colorWarning: Theme.colors.warning,
          colorInputText: Theme.colors.primary,
          borderRadius: Theme.units.borderRadius,
          colorAlphaShade: Theme.colors.shadow,
        },
      }}
    >
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
