import '../src/index.css' 
import { createRoot } from 'react-dom/client'
import SidePanel from './components/SidePanel/SidePanel'

const root = document.getElementById('side_panel')!
createRoot(root).render(<SidePanel />)
