import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import SlashCommands from '@/pages/SlashCommands'
import Tips from '@/pages/Tips'
import Hooks from '@/pages/Hooks'
import Skills from '@/pages/Skills'
import SubAgents from '@/pages/SubAgents'
import Mcp from '@/pages/Mcp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="slash-commands" element={<SlashCommands />} />
          <Route path="tips" element={<Tips />} />
          <Route path="hooks" element={<Hooks />} />
          <Route path="skills" element={<Skills />} />
          <Route path="sub-agents" element={<SubAgents />} />
          <Route path="mcp" element={<Mcp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
