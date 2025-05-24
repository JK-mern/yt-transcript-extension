import './index.css'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import ContentPage from './components/ContentPage/Content'


export function onExecute() {

  const root = document.createElement('div')
  root.id = 'summarize_chat'
  document.body.append(root)

  createRoot(root).render(
    <StrictMode>
      <ContentPage />
    </StrictMode>
  )
}
