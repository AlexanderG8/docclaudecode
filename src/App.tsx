import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import SlashCommands from '@/pages/SlashCommands'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="slash-commands" element={<SlashCommands />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
