import { useEffect, useState } from 'react'
import moment from 'moment'
import './App.css'

const highlights = [
  {
    label: 'Daily Ops',
    value: '10k+',
    target: 10,
    suffix: 'k+',
    detail: 'NestJS APIs under 200ms',
  },
  {
    label: 'Users',
    value: '2,500+',
    target: 2500,
    suffix: '+',
    detail: 'Task + MES platforms',
  },
  {
    label: 'Realtime',
    value: '500+/s',
    target: 500,
    suffix: '+/s',
    detail: 'RxJS + WebSockets',
  },
  {
    label: 'DB Load',
    value: '-40%',
    target: -40,
    suffix: '%',
    detail: 'Query optimization',
  },
  {
    label: 'Test Coverage',
    value: '85%',
    target: 85,
    suffix: '%',
    detail: 'Unit + integration',
  },
]

const skills = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript'],
  },
  {
    title: 'Backend',
    items: ['NestJS', 'Node.js', 'RESTful APIs', 'JWT', 'OAuth 2.0'],
  },
  {
    title: 'Frontend',
    items: [
      'Angular',
      'Vue.js',
      'Ionic Angular',
      'Angular Material',
      'Responsive Design',
    ],
  },
  {
    title: 'Database',
    items: ['PostgreSQL', 'MS SQL', 'Schema Design', 'Query Optimization'],
  },
  {
    title: 'Testing & Quality',
    items: ['Unit Testing', 'Integration Testing', 'API Testing', 'Code Reviews'],
  },
  {
    title: 'Tools & DevOps',
    items: ['Postman', 'Swagger', 'Jira', 'Agile Delivery'],
  },
]

const experience = [
  {
    role: 'Full Stack Developer',
    company: 'Finstien, Chennai',
    time: 'Jul 2024 - Present',
    points: [
      'Designed web-based task management and manufacturing execution systems for 2,500+ users.',
      'Built NestJS APIs handling 10k+ daily operations with JWT + OAuth 2.0 authentication.',
      'Delivered Angular apps with real-time dashboards using RxJS observables and WebSockets.',
      'Optimized PostgreSQL schemas to reduce database load by 40%.',
      'Raised coverage from 60% to 85% with unit and integration testing.',
      'Collaborated in Agile 2-week sprints across planning, stand-ups, and code reviews.',
    ],
  },
  {
    role: 'Manual Testing Intern',
    company: 'Finstein',
    time: '1.5 months',
    points: [
      'Executed test cases, logged defects, and supported QA validation for web modules.',
    ],
  },
]

function App() {
  const [theme, setTheme] = useState('light')
  const [counts, setCounts] = useState(() => highlights.map(() => 0))
  const [showTop, setShowTop] = useState(false)
  const joiningMonth = moment('2024-07-01')
  const currentMonth = moment().startOf('month')
  const experienceMonths = Math.max(currentMonth.diff(joiningMonth, 'months'), 0)
  const experienceYears = (experienceMonths / 12).toFixed(1)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
      return
    }
    const prefersLight =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    const next = prefersLight ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }, [])

  useEffect(() => {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setCounts(highlights.map((item) => item.target))
      return undefined
    }

    const duration = 1600
    const start = performance.now()
    let rafId

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCounts(
        highlights.map((item) => Math.round(item.target * eased))
      )

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafId)
  }, [])


  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }


  const scrollToTop = () => {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__content reveal">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <p className="eyebrow">Full Stack Developer</p>
          <h1>
            <span className="typewriter">
              Logeshwaran <span className="name-accent">Selvam</span>
            </span>
          </h1>
          <p className="lead">
            Full Stack Software Engineer with {experienceYears} years of experience building
            scalable web applications and RESTful APIs using Angular, NestJS,
            and TypeScript. I focus on clean architecture, performant data
            systems, and intuitive user experiences across web and mobile.
          </p>
          <div className="hero__actions">
            <a className="btn primary" href="mailto:logeshwarans159@gmail.com">
              Email Me
            </a>
            <a className="btn ghost" href="tel:+919342787758">
              Call: 93427 87758
            </a>
            <a
              className="btn ghost"
              href="https://linkedin.com/in/logeshwaran-selvam"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <div className="hero__meta">
            <span>Chennai, TN</span>
            <span>Open to full stack roles</span>
            <span>React.js portfolio stack</span>
          </div>
        </div>
        <div className="hero__panel reveal delay-1">
          <div className="panel-card">
            <h2>Impact Highlights</h2>
            <div className="stats">
              {highlights.map((item, index) => (
                <div className="stat" key={item.label}>
                  <div>
                    <p className="stat__value">
                      {(counts[index] ?? item.target).toLocaleString() +
                        item.suffix}
                    </p>
                    <p className="stat__label">{item.label}</p>
                  </div>
                  <p className="stat__detail">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel-card panel-card--accent">
            <h2>Core Stack</h2>
            <div className="tags">
              {[
                'TypeScript',
                'NestJS',
                'Angular',
                'PostgreSQL',
                'RxJS',
                'WebSockets',
              ].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p>
              Passionate about building reliable APIs, rich data dashboards, and
              clean UI systems that scale with business needs.
            </p>
          </div>
        </div>
      </header>

      <section className="section reveal delay-2">
        <div className="section__header">
          <h2>Technical Skills</h2>
          <p>
            A balanced toolkit across frontend, backend, and quality engineering
            for full lifecycle delivery.
          </p>
        </div>
        <div className="grid">
          {skills.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal delay-3">
        <div className="section__header">
          <h2>Professional Experience</h2>
          <p>
            Recent work focused on high-scale systems, real-time insights, and
            measurable performance improvements.
          </p>
        </div>
        <div className="timeline">
          {experience.map((role) => (
            <article className="timeline__item" key={role.role}>
              <div className="timeline__meta">
                <h3>{role.role}</h3>
                <p>{role.company}</p>
                <span>{role.time}</span>
              </div>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal delay-4">
        <div className="section__header">
          <h2>Education</h2>
          <p>
            Bachelor of Computer Science, Sri Ramakrishna College of Arts and
            Science, Coimbatore (2024)
          </p>
        </div>
        <div className="edu-card">
          <div>
            <h3>Bachelor of Computer Science</h3>
            <p>Sri Ramakrishna College of Arts and Science, Coimbatore</p>
          </div>
          <span>2024</span>
        </div>
      </section>

      <footer className="footer reveal delay-4">
        <div>
          <h2>Let’s build something impactful.</h2>
          <p>
            Available for full stack roles, with experience in Angular, NestJS,
            and data-driven product delivery.
          </p>
        </div>
        <div className="footer__actions">
          <a className="btn primary" href="mailto:logeshwarans159@gmail.com">
            logeshwarans159@gmail.com
          </a>
          <a className="btn ghost" href="tel:+919342787758">
            +91 93427 87758
          </a>
        </div>
      </footer>

      <button
        className={`to-top${showTop ? ' to-top--visible' : ''}`}
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  )
}

export default App
