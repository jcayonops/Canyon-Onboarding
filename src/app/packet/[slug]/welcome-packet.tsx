"use client";

import { useCallback, useEffect, useState } from "react";

interface WelcomePacketProps {
  clientName: string;
  onboardingDate: string;
  personalNote: string;
  advisorName: string;
  advisorEmail: string;
  advisorPhone: string;
  clientType: string;
}

export function WelcomePacket({
  clientName,
  onboardingDate,
  personalNote,
  advisorName,
  advisorEmail,
  advisorPhone,
  clientType,
}: WelcomePacketProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const totalCheckboxes = 14; // 9 document items + 5 action items
  const progressPercent =
    totalCheckboxes > 0
      ? Math.round((checkedItems.size / totalCheckboxes) * 100)
      : 0;

  const toggleCheck = useCallback((index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const [copied, setCopied] = useState(false);
  const copyShareLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  }, []);

  // Show business meeting card if business owner
  const showBusiness = clientType === "business_owner";

  return (
    <>
      <style>{packetCSS}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap"
        rel="stylesheet"
      />

      {/* ═══ COVER ═══ */}
      <div className="cover">
        <div className="cover-logo">
          <img
            src="/packet/logo-white.png"
            alt="Canyon Strategic Wealth"
            style={{ maxWidth: 280, height: "auto" }}
          />
        </div>
        <div className="cover-eyebrow">Personal Welcome</div>
        <h1 className="cover-title">
          Welcome to
          <br />
          <span>Canyon Strategic</span>
          <br />
          Wealth.
        </h1>
        <p className="cover-subtitle">
          This packet is your guide to getting started &mdash; who we are, what
          to expect, how we work, and the steps ahead.
        </p>
        <div className="cover-divider" />
        <div className="cover-meta">
          <div className="cover-meta-item">
            <div className="label">Prepared For</div>
            <div className="value">{clientName}</div>
          </div>
          <div className="cover-meta-item">
            <div className="label">Your Advisor</div>
            <div className="value">{advisorName}</div>
          </div>
          <div className="cover-meta-item">
            <div className="label">Date</div>
            <div className="value">{onboardingDate}</div>
          </div>
        </div>
        {personalNote && (
          <div
            style={{
              marginTop: 28,
              animation: "fadeUp 0.8s 0.5s ease both",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "var(--sky)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Personal Note from {advisorName.split(",")[0]}
            </div>
            <div
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.75)",
                fontWeight: 300,
                maxWidth: 540,
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              {personalNote}
            </div>
          </div>
        )}
        <div className="cover-bottom-bar" />
      </div>

      {/* ═══ SECTION 1: WELCOME ═══ */}
      <div className="section">
        <SectionHeader num={1} eyebrow="Introduction" title="Welcome & Firm Overview" />
        <div className="welcome-grid">
          <div className="welcome-text">
            <p>
              Dear <strong>{clientName}</strong>,
            </p>
            <p>
              On behalf of the entire team at{" "}
              <strong>Canyon Strategic Wealth</strong>, welcome. We&rsquo;re
              genuinely honored you&rsquo;ve placed your trust in us &mdash; and
              we don&rsquo;t take that lightly.
            </p>
            <p>
              We built Canyon Strategic Wealth around a simple belief: that
              financial planning done well is deeply personal. Every
              recommendation we make, every strategy we build, is grounded in
              your unique story, your goals, and what matters most to you.
            </p>
            <p>
              As your Virtual Family Office, we serve as the strategic
              quarterback coordinating across every aspect of your financial life
              &mdash; investments, taxes, estate planning, risk management, and
              beyond. You&rsquo;ll never have to wonder if all the pieces fit
              together. That&rsquo;s our job.
            </p>
            <p>
              This packet is designed to give you a clear picture of who we are,
              how we work together, and what&rsquo;s ahead in your first few
              months as a client. If you ever have a question &mdash; no matter
              how small &mdash; please reach out. We&rsquo;re here for exactly
              that.
            </p>
            <div className="welcome-signature">
              <div className="signature-name">{advisorName}</div>
              <div className="signature-title">
                Private Wealth Advisor, Owner &middot; Canyon Strategic Wealth
              </div>
            </div>
          </div>
          <div className="welcome-values">
            <h3>Our Core Commitments</h3>
            <ValueItem icon="🧭" title="Fiduciary First" desc="We are legally and ethically required to act in your best interest — always." />
            <ValueItem icon="🔒" title="Transparency" desc="No hidden fees, no surprises. We clearly explain every recommendation and cost." />
            <ValueItem icon="🤝" title="Long-Term Partnership" desc="We grow with you — through life changes, market shifts, and every milestone ahead." />
            <ValueItem icon="🏔️" title="Personalized Strategy" desc="Your financial plan is built for your life — not templated from a shelf." />
          </div>
        </div>
      </div>

      {/* ═══ SECTION 2: JOURNEY ═══ */}
      <div className="section section-alt">
        <SectionHeader num={2} eyebrow="Your Journey" title="What to Expect — Your Roadmap" />
        <div className="pipeline-wrapper">
          <div className="pipeline-track">
            <PipelineStage icon="🔍" label="Phase 1" badge="Weeks 1–2" title="Intro & Discovery" desc="We get to know each other and gather the full picture of your financial life — income, assets, liabilities, goals, and what matters most." />
            <PipelineConnector />
            <PipelineStage icon="🗺️" label="Phase 2" badge="Weeks 2–3" title="Roadmap & Alignment" desc="Our team builds your personalized financial plan — a strategic roadmap of priorities. We review it together and align on direction." />
            <PipelineConnector />
            <PipelineStage icon="🚀" label="Phase 3" badge="Weeks 3–5" title="Implementation" desc="Planning turns into action — opening accounts, transferring assets, establishing positions, and setting everything in motion." />
          </div>
          <div className="pipeline-row-connector">
            <svg className="row-desktop-svg" viewBox="0 0 1000 48" preserveAspectRatio="none">
              <path className="prc-path" d="M920,0 L920,16 Q920,24 912,24 L88,24 Q80,24 80,32 L80,48" />
              <polygon className="prc-head" points="75,44 80,52 85,44" />
            </svg>
            <div className="row-mobile-arrow">
              <svg viewBox="0 0 24 24">
                <path className="connector-path" d="M2,12 L16,12" />
                <polygon className="connector-arrow" points="14,8 22,12 14,16" />
              </svg>
            </div>
          </div>
          <div className="pipeline-track">
            <PipelineStage icon="⚙️" label="Phase 4" badge="Weeks 5–8" title="Optimization" desc="We tie investments, tax strategy, and cash flow together. Your CPA joins the team so everything works holistically and tax-efficiently." />
            <PipelineConnector />
            <PipelineStage icon="🛡️" label="Phase 5" badge="Weeks 8–12" title="Integration" desc="We protect your wealth through estate planning and risk management, coordinate with professionals, and stress-test for the unexpected." />
            <PipelineConnector />
            <PipelineStage icon="🤝" label="Phase 6" badge="Always" title="Ongoing Partnership" desc="You move into our annual rhythm — biannual planning meetings, proactive check-in calls, and year-round coordination across your team." />
          </div>
        </div>

        {/* Meeting Overview */}
        <div className="meetings-intro">
          <h3>Your Meeting Overview</h3>
          <p>
            Over the next few months, we&rsquo;ll work through a structured
            series of meetings designed to address every aspect of your financial
            life. Here&rsquo;s what each meeting covers and how to schedule.
          </p>
          <div className="meeting-flow">
            <div className="meeting-flow-row">
              <MeetingCard num={1} title="Discovery Meeting" desc="An in-depth conversation about your financial life, goals, and priorities. We gather key details to build a plan aligned with your vision." link="https://calendly.com/jakecazier/discovery-meeting" />
              <MeetingArrow />
              <MeetingCard num={2} title="Roadmap Review" desc="A high-level review of your financial plan, outlining priorities and opportunities. We make sure we're aligned before moving forward." link="https://calendly.com/jakecazier/review-adjust" />
              <MeetingArrow />
              <MeetingCard num={3} title="Implementation" desc="We open and consolidate accounts, sync your financial data, and begin executing. This step lays the foundation for everything ahead." link="https://calendly.com/jakecazier/implementation" />
              <MeetingArrow />
              <MeetingCard num={4} title="Investment, Tax & Cash Flow" desc="A deep dive into your investment strategy, cash flow management, and tax planning — ensuring your financial structure works efficiently." link="https://calendly.com/jakecazier/investment-plan-meeting" />
            </div>
            <div className="meeting-row-connector">
              <svg className="row-desktop-svg" viewBox="0 0 1000 44" preserveAspectRatio="none">
                <path className="mrc-path" d="M920,0 L920,14 Q920,22 912,22 L88,22 Q80,22 80,30 L80,44" />
                <polygon className="mrc-head" points="75,40 80,48 85,40" />
              </svg>
              <div className="row-mobile-arrow">
                <svg viewBox="0 0 24 24">
                  <path className="mfa-path" d="M2,12 L16,12" />
                  <polygon className="mfa-head" points="14,8 22,12 14,16" />
                </svg>
              </div>
            </div>
            <div className="meeting-flow-row">
              <MeetingCard num={5} title="Tax Pro Introduction" desc="We coordinate tax planning with your CPA (or introduce you to a trusted one). This ensures tax efficiency across all aspects of your plan." link="https://calendly.com/jakecazier/tax-pro-intro" />
              <MeetingArrow />
              <MeetingCard num={6} title="Estate Planning" desc="We review your estate planning needs, discuss legacy goals, and ensure essential documents are in place to protect your wealth and family." link="https://calendly.com/jakecazier/estate-planning" />
              <MeetingArrow />
              <MeetingCard num={7} title="Risk Mitigation" desc="A comprehensive review of your insurance coverage to identify gaps and protect against risks across your life, family, and business." link="https://calendly.com/jakecazier/risk-planning" />
              {showBusiness && (
                <>
                  <MeetingArrow />
                  <MeetingCard num={8} title="Business Review" desc="For business owners — we look at your enterprise as part of your overall wealth strategy, maximizing value today while planning for tomorrow." link="https://calendly.com/jakecazier/discovery-meeting" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SECTION 3: ONGOING SERVICE ═══ */}
      <div className="section">
        <SectionHeader num={3} eyebrow="What Comes Next" title="Ongoing Service Preview" />
        <div className="ongoing-grid">
          <OngoingCard icon="🌱" title="Spring Meeting" desc="Full review — plan updates, progress on action items, investment review, tax positioning, and any life changes since we last met." />
          <OngoingCard icon="☀️" title="Summer Call" desc="Proactive check-in — lighter touch to surface any emerging needs, share quick updates, and stay connected." />
          <OngoingCard icon="🍂" title="Fall Meeting" desc="Year-end planning — tax-loss harvesting, Roth conversions, charitable giving, insurance renewals, and goal-setting for the year ahead." />
          <OngoingCard icon="❄️" title="Winter Call" desc="Year-end wrap-up — confirm final actions, personal connection, and make sure nothing slips through the cracks before the new year." />
        </div>
        <div className="ongoing-note">
          <p>
            <strong>Year-round coordination.</strong> Beyond scheduled meetings,
            we proactively coordinate across your professional team &mdash; CPA,
            estate attorney, insurance specialists &mdash; so every strategy
            stays aligned. You&rsquo;ll also receive timely reminders for
            important financial to-dos and opportunities throughout the year.
          </p>
        </div>
      </div>

      {/* ═══ SECTION 4: TEAM ═══ */}
      <div className="section section-alt">
        <SectionHeader num={4} eyebrow="Who We Are" title="Your Team & Contacts" />
        <div className="team-grid">
          <TeamCard name="Jake Cazier, CFP®" role="Private Wealth Advisor · Owner" email="jake@canyonstrategicwealth.com" phone="(801) 903-8287" avatar="/packet/jake.jpg" />
          <TeamCard name="Shawnee Lowry" role="Senior Client Relations Manager" email="shawnee@canyonstrategicwealth.com" phone="(385) 590-9757" avatar="/packet/shawnee.jpg" />
          <TeamCard name="Brizden Staker" role="Administrative Assistant" email="brizden@canyonstrategicwealth.com" initials="BS" />
        </div>
        <div className="contact-callout">
          <div>
            <h3>Need to reach us?</h3>
            <p>
              Our team is available Monday through Friday, 8am to 5pm Mountain
              Time. Don&rsquo;t hesitate to call or email &mdash; we&rsquo;re
              here for exactly that.
            </p>
          </div>
          <div className="contact-details">
            <div className="contact-detail">
              {"📞"} {advisorPhone}
            </div>
            <div className="contact-detail">
              {"✉️"} {advisorEmail}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SECTION 5: NEXT STEPS ═══ */}
      <div className="section">
        <SectionHeader num={5} eyebrow="Getting Started" title="Your Next Steps" />
        <div className="next-steps-grid">
          <div className="checklist-group">
            <h3>
              <span className="group-icon">{"📋"}</span> Documents to Gather
            </h3>
            {documentItems.map((item, i) => (
              <CheckItem key={i} index={i} text={item.text} sub={item.sub} checked={checkedItems.has(i)} onToggle={toggleCheck} />
            ))}
          </div>
          <div className="checklist-group">
            <h3>
              <span className="group-icon">{"✅"}</span> Action Items
            </h3>
            {actionItems.map((item, i) => (
              <CheckItem key={i} index={i + 9} text={item.text} sub={item.sub} subLink={item.subLink} checked={checkedItems.has(i + 9)} onToggle={toggleCheck} />
            ))}
          </div>
        </div>
        <a
          href="https://canyon-strategic-wealth.app.box.com/f/d6263a01d83b4d2e937ec616963458c7"
          className="upload-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"📤"} Upload Your Documents Securely
        </a>
        <div className="progress-bar-wrap">
          <div className="progress-label">Your Onboarding Progress</div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="progress-pct">{progressPercent}%</div>
        </div>
      </div>

      {/* ═══ SECTION 6: REFLECTION ═══ */}
      <div className="section section-alt">
        <SectionHeader num={6} eyebrow="Look Inward" title="Reflection Questions" />
        <div className="reflection-intro">
          <p>
            Before our Discovery Meeting, we&rsquo;d love for you to spend a few
            quiet minutes with these three questions. There are no right or wrong
            answers &mdash; just honest reflection. These questions help us
            understand what truly matters to you, so we can build a plan around
            the life you want to live.
          </p>
        </div>
        <div className="reflection-cards">
          <div className="reflection-card">
            <p>
              Imagine you are financially secure and have enough money for all
              your needs, now and in the future. How would you live your life?
            </p>
          </div>
          <div className="reflection-card">
            <p>
              Imagine your doctor says you have 5 to 10 years left. You remain
              as healthy as today, but your time is limited. How would you choose
              to spend it?
            </p>
          </div>
          <div className="reflection-card">
            <p>
              Imagine your doctor tells you that you have just one day left. What
              did you miss out on? Who didn&rsquo;t you become? What didn&rsquo;t
              you do?
            </p>
          </div>
        </div>
      </div>

      {/* ═══ CLIENT HUB ═══ */}
      <div className="client-hub">
        <div className="hub-header">
          <div className="hub-eyebrow">Your Client Hub</div>
          <div className="hub-title">Everything You Need, One Place</div>
          <div className="hub-subtitle">
            Quick access to your accounts, resources, and tools &mdash; all in
            one spot.
          </div>
        </div>
        <div className="hub-grid">
          <HubCard icon="🏦" color="blue" title="Charles Schwab" desc="Log into your brokerage and investment accounts" badge="Log In →" href="https://www.schwab.com/client-home" />
          <HubCard icon="📊" color="blue" title="eMoney" desc="View your financial plan, net worth, and projections" badge="Log In →" href="https://wealth.emaplan.com/ema/SignIn" />
          <HubCard icon="📄" color="gold" title="Investment Fact Sheets" desc="Download detailed information on the investments we recommend" badge="Download →" href="#" />
          <HubCard icon="💬" color="green" title="Quick Chat" desc="Have a quick question? Book a 15-minute call with Jake" badge="Schedule →" href="https://calendly.com/jakecazier/client-quick-chat" />
          <HubCard icon="📅" color="green" title="Client Meeting" desc="Schedule a full meeting outside the regular onboarding flow" badge="Schedule →" href="https://calendly.com/jakecazier/client-meeting-custom-calendar" />
          <HubCard icon="⭐" color="purple" title="Leave Us a Review" desc="Your feedback means the world — share your experience on Google" badge="Review →" href="https://g.page/r/CTJ13I7IB7CNEBM/review" />
        </div>
        <div className="hub-contact-row">
          <a href={`mailto:${advisorEmail}`} className="hub-btn hub-btn-primary">
            {"✉️"} Email {advisorName.split(",")[0]}
          </a>
          <a href={`tel:${advisorPhone.replace(/\D/g, "")}`} className="hub-btn hub-btn-secondary">
            {"📱"} {advisorPhone}
          </a>
        </div>
        <div className="hub-share-bar">
          <p>
            Want to share this welcome packet with your spouse or someone else?
          </p>
          <button
            className={`share-copy-btn${copied ? " copied" : ""}`}
            onClick={copyShareLink}
          >
            {copied ? "✅ Link Copied!" : "📋 Copy Link to Share"}
          </button>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div className="footer-logo">
          <img
            src="/packet/logo-white.png"
            alt="Canyon Strategic Wealth"
            style={{ maxWidth: 200, height: "auto" }}
          />
        </div>
        <div className="footer-legal">
          This document is for informational purposes only and is intended solely
          for the named recipient. Canyon Strategic Wealth is a registered
          investment adviser. Past performance is not indicative of future
          results.
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Form ADV</a>
          <a href="#">Disclosures</a>
        </div>
      </footer>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────

function SectionHeader({ num, eyebrow, title }: { num: number; eyebrow: string; title: string }) {
  return (
    <div className="section-header">
      <div className="section-num">{num}</div>
      <div className="section-title-wrap">
        <div className="section-eyebrow">{eyebrow}</div>
        <div className="section-title">{title}</div>
      </div>
    </div>
  );
}

function ValueItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="value-item">
      <div className="value-icon">{icon}</div>
      <div className="value-text">
        <div className="vtitle">{title}</div>
        <div className="vdesc">{desc}</div>
      </div>
    </div>
  );
}

function PipelineStage({ icon, label, badge, title, desc }: { icon: string; label: string; badge: string; title: string; desc: string }) {
  return (
    <div className="pipeline-stage">
      <div className="pipeline-node">
        <div className="pipeline-icon">{icon}</div>
        <div className="pipeline-label">{label}</div>
        <div className="pipeline-badge">{badge}</div>
        <div className="pipeline-title">{title}</div>
        <div className="pipeline-desc">{desc}</div>
      </div>
    </div>
  );
}

function PipelineConnector() {
  return (
    <div className="pipeline-connector">
      <div className="connector-line">
        <svg viewBox="0 0 48 30">
          <path className="connector-path" d="M0,15 L38,15" />
          <polygon className="connector-arrow" points="36,10 46,15 36,20" />
        </svg>
      </div>
    </div>
  );
}

function MeetingCard({ num, title, desc, link }: { num: number; title: string; desc: string; link: string }) {
  return (
    <div className="meeting-card">
      <div className="mc-num-badge">{num}</div>
      <div className="mc-title">{title}</div>
      <div className="mc-desc">{desc}</div>
      <a href={link} className="mc-link" target="_blank" rel="noopener noreferrer">
        {"📅"} Schedule
      </a>
    </div>
  );
}

function MeetingArrow() {
  return (
    <div className="meeting-flow-arrow">
      <svg viewBox="0 0 24 24">
        <path className="mfa-path" d="M2,12 L16,12" />
        <polygon className="mfa-head" points="14,8 22,12 14,16" />
      </svg>
    </div>
  );
}

function OngoingCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="ongoing-card">
      <div className="ongoing-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function TeamCard({ name, role, email, phone, avatar, initials }: { name: string; role: string; email: string; phone?: string; avatar?: string; initials?: string }) {
  return (
    <div className="team-card">
      <div className="team-card-top" />
      <div className="team-avatar">
        {avatar ? (
          <img src={avatar} alt={name} />
        ) : (
          initials
        )}
      </div>
      <div className="team-card-body">
        <div className="team-name">{name}</div>
        <div className="team-role">{role}</div>
        <div className="team-contact">
          <a href={`mailto:${email}`}>{"✉️"} {email}</a>
          {phone && <a href={`tel:${phone.replace(/\D/g, "")}`}>{"📱"} {phone}</a>}
        </div>
      </div>
    </div>
  );
}

function HubCard({ icon, color, title, desc, badge, href }: { icon: string; color: string; title: string; desc: string; badge: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hub-card">
      <div className={`hub-card-icon ${color}`}>{icon}</div>
      <div className="hub-card-title">{title}</div>
      <div className="hub-card-desc">{desc}</div>
      <div className="hub-card-badge">{badge}</div>
    </a>
  );
}

function CheckItem({ index, text, sub, subLink, checked, onToggle }: { index: number; text: string; sub: string; subLink?: string; checked: boolean; onToggle: (i: number) => void }) {
  return (
    <div className="check-item" onClick={() => onToggle(index)}>
      <div className={`checkbox${checked ? " checked" : ""}`}>
        {checked ? "✓" : ""}
      </div>
      <div>
        <div className={`check-text${checked ? " done" : ""}`}>{text}</div>
        <div className="check-sub">
          {subLink ? (
            <a
              href={subLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--sky)", textDecoration: "none", fontWeight: 700 }}
              onClick={(e) => e.stopPropagation()}
            >
              {sub}
            </a>
          ) : (
            sub
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────

const documentItems = [
  { text: "Most recent tax returns (last 2 years)", sub: "Federal + state, including all schedules" },
  { text: "Investment & retirement account statements", sub: "401(k), IRA, brokerage accounts, pension info" },
  { text: "List of all assets and debts", sub: "Real estate, vehicles, loans, credit cards, etc." },
  { text: "Income and expense details", sub: "Pay stubs, business income, monthly budget if available" },
  { text: "Insurance policies", sub: "Life, disability, long-term care, home, auto, umbrella" },
  { text: "Estate planning documents", sub: "Will, trust documents, powers of attorney, beneficiary designations" },
  { text: "Social Security statements", sub: "Available at ssa.gov/myaccount" },
  { text: "Employee benefits summary", sub: "Open enrollment guides, stock options, RSUs, etc." },
  { text: "Any other documentation you feel may be useful", sub: "Financial goals, prior plans, notes — anything that helps us understand the full picture" },
];

const actionItems = [
  { text: "Schedule your Discovery Meeting", sub: "Book on Calendly →", subLink: "https://calendly.com/jakecazier/discovery-meeting" },
  { text: "Gather your important documents", sub: "Use the checklist on the left as your guide" },
  { text: "Upload documents securely", sub: "Secure upload portal →", subLink: "https://canyon-strategic-wealth.app.box.com/f/d6263a01d83b4d2e937ec616963458c7" },
  { text: "Reflect on the questions below", sub: "No right answers — just honest reflection to guide our planning" },
  { text: "Review & sign client agreement", sub: "DocuSign link sent to your email" },
];

// ─── CSS ──────────────────────────────────────────────────────

const packetCSS = `
  :root {
    --navy: #1B3A5C;
    --navy-deep: #122844;
    --sky: #7EC8E3;
    --sky-light: #C5E8F4;
    --sky-pale: #EBF6FB;
    --gold: #C9A84C;
    --white: #FFFFFF;
    --gray: #F5F7FA;
    --text: #2C3E50;
    --text-light: #6B7C93;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Lato', sans-serif !important;
    background: var(--white) !important;
    color: var(--text);
    font-size: 15px;
    line-height: 1.7;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cover {
    min-height: 100vh;
    background: linear-gradient(150deg, var(--navy-deep) 0%, var(--navy) 55%, #2A5A8C 100%);
    display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
    padding: 80px 10%; position: relative; overflow: hidden;
  }
  .cover::before { content: ''; position: absolute; top: -120px; right: -120px; width: 520px; height: 520px; border-radius: 50%; background: radial-gradient(circle, rgba(126,200,227,0.18) 0%, transparent 70%); }
  .cover::after { content: ''; position: absolute; bottom: -80px; left: 30%; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(126,200,227,0.10) 0%, transparent 70%); }
  .cover-logo { display: flex; align-items: center; margin-bottom: 80px; animation: fadeUp 0.8s ease both; }
  .cover-eyebrow { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--sky); font-weight: 700; margin-bottom: 20px; animation: fadeUp 0.8s 0.1s ease both; }
  .cover-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 7vw, 72px); color: var(--white); line-height: 1.1; font-weight: 700; margin-bottom: 28px; animation: fadeUp 0.8s 0.2s ease both; }
  .cover-title span { color: var(--sky); }
  .cover-subtitle { font-size: 17px; color: rgba(255,255,255,0.65); font-weight: 300; max-width: 520px; margin-bottom: 60px; animation: fadeUp 0.8s 0.3s ease both; }
  .cover-divider { width: 60px; height: 3px; background: linear-gradient(90deg, var(--sky), var(--sky-light)); margin-bottom: 36px; animation: fadeUp 0.8s 0.35s ease both; }
  .cover-meta { display: flex; gap: 48px; animation: fadeUp 0.8s 0.45s ease both; flex-wrap: wrap; }
  .cover-meta-item .label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--sky); font-weight: 700; margin-bottom: 4px; }
  .cover-meta-item .value { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 300; }
  .cover-bottom-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, var(--sky), var(--sky-light), var(--navy)); }

  .section { padding: 80px 10%; position: relative; }
  .section-alt { background: var(--gray); }
  .section-header { display: flex; align-items: center; gap: 16px; margin-bottom: 48px; }
  .section-num { width: 48px; height: 48px; border-radius: 50%; background: var(--navy); color: var(--sky); font-family: 'Playfair Display', serif; font-size: 18px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
  .section-eyebrow { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--sky); font-weight: 700; margin-bottom: 4px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--navy); font-weight: 600; line-height: 1.2; }

  .welcome-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .welcome-text p { color: var(--text); margin-bottom: 20px; font-size: 15px; line-height: 1.8; }
  .welcome-text p strong { color: var(--navy); }
  .welcome-signature { margin-top: 32px; padding-top: 24px; border-top: 1px solid #E0E7EE; }
  .signature-name { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--navy); }
  .signature-title { font-size: 12px; color: var(--text-light); letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }
  .welcome-values { background: var(--navy); border-radius: 16px; padding: 36px; color: var(--white); }
  .welcome-values h3 { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--sky); margin-bottom: 24px; }
  .value-item { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 24px; }
  .value-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(126,200,227,0.15); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; border: 1px solid rgba(126,200,227,0.3); }
  .value-text .vtitle { font-weight: 700; font-size: 14px; color: var(--sky-light); margin-bottom: 4px; }
  .value-text .vdesc { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.6; }

  .pipeline-wrapper { position: relative; padding: 20px 0 40px; overflow: hidden; }
  .pipeline-track { display: flex; gap: 0; position: relative; align-items: stretch; }
  .pipeline-stage { flex: 1; position: relative; z-index: 2; }
  .pipeline-node { position: relative; background: var(--white); border-radius: 16px; padding: 24px 20px 20px; border: 1px solid #E0E7EE; box-shadow: 0 2px 16px rgba(27,58,92,0.06); transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; height: 100%; display: flex; flex-direction: column; }
  .pipeline-stage:hover .pipeline-node { transform: translateY(-6px); box-shadow: 0 12px 36px rgba(27,58,92,0.14); border-color: var(--sky); }
  .pipeline-connector { flex: 0 0 48px; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; }
  .connector-line { position: relative; width: 100%; height: 2px; }
  .connector-line svg { width: 100%; height: 30px; overflow: visible; position: absolute; top: -14px; left: 0; }
  .connector-path { stroke: var(--sky); stroke-width: 2; stroke-dasharray: 6 4; fill: none; animation: flowDash 1.2s linear infinite; }
  .connector-arrow { fill: var(--sky); animation: pulseArrow 2s ease-in-out infinite; }
  @keyframes flowDash { to { stroke-dashoffset: -20; } }
  @keyframes pulseArrow { 0%, 100% { opacity: 0.6; transform: translateX(0); } 50% { opacity: 1; transform: translateX(2px); } }
  .pipeline-icon { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--navy) 0%, #2A5A8C 100%); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 12px rgba(27,58,92,0.15); }
  .pipeline-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--sky); font-weight: 700; margin-bottom: 4px; }
  .pipeline-badge { font-size: 10px; padding: 2px 8px; border-radius: 20px; background: var(--sky-pale); color: var(--navy); font-weight: 700; display: inline-block; margin-bottom: 10px; }
  .pipeline-title { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--navy); margin-bottom: 8px; line-height: 1.3; }
  .pipeline-desc { font-size: 13px; color: var(--text-light); line-height: 1.65; flex: 1; }
  .pipeline-row-connector { position: relative; width: 100%; height: 48px; }
  .pipeline-row-connector svg { width: 100%; height: 48px; overflow: visible; display: block; }
  .prc-path { stroke: var(--sky); stroke-width: 2; stroke-dasharray: 6 4; fill: none; animation: flowDash 1.2s linear infinite; }
  .prc-head { fill: var(--sky); }

  .meetings-intro { margin-top: 56px; padding-top: 48px; border-top: 2px solid #E0E7EE; }
  .meetings-intro h3 { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--navy); margin-bottom: 12px; }
  .meetings-intro > p { font-size: 15px; color: var(--text-light); max-width: 680px; margin-bottom: 32px; line-height: 1.8; }
  .meeting-flow { display: flex; flex-direction: column; gap: 0; position: relative; }
  .meeting-flow-row { display: flex; align-items: stretch; gap: 0; }
  .meeting-card { flex: 1; background: var(--white); border: 1px solid #E0E7EE; border-radius: 14px; padding: 22px 20px 18px; box-shadow: 0 2px 12px rgba(27,58,92,0.06); transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; position: relative; }
  .meeting-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(27,58,92,0.12); z-index: 2; }
  .mc-num-badge { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, var(--navy), #2A5A8C); color: var(--white); font-size: 12px; font-weight: 700; margin-bottom: 10px; flex-shrink: 0; }
  .meeting-card .mc-title { font-family: 'Playfair Display', serif; font-size: 15px; color: var(--navy); margin-bottom: 6px; line-height: 1.3; }
  .meeting-card .mc-desc { font-size: 12px; color: var(--text-light); line-height: 1.6; flex: 1; margin-bottom: 12px; }
  .meeting-card .mc-link { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; color: var(--navy); text-decoration: none; letter-spacing: 0.5px; padding: 6px 12px; border-radius: 8px; background: var(--sky-pale); transition: background 0.2s, transform 0.2s; align-self: flex-start; }
  .meeting-card .mc-link:hover { background: var(--sky-light); transform: scale(1.03); }
  .meeting-flow-arrow { flex: 0 0 36px; display: flex; align-items: center; justify-content: center; }
  .meeting-flow-arrow svg { width: 24px; height: 24px; overflow: visible; }
  .mfa-path { stroke: var(--sky); stroke-width: 2; stroke-dasharray: 5 3; fill: none; animation: flowDash 1.2s linear infinite; }
  .mfa-head { fill: var(--sky); }
  .meeting-row-connector { position: relative; width: 100%; height: 44px; }
  .meeting-row-connector svg { width: 100%; height: 44px; overflow: visible; display: block; }
  .mrc-path { stroke: var(--sky); stroke-width: 2; stroke-dasharray: 5 3; fill: none; animation: flowDash 1.2s linear infinite; }
  .mrc-head { fill: var(--sky); }
  .row-mobile-arrow { display: none; }

  .ongoing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .ongoing-card { background: var(--white); border-radius: 16px; padding: 32px 24px; border: 1px solid #E0E7EE; box-shadow: 0 2px 12px rgba(27,58,92,0.06); text-align: center; transition: transform 0.2s, box-shadow 0.2s; }
  .ongoing-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(27,58,92,0.12); }
  .ongoing-icon { width: 56px; height: 56px; border-radius: 50%; background: var(--sky-pale); display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 16px; }
  .ongoing-card h4 { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--navy); margin-bottom: 8px; }
  .ongoing-card p { font-size: 13px; color: var(--text-light); line-height: 1.6; }
  .ongoing-note { margin-top: 40px; background: linear-gradient(135deg, var(--navy) 0%, #2A5A8C 100%); border-radius: 16px; padding: 32px 40px; color: var(--white); display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
  .ongoing-note p { font-size: 15px; color: rgba(255,255,255,0.85); line-height: 1.7; flex: 1; min-width: 260px; }
  .ongoing-note strong { color: var(--sky-light); }

  .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
  .team-card { position: relative; background: var(--white); border-radius: 16px; overflow: visible; border: 1px solid #E0E7EE; box-shadow: 0 2px 12px rgba(27,58,92,0.06); transition: transform 0.2s, box-shadow 0.2s; }
  .team-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(27,58,92,0.12); }
  .team-card-top { height: 80px; background: linear-gradient(135deg, var(--navy) 0%, #2A5A8C 100%); border-radius: 16px 16px 0 0; }
  .team-avatar { width: 72px; height: 72px; border-radius: 50%; background: var(--sky-pale); border: 4px solid var(--white); position: absolute; top: 44px; left: 24px; display: flex; align-items: center; justify-content: center; font-size: 26px; color: var(--navy); box-shadow: 0 4px 12px rgba(27,58,92,0.15); overflow: hidden; }
  .team-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .team-card-body { padding: 48px 24px 24px; }
  .team-name { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--navy); font-weight: 600; margin-bottom: 4px; }
  .team-role { font-size: 12px; color: var(--sky); text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 16px; }
  .team-contact { display: flex; flex-direction: column; gap: 8px; }
  .team-contact a { font-size: 13px; color: var(--text-light); text-decoration: none; display: flex; align-items: center; gap: 8px; transition: color 0.2s; }
  .team-contact a:hover { color: var(--navy); }
  .contact-callout { background: linear-gradient(135deg, var(--navy) 0%, #2A5A8C 100%); border-radius: 16px; padding: 36px 40px; color: var(--white); margin-top: 40px; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
  .contact-callout h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--sky-light); margin-bottom: 8px; }
  .contact-callout p { font-size: 14px; color: rgba(255,255,255,0.7); max-width: 400px; }
  .contact-details { display: flex; flex-direction: column; gap: 10px; }
  .contact-detail { font-size: 14px; color: var(--sky-light); display: flex; gap: 10px; align-items: center; }

  .next-steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  .checklist-group { background: var(--white); border-radius: 16px; padding: 32px; border: 1px solid #E0E7EE; box-shadow: 0 2px 12px rgba(27,58,92,0.06); }
  .checklist-group h3 { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--navy); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid var(--sky-pale); display: flex; align-items: center; gap: 10px; }
  .check-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #F0F4F8; cursor: pointer; }
  .check-item:last-child { border-bottom: none; }
  .checkbox { width: 20px; height: 20px; border-radius: 5px; border: 2px solid #C5D5E8; flex-shrink: 0; margin-top: 2px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer; background: var(--white); font-size: 12px; }
  .checkbox.checked { background: var(--navy); border-color: var(--navy); color: var(--white); }
  .check-text { font-size: 14px; color: var(--text); line-height: 1.5; }
  .check-text.done { text-decoration: line-through; color: var(--text-light); }
  .check-sub { font-size: 12px; color: var(--text-light); margin-top: 2px; }
  .upload-cta { margin-top: 24px; display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: var(--navy); color: var(--white); border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; transition: background 0.2s; }
  .upload-cta:hover { background: #2A5A8C; }
  .progress-bar-wrap { background: var(--navy); border-radius: 16px; padding: 28px 36px; display: flex; align-items: center; gap: 32px; margin-top: 32px; flex-wrap: wrap; }
  .progress-label { color: var(--sky-light); font-size: 14px; font-weight: 700; white-space: nowrap; }
  .progress-track { flex: 1; height: 10px; border-radius: 5px; background: rgba(255,255,255,0.15); min-width: 120px; }
  .progress-fill { height: 100%; border-radius: 5px; background: linear-gradient(90deg, var(--sky), var(--sky-light)); transition: width 0.4s ease; }
  .progress-pct { color: var(--sky); font-weight: 700; font-size: 16px; font-family: 'Playfair Display', serif; white-space: nowrap; }

  .reflection-intro { max-width: 640px; margin-bottom: 48px; }
  .reflection-intro p { font-size: 15px; color: var(--text-light); line-height: 1.8; }
  .reflection-cards { display: grid; grid-template-columns: 1fr; gap: 28px; max-width: 760px; }
  .reflection-card { background: var(--white); border-radius: 16px; padding: 36px 40px; border-left: 5px solid var(--gold); box-shadow: 0 2px 12px rgba(27,58,92,0.06); position: relative; }
  .reflection-card::before { content: '\\201C'; position: absolute; top: 12px; left: 16px; font-family: 'Playfair Display', serif; font-size: 64px; color: var(--sky-pale); line-height: 1; }
  .reflection-card p { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--navy); line-height: 1.6; font-style: italic; font-weight: 400; padding-left: 12px; }

  .client-hub { background: linear-gradient(150deg, var(--navy-deep) 0%, var(--navy) 55%, #2A5A8C 100%); padding: 64px 10%; position: relative; overflow: hidden; }
  .client-hub::before { content: ''; position: absolute; top: -80px; right: -80px; width: 360px; height: 360px; border-radius: 50%; border: 60px solid rgba(126,200,227,0.04); pointer-events: none; }
  .hub-header { text-align: center; margin-bottom: 48px; }
  .hub-eyebrow { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--sky); font-weight: 700; margin-bottom: 8px; }
  .hub-title { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--white); font-weight: 600; line-height: 1.2; margin-bottom: 12px; }
  .hub-subtitle { font-size: 15px; color: rgba(255,255,255,0.6); max-width: 560px; margin: 0 auto; line-height: 1.7; }
  .hub-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 36px; }
  .hub-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(126,200,227,0.15); border-radius: 16px; padding: 28px 24px; text-decoration: none; color: var(--white); transition: background 0.2s, transform 0.2s, border-color 0.2s; display: flex; flex-direction: column; }
  .hub-card:hover { background: rgba(255,255,255,0.10); transform: translateY(-4px); border-color: rgba(126,200,227,0.35); }
  .hub-card-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 16px; }
  .hub-card-icon.blue { background: rgba(126,200,227,0.15); }
  .hub-card-icon.gold { background: rgba(201,168,76,0.15); }
  .hub-card-icon.green { background: rgba(72,187,120,0.15); }
  .hub-card-icon.purple { background: rgba(159,122,234,0.15); }
  .hub-card-title { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--sky-light); margin-bottom: 8px; }
  .hub-card-desc { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; flex: 1; margin-bottom: 16px; }
  .hub-card-badge { font-size: 11px; font-weight: 700; color: var(--sky); letter-spacing: 0.5px; }
  .hub-contact-row { display: flex; justify-content: center; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
  .hub-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; transition: background 0.2s, transform 0.2s; }
  .hub-btn-primary { background: var(--sky); color: var(--navy-deep); }
  .hub-btn-primary:hover { background: var(--sky-light); transform: scale(1.03); }
  .hub-btn-secondary { background: rgba(255,255,255,0.1); color: var(--sky-light); border: 1px solid rgba(126,200,227,0.3); }
  .hub-btn-secondary:hover { background: rgba(255,255,255,0.15); transform: scale(1.03); }
  .hub-share-bar { text-align: center; padding-top: 24px; border-top: 1px solid rgba(126,200,227,0.15); }
  .hub-share-bar p { font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 12px; }
  .share-copy-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(126,200,227,0.25); color: var(--sky-light); padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; font-family: 'Lato', sans-serif; }
  .share-copy-btn:hover { background: rgba(255,255,255,0.14); }
  .share-copy-btn.copied { background: rgba(72,187,120,0.2); border-color: rgba(72,187,120,0.4); color: #68D391; }

  footer { background: var(--navy-deep); padding: 48px 10%; text-align: center; }
  .footer-logo { margin-bottom: 20px; }
  .footer-legal { font-size: 11px; color: rgba(255,255,255,0.35); max-width: 600px; margin: 0 auto 16px; line-height: 1.7; }
  .footer-links { display: flex; justify-content: center; gap: 24px; }
  .footer-links a { font-size: 11px; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--sky); }

  @media (max-width: 900px) {
    .welcome-grid { grid-template-columns: 1fr; }
    .pipeline-track { flex-direction: column; gap: 16px; }
    .pipeline-connector { flex: 0 0 24px; transform: rotate(90deg); }
    .pipeline-row-connector { height: 24px; margin: 16px 0; display: flex; align-items: center; justify-content: center; }
    .pipeline-row-connector .row-desktop-svg { display: none; }
    .pipeline-row-connector .row-mobile-arrow { display: flex; align-items: center; justify-content: center; transform: rotate(90deg); }
    .pipeline-row-connector .row-mobile-arrow svg { width: 24px; height: 24px; overflow: visible; }
    .meeting-flow-row { flex-direction: column; gap: 12px; }
    .meeting-flow-arrow { transform: rotate(90deg); flex: 0 0 24px; }
    .meeting-row-connector { height: 24px; margin: 12px 0; display: flex; align-items: center; justify-content: center; }
    .meeting-row-connector .row-desktop-svg { display: none; }
    .meeting-row-connector .row-mobile-arrow { display: flex; align-items: center; justify-content: center; transform: rotate(90deg); }
    .meeting-row-connector .row-mobile-arrow svg { width: 24px; height: 24px; overflow: visible; }
    .ongoing-grid { grid-template-columns: 1fr 1fr; }
    .next-steps-grid { grid-template-columns: 1fr; }
    .hub-grid { grid-template-columns: 1fr 1fr; }
    .cover-meta { gap: 24px; }
    .team-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 600px) {
    .ongoing-grid { grid-template-columns: 1fr; }
    .hub-grid { grid-template-columns: 1fr; }
    .cover-meta { flex-direction: column; gap: 16px; }
    .section { padding: 40px 20px; }
    .cover { padding: 40px 20px; min-height: auto; }
    .client-hub { padding: 40px 20px; }
    .section-title { font-size: 24px; }
    .cover-title { font-size: 32px; }
    .pipeline-node { padding: 20px 16px; }
    .meeting-card { padding: 18px 16px 16px; }
    .ongoing-card { padding: 24px 16px; }
    .team-card-body { padding: 48px 16px 20px; }
    .hub-card { padding: 20px 16px; }
    .values-box { padding: 24px 16px; }
    .check-group { padding: 20px 16px; }
    .upload-cta { padding: 16px; font-size: 14px; }
    .hub-contact-row { flex-direction: column; align-items: center; gap: 12px; }
    .hub-btn { width: 100%; text-align: center; justify-content: center; }
    .hub-share-bar { padding: 20px 16px; }
    footer { padding: 40px 20px; }
    .reflection-item { padding: 16px 20px; }
    .coord-callout { padding: 20px; margin: 24px 0 0; font-size: 13px; }
  }
`;
