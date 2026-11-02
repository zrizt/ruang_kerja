import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight, Bell, Bookmark, BriefcaseBusiness, Check, ChevronDown, CirclePlus,
  Compass, Filter, Grid2X2, Heart, Home, ImagePlus, LayoutList, MoreHorizontal,
  MoveUpRight, Plus, Search, Settings2, Sparkles, Users,
  X, Zap
} from 'lucide-react'
import './styles.css'

const images = {
  ceramic: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85',
  interior: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
  poster: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=85',
  packaging: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
  portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=85',
  jules: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85',
  mina: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85',
  daniel: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=85'
}

const initialProjects = [
  { id: 1, title: 'Clay, light & quiet mornings', type: 'Art direction · 2024', author: 'Aisha Rahman', image: images.ceramic, color: 'tangerine', likes: 86, saves: 12, liked: true, saved: false },
  { id: 2, title: 'A softer way to live', type: 'Interior design · 2024', author: 'Aisha Rahman', image: images.interior, color: 'lilac', likes: 64, saves: 24, liked: false, saved: true },
  { id: 3, title: 'Good things take time', type: 'Visual identity · 2023', author: 'Aisha Rahman', image: images.poster, color: 'yellow', likes: 39, saves: 8, liked: false, saved: false },
  { id: 4, title: 'Made for everyday rituals', type: 'Branding · 2023', author: 'Aisha Rahman', image: images.packaging, color: 'mint', likes: 51, saves: 17, liked: false, saved: false }
]

const people = [
  { name: 'Jules Mendez', role: 'Product designer', image: images.jules },
  { name: 'Mina Park', role: 'Brand strategist', image: images.mina },
  { name: 'Daniel Cho', role: 'Creative developer', image: images.daniel }
]

function App() {
  const [projects, setProjects] = useState(initialProjects)
  const [activeTab, setActiveTab] = useState('For you')
  const [activeTopNav, setActiveTopNav] = useState('Explore')
  const [activeNav, setActiveNav] = useState('Overview')
  const [query, setQuery] = useState('')
  const [view, setView] = useState('grid')
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('All formats')
  const [coverImage, setCoverImage] = useState('')
  const [toast, setToast] = useState('')
  const [followed, setFollowed] = useState([])

  const filteredProjects = useMemo(() => {
    const needle = query.toLowerCase().trim()
    let result = projects
    if (activeTopNav === 'Saved') result = result.filter(project => project.saved)
    if (categoryFilter !== 'All formats') result = result.filter(project => project.type.toLowerCase().startsWith(categoryFilter.toLowerCase()))
    if (activeTab === 'Latest') result = [...result].sort((a, b) => b.id - a.id)
    if (needle) result = result.filter(project => `${project.title} ${project.type}`.toLowerCase().includes(needle))
    return result
  }, [activeTab, activeTopNav, categoryFilter, projects, query])

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const openProjectModal = () => {
    setCoverImage('')
    setModalOpen(true)
  }

  const handleTopNav = (label) => {
    setActiveTopNav(label)
    if (label === 'Explore') setActiveTab('For you')
    if (label === 'Network') setActiveTab('Following')
    if (label === 'Saved') setActiveTab('For you')
    if (label !== 'Explore') notify(`${label} view selected`)
  }

  const handleCoverChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCoverImage(reader.result)
    reader.readAsDataURL(file)
  }

  const toggleProject = (id, key) => {
    setProjects(current => current.map(project => project.id === id
      ? { ...project, [key]: !project[key], ...(key === 'liked' ? { likes: project.likes + (project.liked ? -1 : 1) } : {}), ...(key === 'saved' ? { saves: project.saves + (project.saved ? -1 : 1) } : {}) }
      : project))
  }

  const toggleFollow = (name) => {
    setFollowed(current => current.includes(name) ? current.filter(person => person !== name) : [...current, name])
    notify(followed.includes(name) ? `Unfollowed ${name}` : `Following ${name}`)
  }

  const addProject = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = form.get('title')
    const type = form.get('type')
    if (!title || !type) return
    setProjects(current => [{ id: Date.now(), title, type, author: 'Aisha Rahman', image: coverImage || images.ceramic, color: 'tangerine', likes: 0, saves: 0, liked: false, saved: false }, ...current])
    setModalOpen(false)
    notify('Project added to your portfolio')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="RuangKerja home"><span className="brand-mark">r</span><span>Ruang<span>Kerja</span></span></a>
        <div className="search-box"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects, people..." /><kbd>⌘ K</kbd></div>
        <nav className="topnav" aria-label="Main navigation">
          <button onClick={() => handleTopNav('Explore')} className={activeTopNav === 'Explore' ? 'topnav-link active' : 'topnav-link'}><Compass size={17} />Explore</button>
          <button onClick={() => handleTopNav('Network')} className={activeTopNav === 'Network' ? 'topnav-link active' : 'topnav-link'}><Users size={17} />Network</button>
          <button onClick={() => handleTopNav('Saved')} className={activeTopNav === 'Saved' ? 'topnav-link active' : 'topnav-link'}><Bookmark size={17} />Saved</button>
        </nav>
        <div className="top-actions"><button className="icon-button notification"><Bell size={19} /><span /></button><button className="mini-avatar"><img src={images.portrait} alt="Aisha Rahman" /></button><ChevronDown size={16} className="header-chevron" /></div>
      </header>

      <main className="page" id="top">
        <aside className="left-rail">
          <section className="profile-card">
            <div className="profile-cover" />
            <div className="profile-content"><div className="profile-avatar"><img src={images.portrait} alt="Aisha Rahman" /><span className="online-dot" /></div><h2>Aisha Rahman</h2><p>Art director & visual storyteller</p><div className="profile-location">Jakarta, Indonesia <span>·</span> <button className="inline-action" onClick={() => notify('Profile editing is coming next')}>Edit profile</button></div><div className="profile-stats"><div><strong>24</strong><span>Projects</span></div><div><strong>1.8k</strong><span>Followers</span></div><div><strong>312</strong><span>Following</span></div></div><button className="outline-button" onClick={openProjectModal}><Plus size={16} />Add project</button></div>
          </section>
          <nav className="side-nav" aria-label="Workspace navigation">
            <p className="eyebrow">Workspace</p>
            {[[Home, 'Overview'], [BriefcaseBusiness, 'My portfolio'], [Bookmark, 'Collections'], [Sparkles, 'Inspiration']].map(([Icon, label]) => <button key={label} onClick={() => setActiveNav(label)} className={activeNav === label ? 'side-link selected' : 'side-link'}><Icon size={17} /><span>{label}</span>{label === 'Collections' && <span className="nav-count">4</span>}</button>)}
          </nav>
          <section className="profile-strength"><div className="strength-head"><span>Profile strength</span><strong>80%</strong></div><div className="progress-track"><div /></div><p>Add your tools and experience to reach <b>100%</b>.</p><button onClick={() => notify('Profile checklist opened')}>Complete profile <ArrowUpRight size={14} /></button></section>
          <div className="rail-footer"><span>© 2024 RuangKerja</span><a href="#about">About</a><a href="#help">Help</a><Settings2 size={14} /></div>
        </aside>

        <section className="content-column">
          <div className="welcome-row"><div><p className="eyebrow accent">MONDAY, JUNE 24, 2024</p><h1>Good morning, Aisha <span>✦</span></h1><p className="subheading">A little space for the work you’re proud of.</p></div><button className="add-project" onClick={openProjectModal}><CirclePlus size={18} />Share a project</button></div>
          <div className="content-tabs"><div className="tab-list">{['For you', 'Following', 'Latest'].map(tab => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => { setActiveTab(tab); setActiveTopNav('Explore') }}>{tab}</button>)}</div><div className="view-controls"><div className="filter-wrap"><button className={showFilterPanel ? 'active' : ''} title="Filter" onClick={() => setShowFilterPanel(current => !current)}><Filter size={16} /></button>{showFilterPanel && <div className="filter-popover"><p>Filter by format</p>{['All formats', 'Art direction', 'Interior design', 'Visual identity', 'Branding'].map(format => <button key={format} className={categoryFilter === format ? 'selected' : ''} onClick={() => { setCategoryFilter(format); setShowFilterPanel(false) }}>{format}{categoryFilter === format && <Check size={13} />}</button>)}</div>}</div><span /><button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} title="Grid view"><Grid2X2 size={16} /></button><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} title="List view"><LayoutList size={16} /></button></div></div>
          <div className="section-heading"><div><h2>{activeTopNav === 'Saved' ? 'Saved work' : activeTab === 'Latest' ? 'Latest work' : 'Featured work'}</h2><p>{activeTopNav === 'Saved' ? 'Projects you want to revisit' : 'Thoughtful work from your creative circle'}</p></div><button className="see-all" onClick={() => { setActiveTab('Latest'); setActiveTopNav('Explore') }}>See all <MoveUpRight size={14} /></button></div>
          <div className={`project-grid ${view === 'list' ? 'list-view' : ''}`}>
            {filteredProjects.map(project => <ProjectCard key={project.id} project={project} onToggle={toggleProject} onOpen={setSelectedProject} view={view} />)}
            {!filteredProjects.length && <div className="empty-state"><Search size={22} /><h3>No projects found</h3><p>Try a different search term.</p></div>}
          </div>
          <section className="prompt-card"><div className="prompt-icon"><Zap size={18} /></div><div><p className="eyebrow">A SMALL PROMPT FOR YOU</p><h3>What are you exploring lately?</h3><p>Share a thought, a process, or a work-in-progress with your network.</p></div><button onClick={openProjectModal}>Start sharing <ArrowUpRight size={15} /></button></section>
        </section>

        <aside className="right-rail">
           <section className="pulse-card"><div className="pulse-top"><div><p className="eyebrow">YOUR WEEKLY PULSE</p><h2>Keep the momentum</h2></div><span className="pulse-icon"><Zap size={16} /></span></div><div className="pulse-progress"><div className="pulse-number">3<span>/5</span></div><div className="mini-bars"><i /><i /><i /><i className="muted" /><i className="muted" /></div></div><p className="pulse-copy">You’ve shared <b>3 projects</b> this week.<br />Two more to reach your goal.</p><button onClick={() => notify('Your activity timeline is up to date')}>View your activity <ArrowUpRight size={14} /></button></section>
          <section className="people-section"><div className="section-heading compact"><div><h2>People to follow</h2><p>Based on your interests</p></div><button className="more-button"><MoreHorizontal size={18} /></button></div><div className="people-list">{people.map(person => <div className="person-row" key={person.name}><img src={person.image} alt="" /><div className="person-info"><strong>{person.name}</strong><span>{person.role}</span></div><button className={followed.includes(person.name) ? 'follow-button following' : 'follow-button'} onClick={() => toggleFollow(person.name)}>{followed.includes(person.name) ? <Check size={14} /> : <Plus size={14} />}{followed.includes(person.name) ? 'Following' : 'Follow'}</button></div>)}</div><button className="full-link">Discover more people <ArrowUpRight size={14} /></button></section>
           <section className="event-card"><div className="event-date"><strong>28</strong><span>JUN</span></div><div><p className="eyebrow">UPCOMING IN COMMUNITY</p><h3>Portfolio review night</h3><p>Friday · 7:00 PM · Online</p></div><button className="small-round" onClick={() => notify('Event details opened')}><ArrowUpRight size={15} /></button></section>
          <div className="right-footer"><span>Made for curious minds</span><span className="tiny-spark">✦</span></div>
        </aside>
      </main>
      {toast && <div className="toast"><Check size={16} />{toast}</div>}
      {isModalOpen && <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && setModalOpen(false)}><form className="modal" onSubmit={addProject}><button type="button" className="modal-close" onClick={() => setModalOpen(false)}><X size={18} /></button><div className="modal-icon"><ImagePlus size={21} /></div><p className="eyebrow accent">SHARE YOUR WORK</p><h2>Add a new project</h2><p className="modal-intro">Give your latest work a little room to breathe.</p><label>Project title<input name="title" placeholder="e.g. A study in soft shapes" required /></label><label>Category or format<input name="type" placeholder="e.g. Brand identity · 2024" required /></label><label className={coverImage ? 'upload-box has-preview' : 'upload-box'}><input className="file-input" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleCoverChange} />{coverImage ? <img src={coverImage} alt="Selected cover preview" /> : <><ImagePlus size={19} /><span>Drop a cover image here</span><small>JPG, PNG up to 10MB</small></>}</label><button className="modal-submit" type="submit">Add to portfolio <ArrowUpRight size={16} /></button></form></div>}
      {selectedProject && <ProjectDetail project={projects.find(project => project.id === selectedProject.id) || selectedProject} onClose={() => setSelectedProject(null)} onToggle={toggleProject} />}
    </div>
  )
}

function ProjectCard({ project, onToggle, onOpen, view }) {
  return <article className={`project-card ${view === 'list' ? 'project-list' : ''}`}><div className={`project-image ${project.color}`}><img src={project.image} alt={project.title} /><div className="image-overlay"><button onClick={() => onToggle(project.id, 'saved')} className={project.saved ? 'save-button saved' : 'save-button'} aria-label="Save project"><Bookmark size={16} fill={project.saved ? 'currentColor' : 'none'} /></button><button className="open-button" onClick={() => onOpen(project)} aria-label={`Open ${project.title}`}><ArrowUpRight size={17} /></button></div></div><div className="project-details"><button className="project-copy" onClick={() => onOpen(project)}><h3>{project.title}</h3><p>{project.type}</p></button><div className="project-meta"><button onClick={() => onToggle(project.id, 'liked')} className={project.liked ? 'meta-action liked' : 'meta-action'}><Heart size={15} fill={project.liked ? 'currentColor' : 'none'} />{project.likes}</button><button onClick={() => onToggle(project.id, 'saved')} className={project.saved ? 'meta-action saved-meta' : 'meta-action'}><Bookmark size={15} fill={project.saved ? 'currentColor' : 'none'} />{project.saves}</button><button className="author-avatar"><img src={images.portrait} alt={project.author} /></button></div></div></article>
}

function ProjectDetail({ project, onClose, onToggle }) {
  return <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}><section className="detail-modal"><button className="modal-close" onClick={onClose} aria-label="Close project"><X size={18} /></button><div className={`detail-image ${project.color}`}><img src={project.image} alt={project.title} /></div><div className="detail-copy"><p className="eyebrow accent">PROJECT BY AISHA RAHMAN</p><h2>{project.title}</h2><p className="detail-type">{project.type}</p><p className="detail-description">A thoughtful visual study made to find the quiet moments in everyday life. Explore the process, the details, and the decisions behind this piece.</p><div className="detail-actions"><button onClick={() => onToggle(project.id, 'liked')} className={project.liked ? 'detail-action liked' : 'detail-action'}><Heart size={16} fill={project.liked ? 'currentColor' : 'none'} />{project.liked ? 'Liked' : 'Like'} · {project.likes}</button><button onClick={() => onToggle(project.id, 'saved')} className={project.saved ? 'detail-action saved-detail' : 'detail-action'}><Bookmark size={16} fill={project.saved ? 'currentColor' : 'none'} />{project.saved ? 'Saved' : 'Save'}</button><button className="detail-share" onClick={() => navigator.clipboard?.writeText(window.location.href)}>Share <ArrowUpRight size={15} /></button></div></div></section></div>
}

createRoot(document.getElementById('root')).render(<App />)
