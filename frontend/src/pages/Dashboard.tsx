import { useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  Plus,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react"
import { 
  approveRecruiter, 
  getRegistrations, 
  rejectRecruiter,
  useAuth 
} from "../app/auth"
import {
  Badge,
  Button,
  Card,
  LinkButton,
  PageHeader,
  SectionTitle,
} from "../components/ui"
import { ScoreBadge } from "../components/Feedback"
import { getInterviews } from "../lib/storage"

const candidates = [
  {
    name: "Alex Chen",
    role: "Backend Developer",
    status: "Completed",
    score: 86,
    date: "Apr 18",
  },
  {
    name: "Jordan Lee",
    role: "Backend Developer",
    status: "Completed",
    score: 78,
    date: "Apr 17",
  },
  {
    name: "Sam Rivera",
    role: "Frontend Engineer",
    status: "In progress",
    score: null,
    date: "Apr 17",
  },
  {
    name: "Priya Shah",
    role: "Product Engineer",
    status: "Invited",
    score: null,
    date: "Apr 16",
  },
]

const users = [
  {
    name: "Morgan Ellis",
    email: "morgan@acme.co",
    role: "Recruiter",
    status: "Active",
  },
  {
    name: "Alex Chen",
    email: "alex@example.com",
    role: "Candidate",
    status: "Active",
  },
  {
    name: "Taylor Reed",
    email: "taylor@acme.co",
    role: "Administrator",
    status: "Active",
  },
  {
    name: "Jamie Kim",
    email: "jamie@example.com",
    role: "Candidate",
    status: "Deactivated",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [params] = useSearchParams()
  const view = params.get("view") || "overview"
  const isAdmin = user?.role === "admin"

  if (view === "reports") return <HiringAnalytics admin={isAdmin} />
  if (isAdmin && view === "users") return <AdminUsers />
  if (isAdmin && view === "sessions") return <AdminSessions />
  if (!isAdmin && view === "candidates") return <CandidateList />
  return isAdmin ? (
    <AdminOverview />
  ) : (
    <RecruiterOverview name={user?.name || "there"} />
  )
}

function RecruiterOverview({ name }: { name: string }) {
  const interviewCount = getInterviews().length
  return (
    <>
      <PageHeader
        eyebrow="Recruiter workspace"
        title={`Good morning, ${name.split(" ")[0]}`}
        description="Here’s what is happening across your interview pipeline."
        action={
          <LinkButton to="/interviews/create">
            <Plus size={17} /> Create interview
          </LinkButton>
        }
      />
      <div className="stat-grid">
        <StatCard
          icon={BriefcaseBusiness}
          label="Active interviews"
          value={String(interviewCount + 5)}
          detail="+2 this week"
        />
        <StatCard
          icon={Users}
          label="Candidates"
          value="24"
          detail="8 awaiting review"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completion rate"
          value="82%"
          detail="+6% this month"
        />
        <StatCard
          icon={UserCheck}
          label="Recommended"
          value="7"
          detail="Across 16 completed"
        />
      </div>
      <div className="dashboard-grid">
        <Card className="span-two">
          <SectionTitle
            title="Recent candidates"
            description="Latest activity across your open roles."
            action={
              <LinkButton to="/dashboard?view=candidates" variant="ghost">
                View all <ArrowRight size={16} />
              </LinkButton>
            }
          />
          <CandidateTable compact />
        </Card>
        <Card>
          <SectionTitle
            title="Open interviews"
            description="Progress this week."
          />
          <div className="progress-list">
            {[
              ["Backend Developer", 12, 18],
              ["Frontend Engineer", 7, 12],
              ["Product Engineer", 4, 10],
            ].map(([label, done, total]) => (
              <div key={label}>
                <div className="progress-label">
                  <strong>{label}</strong>
                  <span>
                    {done}/{total}
                  </span>
                </div>
                <div className="progress-track">
                  <span
                    style={{
                      width: `${(Number(done) / Number(total)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Users
  label: string
  value: string
  detail: string
}) {
  return (
    <Card className="stat-card">
      <div className="stat-top">
        <span className="stat-icon">
          <Icon size={19} />
        </span>
        <span className="positive">{detail}</span>
      </div>
      <strong className="stat-value">{value}</strong>
      <span className="stat-label">{label}</span>
    </Card>
  )
}

function CandidateTable({ compact = false }: { compact?: boolean }) {
  const rows = compact ? candidates.slice(0, 4) : candidates
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Role</th>
            <th>Status</th>
            <th>Score</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((candidate) => (
            <tr key={candidate.name}>
              <td>
                <div className="person-cell">
                  <span className="table-avatar">
                    {candidate.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </span>
                  <strong>{candidate.name}</strong>
                </div>
              </td>
              <td>{candidate.role}</td>
              <td>
                <Badge
                  tone={
                    candidate.status === "Completed"
                      ? "green"
                      : candidate.status === "In progress"
                        ? "blue"
                        : "neutral"
                  }
                >
                  {candidate.status}
                </Badge>
              </td>
              <td>
                {candidate.score ? <strong>{candidate.score}</strong> : "—"}
              </td>
              <td>{candidate.date}</td>
              <td>
                <LinkButton
                  to={candidate.score ? "/candidate/results" : "/dashboard"}
                  variant="ghost"
                >
                  {candidate.score ? (
                    "View report"
                  ) : (
                    <MoreHorizontal size={17} />
                  )}
                </LinkButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CandidateList() {
  const [selected, setSelected] = useState<string[]>([
    "Alex Chen",
    "Jordan Lee",
  ])
  const comparable = useMemo(
    () =>
      candidates.filter((item) => selected.includes(item.name) && item.score),
    [selected],
  )
  return (
    <>
      <PageHeader
        title="Candidates"
        description="Review results and compare evidence across completed interviews."
      />
      <Card>
        <SectionTitle
          title="Candidate pipeline"
          description="Select completed candidates to compare scores."
        />
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Compare</th>
                <th>Candidate</th>
                <th>Role</th>
                <th>Status</th>
                <th>Score</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.name}>
                  <td>
                    <input
                      aria-label={`Compare ${candidate.name}`}
                      type="checkbox"
                      disabled={!candidate.score}
                      checked={selected.includes(candidate.name)}
                      onChange={(event) =>
                        setSelected((current) =>
                          event.target.checked
                            ? [...current, candidate.name]
                            : current.filter((name) => name !== candidate.name),
                        )
                      }
                    />
                  </td>
                  <td>
                    <strong>{candidate.name}</strong>
                  </td>
                  <td>{candidate.role}</td>
                  <td>
                    <Badge
                      tone={candidate.status === "Completed" ? "green" : "blue"}
                    >
                      {candidate.status}
                    </Badge>
                  </td>
                  <td>{candidate.score || "—"}</td>
                  <td>
                    <LinkButton to="/candidate/results" variant="ghost">
                      View report
                    </LinkButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {comparable.length > 1 && (
        <Card>
          <SectionTitle
            title="Score comparison"
            description="A simple side-by-side view of selected candidates."
          />
          <div className="compare-grid">
            {comparable.map((candidate) => (
              <div className="compare-card" key={candidate.name}>
                <div>
                  <strong>{candidate.name}</strong>
                  <p className="muted">{candidate.role}</p>
                </div>
                <ScoreBadge score={candidate.score!} />
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  )
}

function AdminOverview() {
  return (
    <>
      <PageHeader
        eyebrow="Administrator workspace"
        title="System overview"
        description="Manage access and monitor interview activity across the platform."
      />
      <div className="stat-grid">
        <StatCard
          icon={Users}
          label="Total users"
          value="1,248"
          detail="+38 this month"
        />
        <StatCard
          icon={CalendarClock}
          label="Active sessions"
          value="18"
          detail="4 started today"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed today"
          value="42"
          detail="98.6% success rate"
        />
        <StatCard
          icon={BriefcaseBusiness}
          label="Hiring teams"
          value="36"
          detail="+3 this month"
        />
      </div>
      <div className="dashboard-grid">
        <Card className="span-two">
          <SectionTitle
            title="Recent platform activity"
            description="Latest user and interview events."
          />
          <div className="activity-list">
            {[
              [
                "Interview completed",
                "Alex Chen · Backend Developer",
                "2 min ago",
              ],
              [
                "New recruiter account",
                "Morgan Ellis · Acme Inc.",
                "18 min ago",
              ],
              [
                "Interview started",
                "Sam Rivera · Frontend Engineer",
                "24 min ago",
              ],
              ["User deactivated", "Jamie Kim · Candidate", "1 hr ago"],
            ].map(([title, detail, time]) => (
              <div key={detail}>
                <span className="activity-dot" />
                <div>
                  <strong>{title}</strong>
                  <p>{detail}</p>
                </div>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle
            title="Service monitoring"
            description="Live health monitoring needs a backend status endpoint."
          />
          <div className="status-list">
            {[
              "AI question generation",
              "Code execution",
              "Evaluation service",
              "API connectivity",
            ].map((item) => (
              <div key={item}>
                <span className="status-dot neutral" />
                <span>{item}</span>
                <strong className="status-unreported">Not reported</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}

function AdminUsers() {
  const [, setRevision] = useState(0)
  const managedUsers = [
    ...getRegistrations().map((registration) => ({
      ...registration,
      role: registration.role === "recruiter" ? "Recruiter" : "Candidate",
    })),
    ...users.filter(
      (user) =>
        !getRegistrations().some(
          (registration) => registration.email === user.email,
        ),
    ),
  ]
  const [states, setStates] = useState<Record<string, string>>(
    Object.fromEntries(managedUsers.map((user) => [user.email, user.status])),
  )

  function statusFor(email: string, initialStatus: string) {
    return states[email] || initialStatus
  }

  return (
    <>
      <PageHeader
        title="User accounts"
        description="Approve recruiter registrations and manage access across the platform."
      />
      <Card>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {managedUsers.map((user) => (
                <tr key={user.email}>
                  <td>
                    <strong>{user.name}</strong>
                    <span className="cell-subtitle">{user.email}</span>
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <Badge
                      tone={
                        statusFor(user.email, user.status) === "Active"
                          ? "green"
                          : statusFor(user.email, user.status).includes(
                                "Pending",
                              )
                            ? "amber"
                            : statusFor(user.email, user.status) === "Rejected"
                            ? "red"  
                            : "neutral"
                      }
                    >
                      {statusFor(user.email, user.status)}
                    </Badge>
                  </td>
                  <td>
                    {statusFor(user.email, user.status) ===
                    "Pending admin approval" ? (
                      <div className="action-group">
                        <Button
                          variant="primary"
                          className="approve-button"
                          onClick={() => {
                            approveRecruiter(user.email)
                            setStates((current) => ({
                              ...current,
                              [user.email]: "Active",
                            }))
                            setRevision((current) => current + 1)
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            rejectRecruiter(user.email)
                            setStates((current) => ({
                              ...current,
                              [user.email]: "Rejected",
                            }))
                            setRevision((current) => current + 1)
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : statusFor(user.email, user.status) ===
                      "Pending email verification" ? (
                      <Button variant="secondary" disabled>
                        Awaiting verification
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() =>
                          setStates((current) => ({
                            ...current,
                            [user.email]:
                              statusFor(user.email, user.status) === "Active"
                                ? "Deactivated"
                                : "Active",
                          }))
                        }
                      >
                        {statusFor(user.email, user.status) === "Active"
                          ? "Deactivate"
                          : "Reactivate"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

function AdminSessions() {
  return (
    <>
      <PageHeader
        title="Interview sessions"
        description="Monitor active and recently completed sessions across the platform."
      />
      <Card>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Interview</th>
                <th>Team</th>
                <th>Status</th>
                <th>Started</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Sam Rivera",
                  "Frontend Engineer",
                  "Northstar Labs",
                  "In progress",
                  "32 min ago",
                ],
                [
                  "Alex Chen",
                  "Backend Developer",
                  "Acme Inc.",
                  "Completed",
                  "1 hr ago",
                ],
                [
                  "Priya Shah",
                  "Product Engineer",
                  "Vertex",
                  "In progress",
                  "1 hr ago",
                ],
                [
                  "Jordan Lee",
                  "Backend Developer",
                  "Acme Inc.",
                  "Completed",
                  "Yesterday",
                ],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={cell}>
                      {index === 0 ? (
                        <strong>{cell}</strong>
                      ) : index === 3 ? (
                        <Badge tone={cell === "Completed" ? "green" : "blue"}>
                          {cell}
                        </Badge>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

const interviewTrend = [
  { month: "Nov", value: 42 },
  { month: "Dec", value: 51 },
  { month: "Jan", value: 48 },
  { month: "Feb", value: 67 },
  { month: "Mar", value: 74 },
  { month: "Apr", value: 86 },
]

const scoreDistribution = [
  { range: "90–100", label: "Excellent", count: 12, width: 32 },
  { range: "80–89", label: "Strong", count: 28, width: 74 },
  { range: "70–79", label: "Good", count: 38, width: 100 },
  { range: "60–69", label: "Developing", count: 21, width: 55 },
  { range: "Below 60", label: "Needs improvement", count: 9, width: 24 },
]

const recommendations = [
  { label: "Strong Hire", count: 18, tone: "green" as const },
  { label: "Hire", count: 34, tone: "green" as const },
  { label: "Lean Hire", count: 27, tone: "amber" as const },
  { label: "No Hire", count: 21, tone: "red" as const },
]

function HiringAnalytics({ admin }: { admin: boolean }) {
  return (
    <>
      <PageHeader
        title={admin ? "System reports" : "Hiring analytics"}
        description={
          admin
            ? "Platform-wide interview activity and operational insights."
            : "Trends across interviews, candidates, and hiring decisions."
        }
      />
      <div className="analytics-preview-note">
        <span className="status-dot neutral" />
        <p>
          <strong>Preview data</strong> · This dashboard is ready for backend
          integration. Values currently demonstrate the final reporting
          experience.
        </p>
      </div>

      <div className="stat-grid">
        <StatCard
          icon={BriefcaseBusiness}
          label={admin ? "Platform interviews" : "Total interviews"}
          value={admin ? "1,284" : "368"}
          detail="+18% this quarter"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completion rate"
          value="84%"
          detail="+5% this quarter"
        />
        <StatCard
          icon={Target}
          label="Average score"
          value="74.6"
          detail="+2.4 points"
        />
        <StatCard
          icon={Clock3}
          label="Average duration"
          value="41m"
          detail="−6 min this quarter"
        />
      </div>

      <div className="analytics-grid">
        <Card className="analytics-wide">
          <SectionTitle
            title="Interview volume"
            description="Completed technical interviews over the last six months."
            action={
              <div className="analytics-change">
                <TrendingUp size={15} /> 18%
              </div>
            }
          />
          <div className="bar-chart" aria-label="Interview volume chart">
            {interviewTrend.map((item) => (
              <div className="bar-column" key={item.month}>
                <span className="bar-value">{item.value}</span>
                <div className="bar-track">
                  <span style={{ height: `${item.value}%` }} />
                </div>
                <span className="bar-label">{item.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Hiring recommendations"
            description="Final AI recommendations."
          />
          <div className="recommendation-list">
            {recommendations.map((item) => (
              <div key={item.label}>
                <div className="recommendation-label">
                  <Badge tone={item.tone}>{item.label}</Badge>
                  <strong>{item.count}%</strong>
                </div>
                <div className="progress-track">
                  <span
                    className={`recommendation-bar ${item.tone}`}
                    style={{ width: `${item.count}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="analytics-wide">
          <SectionTitle
            title="Score distribution"
            description="Candidate performance across completed interviews."
          />
          <div className="distribution-list">
            {scoreDistribution.map((item) => (
              <div className="distribution-row" key={item.range}>
                <div className="distribution-name">
                  <strong>{item.range}</strong>
                  <span>{item.label}</span>
                </div>
                <div className="distribution-track">
                  <span style={{ width: `${item.width}%` }} />
                </div>
                <strong className="distribution-count">{item.count}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle
            title="Interview funnel"
            description="Candidate progress this quarter."
          />
          <div className="funnel-list">
            {[
              ["Invited", 142, "100%"],
              ["Started", 126, "89%"],
              ["Completed", 119, "84%"],
              ["Recommended", 62, "44%"],
            ].map(([label, count, percent]) => (
              <div key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{count}</strong>
                </div>
                <Badge tone={label === "Recommended" ? "green" : "neutral"}>
                  {percent}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
