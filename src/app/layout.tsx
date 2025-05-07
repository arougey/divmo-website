//src/app/layout.tsx
import './globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'DivyIt',
  description: 'Split bills, stress-free.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-black">
        {/* Navbar */}
        <Navbar />
        {/* Page content */}
        {children}
      </body>
    </html>
  )
}