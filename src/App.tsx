import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmailCampaignPage from './pages/EmailCampaignPage'
import NewCampaignPage from './pages/NewCampaignPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmailCampaignPage />} />
        <Route path="/new-campaign" element={<NewCampaignPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
