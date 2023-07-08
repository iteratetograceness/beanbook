import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { THEME } from '@/lib/constants'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sips',
  description: 'A simple coffee tasting journal app',
  icons: {
    icon: '/favicon.ico',
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
          colorPrimary: THEME.colors.primary,
          colorText: THEME.colors.primary,
          colorDanger: THEME.colors.error,
          colorSuccess: THEME.colors.success,
          colorWarning: THEME.colors.warning,
          colorInputText: THEME.colors.primary,
          borderRadius: THEME.units.borderRadius,
        },
        elements: {
          card: {
            borderRadius: THEME.units.borderRadius,
            boxShadow: 'none',
          },
        },
      }}
    >
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
