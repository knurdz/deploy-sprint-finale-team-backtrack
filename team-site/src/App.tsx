import React from 'react';
import {
  Activity,
  Bell,
  BookOpen,
  CalendarCheck,
  GitBranch,
  GraduationCap,
  Mail,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { WeatherWidget } from './components/WeatherWidget';
import { ContactForm } from './components/ContactForm';
import { ReleaseReadiness } from './components/ReleaseReadiness';
import { CourseCard } from './components/CourseCard';
import { DeadlineBoard } from './components/DeadlineBoard';
import { LearningVelocity } from './components/LearningVelocity';
import { StatCard } from './components/StatCard';
import { courses } from './data/courses';
import { deadlineCards } from './data/deadlines';
import { sprintStats } from './data/stats';
import { runtimeConfig } from './utils/config';
import { getAverageProgress } from './utils/metrics';
import { featureFlags } from './utils/featureFlags';

function StatusPage() {
  const flags = featureFlags();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>System Status</h1>
      <ul>
        <li><strong>Team Name:</strong> {import.meta.env.VITE_TEAM_NAME || 'Unknown'}</li>
        <li><strong>Commit SHA:</strong> {import.meta.env.VITE_COMMIT_SHA || 'Unknown'}</li>
        <li><strong>Task Marker:</strong> T01, T03, T15, T24</li>
        <li><strong>Artifact ID:</strong> {import.meta.env.VITE_ARTIFACT_NAME || 'Unknown'}</li>
        <li><strong>Workflow Run:</strong> {import.meta.env.VITE_WORKFLOW_RUN || 'Unknown'}</li>
        <li><strong>Feature Flags:</strong> {JSON.stringify(flags)}</li>
      </ul>
    </div>
  );
}

export function App() {
  if (typeof window !== 'undefined' && window.location.pathname === '/status') {
    return <StatusPage />;
  }
  const flags = featureFlags();
  const averageProgress = getAverageProgress(courses);
  const publicLabel = import.meta.env.VITE_PUBLIC_DEPLOY_LABEL || 'Deploy Sprint Finale';

  return (
    <main className="shell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <div className="brandMark" aria-hidden="true">
            <GraduationCap size={24} />
          </div>
          <div>
            <strong>Deploy Sprint</strong>
            <span>Virtual LMS</span>
          </div>
        </div>

        <nav className="navLinks">
          <a className="active" href="#overview">
            <Activity size={18} />
            Overview
          </a>
          <a href="#courses">
            <BookOpen size={18} />
            Courses
          </a>
          <a href="#deadlines">
            <CalendarCheck size={18} />
            Deadlines
          </a>
          <a href="#teams">
            <Users size={18} />
            Teams
          </a>
          <a href="#contact">
            <Mail size={18} />
            Contact Support
          </a>
        </nav>

        <div className="sidebarPanel">
          <ShieldCheck size={18} />
          <p>{publicLabel} — Repository changes are reviewed before every release.</p>
        </div>

        <WeatherWidget />
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Qualifier Dashboard</p>
            <h1>Learning operations at a glance</h1>
          </div>

          <label className="searchBox">
            <Search size={18} />
            <input aria-label="Search courses" placeholder="Search courses" />
          </label>

          <button className="iconButton" aria-label="Notifications">
            <Bell size={20} />
          </button>
        </header>

        <section className="heroBand" id="overview">
          <div>
            <p className="eyebrow">Sprint health</p>
            <h2>{averageProgress}% average course progress</h2>
            <p>
              Track cohorts, deadlines, and review readiness from one dashboard
              before publishing a release.
            </p>
          </div>
          <div className="heroSignal">
            <GitBranch size={32} />
            <span>4 active learning tracks</span>
          </div>
        </section>

        <section className="statGrid" aria-label="Sprint statistics">
          {sprintStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </section>

        <LearningVelocity courses={courses} />

        <section className="contentGrid">
          <div className="panel" id="courses">
            <div className="panelHeader">
              <div>
                <p className="eyebrow">Courses</p>
                <h2>Current modules</h2>
              </div>
              <span>{courses.length} modules</span>
            </div>

            <div className="courseList">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          <DeadlineBoard deadlines={deadlineCards} />
        </section>

        <ReleaseReadiness />
        {flags.showInsights && (
          <section className="panel" id="insights" style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: '12px', background: 'var(--surface-color, #1e293b)', color: 'var(--text-color, #f8fafc)' }}>
            <div className="panelHeader">
              <div>
                <p className="eyebrow" style={{ color: '#38bdf8', fontWeight: 600 }}>Feature Flag Active (T15)</p>
                <h2>System Insights & Telemetry</h2>
              </div>
            </div>
            <p style={{ marginTop: '0.5rem', color: '#94a3b8' }}>
              Insights telemetry is currently active via <code>FEATURE_SHOW_INSIGHTS</code> environment configuration.
            </p>
          </section>
        )}

        <ContactForm />
      </section>
    </main>
  );
}
