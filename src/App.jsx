import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════
   REAL DATA — Dipesh Kumar, 24BCON2327, B.Tech CSE AI/ML
══════════════════════════════════════════════════════ */
const STUDENT = {
  name: "Dipesh Kumar", initials: "DK",
  rrn: "24BCON2327", batch: "2024-25",
  school: "School of Engineering & Technology",
  degree: "B.Tech – CSE (AI & ML) – Xebia",
  semester: "IV", attendance: 84.92,
  totalClasses: 179, present: 152, absent: 27,
  session: "Jan–June 2025-2026", cgpa: 8.4,
};

const COURSES = [
  { code: "BCO357A", name: "Unsupervised Learning & Neural Networks", short: "ULNN", type: "Theory", faculty: "MOHD TALIB", classes: 33, present: 30, absent: 3, pct: 90.91, color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  { code: "BCO010B", name: "Database Management Systems", short: "DBMS", type: "Theory", faculty: "Shipra Khandelwal", classes: 40, present: 33, absent: 7, pct: 82.50, color: "#ec4899", bg: "rgba(236,72,153,0.12)" },
  { code: "BCO094B", name: "Google Cloud Computing Foundation", short: "GCC", type: "Theory", faculty: "Rupayali Swaroop", classes: 33, present: 27, absent: 6, pct: 81.82, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { code: "BCO009A", name: "Computer Organization and Design", short: "COD", type: "Theory", faculty: "PIYUSH AGRAWAL", classes: 31, present: 25, absent: 6, pct: 80.65, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { code: "DMA011C", name: "Life Skills 2 (Aptitude)", short: "LS2", type: "Theory", faculty: "MONIKA YADAV", classes: 0, present: 0, absent: 0, pct: 0, color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  { code: "BCO358A", name: "ULNN Lab", short: "ULNN Lab", type: "Practical", faculty: "MOHD TALIB", classes: 11, present: 10, absent: 1, pct: 90.91, color: "#06b6d4", bg: "rgba(6,182,212,0.12)" },
  { code: "BCO013B", name: "DBMS Lab", short: "DBMS Lab", type: "Practical", faculty: "Shipra Khandelwal", classes: 9, present: 8, absent: 1, pct: 88.89, color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  { code: "DIN004A", name: "Value Education 2", short: "VE2", type: "Project", faculty: "—", classes: 0, present: 0, absent: 0, pct: 0, color: "#64748b", bg: "rgba(100,116,139,0.12)" },
];

const TIMETABLE = {
  Monday:    ["BCO009A", null, "BCO010B", null, "BCO357A", "BCO358A", null],
  Tuesday:   [null, "DMA011C", null, "BCO094B", "BCO009A", null, "BCO013B"],
  Wednesday: ["BCO357A", null, "BCO013B", "DMA011C", null, "BCO094B", null],
  Thursday:  [null, "BCO010B", "BCO094B", null, "BCO358A", "BCO009A", null],
  Friday:    ["BCO013B", "BCO357A", null, "BCO010B", null, null, "DMA011C"],
  Saturday:  [null, null, "BCO094B", null, null, null, null],
};
const SLOTS = ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM"];
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const TODAY = "Wednesday";
const SLOT_HOURS = [8,9,10,11,12,13,14];

const ASSIGNMENTS = [
  { id:1, code:"BCO357A", subject:"Unsupervised Learning & Neural Networks", title:"K-Means Clustering Implementation", due:"2026-05-08", status:"pending", faculty:"MOHD TALIB", desc:"Implement K-Means from scratch using NumPy, visualize cluster convergence." },
  { id:2, code:"BCO010B", subject:"Database Management Systems", title:"Normalization – 3NF / BCNF Report", due:"2026-05-06", status:"pending", faculty:"Shipra Khandelwal", desc:"Write a detailed report on normalizing a hospital management DB to BCNF." },
  { id:3, code:"BCO094B", subject:"Google Cloud Computing Foundation", title:"Cloud Architecture Diagram", due:"2026-04-30", status:"overdue", faculty:"Rupayali Swaroop", desc:"Design a multi-tier cloud architecture diagram using GCP services." },
  { id:4, code:"BCO009A", subject:"Computer Organization and Design", title:"CPU Pipeline Simulation", due:"2026-04-25", status:"submitted", marks:"19/20", faculty:"PIYUSH AGRAWAL", submittedOn:"Apr 24, 2026 11:42 PM" },
  { id:5, code:"DMA011C", subject:"Life Skills 2 (Aptitude)", title:"Mock Aptitude Test Submission", due:"2026-04-20", status:"submitted", marks:"16/20", faculty:"MONIKA YADAV", submittedOn:"Apr 19, 2026 9:15 PM" },
];

const NOTICES = [
  { id:1, title:"Mid-Semester Exam Schedule Released", date:"May 2", urgent:true, body:"Mid-semester examinations begin May 18, 2026. Download hall ticket from Examination section before May 15, 2026. Contact Academic Office for seat queries." },
  { id:2, title:"Penalty for Writing on Wall – Office Order", date:"Apr 30", urgent:true, body:"Students found writing or drawing on college walls will be fined ₹500 as per Dean's office order dated April 30, 2026." },
  { id:3, title:"Unfair Means – Appellate Committee Notice", date:"Apr 30", urgent:false, body:"Students appealing against UMC decisions may submit written applications to Academic Office by May 10, 2026." },
  { id:4, title:"Library Holiday – Monday May 5", date:"Apr 28", urgent:false, body:"The university library will remain closed on May 5, 2026 (public holiday). Digital resources remain accessible." },
];

const FEES = [
  { label:"Tuition Fee – Sem IV", amount:"₹52,000", status:"paid", date:"Paid Jan 2026" },
  { label:"Examination Fee – Sem IV", amount:"₹2,800", status:"paid", date:"Paid Mar 2026" },
  { label:"Development Fund", amount:"₹5,000", status:"due", date:"Due May 15, 2026" },
  { label:"Library Fine", amount:"₹120", status:"due", date:"Overdue – Pay immediately" },
];

/* ══════════ helpers ══════════ */
function getCourse(code) { return COURSES.find(c => c.code === code); }
const nowHour = new Date().getHours();
const nowSlotIdx = SLOT_HOURS.findIndex(h => h === nowHour);
const todaySlots = TIMETABLE[TODAY] || [];
const currentCode = nowSlotIdx >= 0 ? todaySlots[nowSlotIdx] : null;
const nextSlotIdx = todaySlots.findIndex((c, i) => i > Math.max(nowSlotIdx, 0) && c);
const nextCode = nextSlotIdx >= 0 ? todaySlots[nextSlotIdx] : null;

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function JECRCERP() {
  const [page, setPage] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const [assignTab, setAssignTab] = useState("pending");
  const [ttView, setTtView] = useState("today");
  const [expandNotice, setExpandNotice] = useState(null);
  const [submitTarget, setSubmitTarget] = useState(null);
  const [submitText, setSubmitText] = useState("");
  const [submissions, setSubmissions] = useState({});
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [assignSearch, setAssignSearch] = useState("");
  const [assignFilter, setAssignFilter] = useState("all");
  const fileRef = useRef();

  const allA = ASSIGNMENTS.map(a => submissions[a.id] ? {...a, status:"submitted", submittedOn:"Just now", marks:"Pending review"} : a);
  const pendingA = allA.filter(a => a.status === "pending");
  const overdueA = allA.filter(a => a.status === "overdue");
  const submittedA = allA.filter(a => a.status === "submitted");
  const progPct = Math.round((submittedA.length / allA.length) * 100);

  function submitAssignment(id) {
    if (!submitText.trim() && !uploadedFile) return;
    setSubmissions(s => ({...s, [id]: true}));
    setSubmitTarget(null); setSubmitText(""); setUploadedFile(null);
  }

  const NAV = [
    {id:"home", label:"Home", icon:HomeIcon},
    {id:"assignments", label:"Tasks", icon:TaskIcon},
    {id:"timetable", label:"Schedule", icon:CalIcon},
    {id:"attendance", label:"Attend.", icon:AttIcon},
    {id:"more", label:"More", icon:MoreIcon},
  ];

  return (
    <div style={{fontFamily:"'DM Sans','SF Pro Display',system-ui,sans-serif", minHeight:"100vh", position:"relative", overflow:"hidden", color:"#0f172a"}}>
      {/* ── LIQUID GLASS BACKGROUND ── */}
      <div style={{position:"fixed",inset:0,zIndex:0,background:"linear-gradient(135deg,#dbeafe 0%,#ede9fe 30%,#fce7f3 60%,#d1fae5 100%)"}}>
        <div style={{position:"absolute",top:"-20%",left:"-10%",width:"55%",height:"55%",background:"radial-gradient(ellipse,rgba(99,102,241,0.25) 0%,transparent 70%)",filter:"blur(60px)"}} />
        <div style={{position:"absolute",bottom:"0%",right:"-5%",width:"50%",height:"50%",background:"radial-gradient(ellipse,rgba(236,72,153,0.2) 0%,transparent 70%)",filter:"blur(60px)"}} />
        <div style={{position:"absolute",top:"40%",left:"30%",width:"40%",height:"40%",background:"radial-gradient(ellipse,rgba(16,185,129,0.15) 0%,transparent 70%)",filter:"blur(80px)"}} />
        <div style={{position:"absolute",inset:0,backdropFilter:"blur(0px)",background:"rgba(248,250,252,0.4)"}} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.3);border-radius:2px}

        .glass{
          background:rgba(255,255,255,0.55);
          backdrop-filter:blur(20px) saturate(180%);
          -webkit-backdrop-filter:blur(20px) saturate(180%);
          border:1px solid rgba(255,255,255,0.7);
          box-shadow:0 8px 32px rgba(99,102,241,0.08),0 1px 0 rgba(255,255,255,0.9) inset;
        }
        .glass-dark{
          background:rgba(15,23,42,0.65);
          backdrop-filter:blur(20px) saturate(180%);
          border:1px solid rgba(255,255,255,0.12);
          box-shadow:0 8px 32px rgba(0,0,0,0.2);
        }
        .glass-card{
          background:rgba(255,255,255,0.6);
          backdrop-filter:blur(16px) saturate(160%);
          -webkit-backdrop-filter:blur(16px) saturate(160%);
          border:1px solid rgba(255,255,255,0.75);
          border-radius:20px;
          box-shadow:0 4px 24px rgba(99,102,241,0.07),0 1px 0 rgba(255,255,255,0.95) inset;
          transition:transform .2s ease,box-shadow .2s ease;
        }
        .glass-card:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(99,102,241,0.13),0 1px 0 rgba(255,255,255,0.95) inset}
        .glass-card-sm{
          background:rgba(255,255,255,0.5);
          backdrop-filter:blur(12px);
          -webkit-backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,0.7);
          border-radius:16px;
          box-shadow:0 2px 12px rgba(99,102,241,0.06);
          transition:all .18s ease;
        }
        .glass-card-sm:hover{background:rgba(255,255,255,0.7);transform:translateY(-1px)}

        .btn-glass{
          background:rgba(255,255,255,0.6);
          backdrop-filter:blur(10px);
          border:1px solid rgba(255,255,255,0.8);
          border-radius:12px;
          padding:8px 16px;
          font-size:13px;font-weight:600;
          cursor:pointer;color:#334155;
          transition:all .18s;font-family:inherit;
          box-shadow:0 2px 8px rgba(99,102,241,0.08);
        }
        .btn-glass:hover{background:rgba(255,255,255,0.85);box-shadow:0 4px 16px rgba(99,102,241,0.14)}
        .btn-primary{
          background:linear-gradient(135deg,#6366f1,#8b5cf6);
          color:#fff;border:none;border-radius:12px;
          padding:10px 20px;font-size:13px;font-weight:700;
          cursor:pointer;font-family:inherit;
          box-shadow:0 4px 16px rgba(99,102,241,0.4);
          transition:all .2s;letter-spacing:.2px;
        }
        .btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(99,102,241,0.5)}
        .btn-primary:disabled{opacity:.45;cursor:not-allowed;transform:none}
        .btn-danger{background:linear-gradient(135deg,#dc2626,#ef4444);color:#fff;border:none;border-radius:12px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;box-shadow:0 4px 16px rgba(220,38,38,0.35);transition:all .2s}
        .btn-danger:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(220,38,38,0.45)}

        .nav-btn{display:flex;flex-direction:column;align-items:center;gap:3px;border:none;background:transparent;cursor:pointer;padding:8px 14px;border-radius:16px;transition:all .2s;font-family:inherit;color:#64748b}
        .nav-btn.active{background:rgba(99,102,241,0.12);color:#6366f1}
        .nav-btn:hover:not(.active){background:rgba(255,255,255,0.5)}

        .sidebar-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:14px;cursor:pointer;font-size:13.5px;font-weight:500;transition:all .18s;color:#475569;border:none;background:transparent;font-family:inherit;width:100%;text-align:left}
        .sidebar-item:hover{background:rgba(255,255,255,0.6);color:#0f172a}
        .sidebar-item.active{background:rgba(99,102,241,0.12);color:#6366f1;font-weight:600}

        .fade-in{animation:fi .35s cubic-bezier(.4,0,.2,1)}
        .slide-up{animation:su .3s cubic-bezier(.4,0,.2,1)}
        @keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes su{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        .stagger > *{animation:fi .35s cubic-bezier(.4,0,.2,1) both}
        .stagger > *:nth-child(1){animation-delay:.05s}
        .stagger > *:nth-child(2){animation-delay:.1s}
        .stagger > *:nth-child(3){animation-delay:.15s}
        .stagger > *:nth-child(4){animation-delay:.2s}
        .stagger > *:nth-child(5){animation-delay:.25s}

        .tag{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:99px;font-size:11.5px;font-weight:700;letter-spacing:.15px}
        .tag-green{background:rgba(16,185,129,0.12);color:#065f46;border:1px solid rgba(16,185,129,0.2)}
        .tag-red{background:rgba(220,38,38,0.1);color:#991b1b;border:1px solid rgba(220,38,38,0.18)}
        .tag-amber{background:rgba(245,158,11,0.12);color:#78350f;border:1px solid rgba(245,158,11,0.2)}
        .tag-blue{background:rgba(99,102,241,0.1);color:#3730a3;border:1px solid rgba(99,102,241,0.18)}
        .tag-slate{background:rgba(100,116,139,0.1);color:#334155;border:1px solid rgba(100,116,139,0.15)}

        .drop-zone{border:2px dashed rgba(99,102,241,0.35);border-radius:14px;padding:24px;text-align:center;transition:all .2s;cursor:pointer;background:rgba(99,102,241,0.03)}
        .drop-zone.over{border-color:#6366f1;background:rgba(99,102,241,0.07)}
        .drop-zone:hover{border-color:rgba(99,102,241,0.55);background:rgba(99,102,241,0.05)}

        textarea,input[type=text]{background:rgba(255,255,255,0.55);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.8);border-radius:12px;padding:12px 14px;font-size:13px;font-family:inherit;outline:none;color:#0f172a;transition:all .2s;width:100%}
        textarea:focus,input[type=text]:focus{background:rgba(255,255,255,0.85);border-color:rgba(99,102,241,0.5);box-shadow:0 0 0 3px rgba(99,102,241,0.1)}

        .progress-track{height:6px;background:rgba(99,102,241,0.1);border-radius:99px;overflow:hidden}
        .progress-fill{height:100%;border-radius:99px;transition:width .8s cubic-bezier(.4,0,.2,1)}

        .asgn-row{padding:16px 18px;border-radius:18px;cursor:pointer;transition:all .2s}
        .asgn-row:hover{background:rgba(255,255,255,0.9);transform:translateX(3px)}

        .profile-panel{
          position:absolute;right:0;top:56px;
          background:rgba(255,255,255,0.75);
          backdrop-filter:blur(24px) saturate(200%);
          -webkit-backdrop-filter:blur(24px) saturate(200%);
          border:1px solid rgba(255,255,255,0.85);
          border-radius:22px;
          box-shadow:0 20px 60px rgba(99,102,241,0.15),0 1px 0 rgba(255,255,255,0.95) inset;
          padding:10px;z-index:999;min-width:240px;
          animation:fi .2s ease;
        }
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.45);z-index:800;display:flex;align-items:flex-end;justify-content:center;padding:0;animation:fi .2s ease;backdrop-filter:blur(6px)}
        .modal-sheet{
          background:rgba(248,250,252,0.92);
          backdrop-filter:blur(30px) saturate(200%);
          -webkit-backdrop-filter:blur(30px) saturate(200%);
          border:1px solid rgba(255,255,255,0.9);
          border-radius:28px 28px 0 0;
          padding:28px 24px 40px;
          width:100%;max-width:640px;
          box-shadow:0 -8px 60px rgba(99,102,241,0.15);
          animation:su .28s cubic-bezier(.4,0,.2,1);
        }
        .ring-chart{transform:rotate(-90deg)}
        .tt-cell{border-radius:10px;padding:7px 9px;font-size:11px;font-weight:700;min-height:40px;display:flex;align-items:center;gap:5px;line-height:1.2;transition:all .15s;cursor:default}
        .tt-cell:hover{transform:scale(1.04)}
        select{background:rgba(255,255,255,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.8);border-radius:10px;padding:8px 12px;font-size:13px;font-family:inherit;outline:none;color:#334155;cursor:pointer}
      `}</style>

      {/* ══════ LAYOUT SHELL ══════ */}
      <div style={{position:"relative",zIndex:1,display:"flex",minHeight:"100vh"}}>

        {/* ── DESKTOP SIDEBAR ── */}
        <aside style={{width:240,flexShrink:0,padding:"20px 12px",display:"flex",flexDirection:"column",gap:4,position:"sticky",top:0,height:"100vh",overflowY:"auto"}} className="glass" onClick={() => profileOpen && setProfileOpen(false)}>
          {/* Logo */}
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 6px 20px"}}>
            <div style={{width:36,height:36,borderRadius:12,background:"linear-gradient(135deg,#6366f1,#ec4899)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:16,boxShadow:"0 4px 12px rgba(99,102,241,0.4)"}}>J</div>
            <div>
              <div style={{fontSize:14,fontWeight:800,color:"#0f172a",letterSpacing:"-0.3px"}}>JECRC</div>
              <div style={{fontSize:10,color:"#94a3b8",letterSpacing:".4px",textTransform:"uppercase"}}>Student Portal</div>
            </div>
          </div>
          {/* Student card */}
          <div className="glass-card-sm" style={{padding:"12px 14px",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#ec4899)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:13,flexShrink:0}}>DK</div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:13,fontWeight:700,color:"#0f172a",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Dipesh Kumar</div>
                <div style={{fontSize:11,color:"#64748b"}}>24BCON2327 · Sem IV</div>
              </div>
            </div>
          </div>
          {/* Nav items */}
          <div style={{fontSize:10,color:"#94a3b8",fontWeight:700,letterSpacing:".7px",textTransform:"uppercase",padding:"8px 14px 4px"}}>Main</div>
          {[
            {id:"home",label:"Dashboard",icon:"⌂"},
            {id:"assignments",label:"Assignments",icon:"✏"},
            {id:"timetable",label:"Timetable",icon:"▦"},
            {id:"attendance",label:"Attendance",icon:"◎"},
          ].map(i => (
            <button key={i.id} className={`sidebar-item ${page===i.id?"active":""}`} onClick={() => setPage(i.id)}>
              <span style={{fontSize:16,width:20,textAlign:"center"}}>{i.icon}</span>{i.label}
            </button>
          ))}
          <div style={{fontSize:10,color:"#94a3b8",fontWeight:700,letterSpacing:".7px",textTransform:"uppercase",padding:"12px 14px 4px"}}>Finance & Info</div>
          {[
            {id:"fees",label:"Fees",icon:"💳"},
            {id:"notices",label:"Notices",icon:"🔔"},
            {id:"results",label:"Results",icon:"📊"},
            {id:"docs",label:"Documents",icon:"📄"},
          ].map(i => (
            <button key={i.id} className={`sidebar-item ${page===i.id?"active":""}`} onClick={() => setPage(i.id)}>
              <span style={{fontSize:16,width:20,textAlign:"center"}}>{i.icon}</span>{i.label}
            </button>
          ))}
          <div style={{flexGrow:1}} />
          <button className="sidebar-item" style={{color:"#ef4444"}}>
            <span style={{fontSize:16,width:20,textAlign:"center"}}>↩</span>Log Out
          </button>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{flex:1,overflowY:"auto",overflowX:"hidden",padding:"0 0 80px"}} onClick={() => profileOpen && setProfileOpen(false)}>
          {/* Top Bar */}
          <div className="glass" style={{position:"sticky",top:0,zIndex:50,padding:"0 24px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",borderRadius:0,borderLeft:"none",borderRight:"none",borderTop:"none"}}>
            <div style={{fontSize:20,fontWeight:700,color:"#0f172a",letterSpacing:"-0.4px"}}>
              {page==="home" && "Dashboard"}
              {page==="assignments" && "Assignments"}
              {page==="timetable" && "Timetable"}
              {page==="attendance" && "Attendance"}
              {page==="fees" && "Fee Details"}
              {page==="notices" && "Notices"}
              {page==="results" && "Results"}
              {page==="docs" && "Documents"}
              {page==="more" && "More"}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,position:"relative"}}>
              {/* Notif bell */}
              <div className="btn-glass" style={{padding:"7px 10px",position:"relative",cursor:"pointer"}} onClick={(e) => {e.stopPropagation(); setPage("notices")}}>
                <span style={{fontSize:15}}>🔔</span>
                <span style={{position:"absolute",top:5,right:5,width:8,height:8,background:"#ef4444",borderRadius:"50%",border:"1.5px solid rgba(248,250,252,0.9)"}} />
              </div>
              {/* Avatar */}
              <div onClick={e => { e.stopPropagation(); setProfileOpen(p => !p); }}
                style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#ec4899)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",boxShadow:"0 4px 12px rgba(99,102,241,0.35)",border:profileOpen?"2.5px solid #6366f1":"2.5px solid transparent",transition:"border .15s"}}>DK</div>
              {/* Profile Panel */}
              {profileOpen && (
                <div className="profile-panel" onClick={e => e.stopPropagation()}>
                  <div style={{padding:"10px 14px 14px",borderBottom:"1px solid rgba(99,102,241,0.08)",marginBottom:6}}>
                    <div style={{fontWeight:800,fontSize:15,color:"#0f172a"}}>Dipesh Kumar</div>
                    <div style={{fontSize:11.5,color:"#64748b",marginTop:2}}>24BCON2327 · B.Tech CSE AI/ML · Sem IV</div>
                    <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                      <span className="tag tag-blue">84.92% Attend.</span>
                      <span className="tag tag-green">CGPA 8.4</span>
                    </div>
                  </div>
                  {[
                    {icon:"⌂",label:"Dashboard",t:"home"},
                    {icon:"✏",label:"Assignments",t:"assignments"},
                    {icon:"▦",label:"Timetable",t:"timetable"},
                    {icon:"◎",label:"Attendance",t:"attendance"},
                    {icon:"💳",label:"Fee Details",t:"fees"},
                    {icon:"🔔",label:"Notices",t:"notices"},
                    {icon:"📊",label:"Results",t:"results"},
                    {icon:"📄",label:"Documents",t:"docs"},
                  ].map(item => (
                    <div key={item.label} onClick={() => {setPage(item.t); setProfileOpen(false)}}
                      style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderRadius:12,cursor:"pointer",fontSize:13.5,fontWeight:500,color:"#334155",transition:"background .15s"}}
                      onMouseOver={e=>e.currentTarget.style.background="rgba(99,102,241,0.07)"}
                      onMouseOut={e=>e.currentTarget.style.background="transparent"}>
                      <span style={{fontSize:15,width:20,textAlign:"center"}}>{item.icon}</span>{item.label}
                    </div>
                  ))}
                  <div style={{borderTop:"1px solid rgba(99,102,241,0.08)",marginTop:4,paddingTop:4}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderRadius:12,cursor:"pointer",fontSize:13.5,fontWeight:500,color:"#ef4444"}}>
                      <span style={{fontSize:15,width:20,textAlign:"center"}}>↩</span>Log Out
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ════ PAGE: HOME ════ */}
          {page === "home" && <HomePage setPage={setPage} pendingA={[...overdueA,...pendingA]} progPct={progPct} submittedA={submittedA} overdueA={overdueA} pendingCount={pendingA.length} setSubmitTarget={setSubmitTarget} nowSlotIdx={nowSlotIdx} todaySlots={todaySlots} currentCode={currentCode} nextCode={nextCode} />}

          {/* ════ PAGE: ASSIGNMENTS ════ */}
          {page === "assignments" && <AssignmentsPage allA={allA} pendingA={pendingA} overdueA={overdueA} submittedA={submittedA} progPct={progPct} assignTab={assignTab} setAssignTab={setAssignTab} setSubmitTarget={setSubmitTarget} assignSearch={assignSearch} setAssignSearch={setAssignSearch} assignFilter={assignFilter} setAssignFilter={setAssignFilter} />}

          {/* ════ PAGE: TIMETABLE ════ */}
          {page === "timetable" && <TimetablePage ttView={ttView} setTtView={setTtView} nowSlotIdx={nowSlotIdx} todaySlots={todaySlots} />}

          {/* ════ PAGE: ATTENDANCE ════ */}
          {page === "attendance" && <AttendancePage />}

          {/* ════ PAGE: FEES ════ */}
          {page === "fees" && <FeesPage />}

          {/* ════ PAGE: NOTICES ════ */}
          {page === "notices" && <NoticesPage expandNotice={expandNotice} setExpandNotice={setExpandNotice} />}

          {/* ════ STUB PAGES ════ */}
          {["results","docs","more"].includes(page) && <StubPage page={page} />}
        </main>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="glass" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,padding:"6px 0 12px",borderRadius:"20px 20px 0 0",borderBottom:"none",display:"flex",justifyContent:"space-around"}}>
        {NAV.map(item => (
          <button key={item.id} className={`nav-btn ${page===item.id?"active":""}`} onClick={() => {setPage(item.id); setProfileOpen(false)}}>
            <item.icon active={page===item.id} />
            <span style={{fontSize:10,fontWeight:600,letterSpacing:".2px"}}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* ── SUBMIT MODAL ── */}
      {submitTarget && (
        <div className="modal-overlay" onClick={() => {setSubmitTarget(null);setSubmitText("");setUploadedFile(null)}}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            {/* Handle bar */}
            <div style={{width:36,height:4,background:"rgba(99,102,241,0.25)",borderRadius:99,margin:"-10px auto 20px"}} />
            <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:20}}>
              <div style={{width:48,height:48,borderRadius:14,background:getCourse(submitTarget.code)?.bg||"#f1f5f9",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:getCourse(submitTarget.code)?.color||"#475569",flexShrink:0,border:`1px solid ${getCourse(submitTarget.code)?.color||"#e2e8f0"}30`}}>
                {getCourse(submitTarget.code)?.short||submitTarget.code.slice(0,3)}
              </div>
              <div>
                <div style={{fontWeight:800,fontSize:17,color:"#0f172a",lineHeight:1.3}}>{submitTarget.title}</div>
                <div style={{fontSize:12.5,color:"#64748b",marginTop:3}}>{submitTarget.subject} · Due {submitTarget.due}</div>
                <div style={{fontSize:12,color:"#64748b",marginTop:1}}>Faculty: {submitTarget.faculty}</div>
                {submitTarget.status==="overdue" && <span className="tag tag-red" style={{marginTop:6,display:"inline-flex"}}>⚠ Overdue</span>}
              </div>
            </div>
            {submitTarget.desc && <div style={{padding:"12px 14px",background:"rgba(99,102,241,0.06)",borderRadius:12,fontSize:13,color:"#475569",marginBottom:16,lineHeight:1.6}}>{submitTarget.desc}</div>}
            <div style={{fontSize:13,fontWeight:700,color:"#334155",marginBottom:8}}>Type your answer or paste a link</div>
            <textarea rows={4} placeholder="Write your answer, paste a GitHub/Drive link, or describe your submission…" value={submitText} onChange={e=>setSubmitText(e.target.value)} style={{marginBottom:14,resize:"none"}} />
            <div style={{fontSize:13,fontWeight:700,color:"#334155",marginBottom:8}}>Or upload a file</div>
            <div className={`drop-zone ${dragOver?"over":""}`}
              onDragOver={e=>{e.preventDefault();setDragOver(true)}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{e.preventDefault();setDragOver(false);setUploadedFile(e.dataTransfer.files[0])}}
              onClick={()=>fileRef.current?.click()}>
              <input type="file" ref={fileRef} style={{display:"none"}} onChange={e=>setUploadedFile(e.target.files[0])} />
              {uploadedFile ? (
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:22}}>📎</span>
                  <div>
                    <div style={{fontWeight:600,fontSize:13,color:"#0f172a"}}>{uploadedFile.name}</div>
                    <div style={{fontSize:11.5,color:"#64748b"}}>{(uploadedFile.size/1024).toFixed(1)} KB</div>
                  </div>
                  <button className="btn-glass" style={{marginLeft:"auto",padding:"5px 10px",fontSize:12,color:"#ef4444"}} onClick={e=>{e.stopPropagation();setUploadedFile(null)}}>Remove</button>
                </div>
              ) : (
                <>
                  <div style={{fontSize:28,marginBottom:8}}>☁</div>
                  <div style={{fontSize:13,fontWeight:600,color:"#475569"}}>Drop file here or click to browse</div>
                  <div style={{fontSize:11.5,color:"#94a3b8",marginTop:3}}>PDF, DOC, ZIP, images — up to 20 MB</div>
                </>
              )}
            </div>
            <div style={{display:"flex",gap:10,marginTop:18}}>
              <button className="btn-glass" style={{flex:1}} onClick={()=>{setSubmitTarget(null);setSubmitText("");setUploadedFile(null)}}>Cancel</button>
              <button className="btn-primary" style={{flex:2}} disabled={!submitText.trim()&&!uploadedFile} onClick={()=>submitAssignment(submitTarget.id)}>
                Submit Assignment →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════ */
function HomePage({setPage, pendingA, progPct, submittedA, overdueA, pendingCount, setSubmitTarget, nowSlotIdx, todaySlots, currentCode, nextCode}) {
  const h = new Date().getHours();
  const greet = h<12?"Good morning":h<17?"Good afternoon":"Good evening";
  const currCourse = currentCode ? COURSES.find(c=>c.code===currentCode) : null;
  const nextCourse = nextCode ? COURSES.find(c=>c.code===nextCode) : null;

  return (
    <div style={{padding:"24px"}} className="stagger">
      {/* Greeting Hero */}
      <div className="glass-card" style={{padding:"24px 28px",marginBottom:20,background:"linear-gradient(135deg,rgba(99,102,241,0.12) 0%,rgba(236,72,153,0.08) 100%)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-20,right:-20,width:140,height:140,background:"radial-gradient(circle,rgba(99,102,241,0.15),transparent 70%)",borderRadius:"50%"}} />
        <div style={{position:"absolute",bottom:-30,left:"30%",width:100,height:100,background:"radial-gradient(circle,rgba(236,72,153,0.12),transparent 70%)",borderRadius:"50%"}} />
        <div style={{fontSize:13,color:"#6366f1",fontWeight:600,marginBottom:4}}>{greet} 👋</div>
        <div style={{fontSize:26,fontWeight:800,color:"#0f172a",letterSpacing:"-0.5px",lineHeight:1.2}}>Dipesh Kumar</div>
        <div style={{fontSize:13,color:"#64748b",marginTop:3}}>B.Tech CSE AI/ML · Sem IV · {STUDENT.session}</div>
        <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
          {[
            {label:"84.92% Attendance",col:"#6366f1",bg:"rgba(99,102,241,0.1)",click:"attendance"},
            {label:"CGPA 8.4",col:"#10b981",bg:"rgba(16,185,129,0.1)",click:null},
            {label:`${pendingCount + overdueA.length} Tasks Due`,col:overdueA.length>0?"#ef4444":"#f59e0b",bg:overdueA.length>0?"rgba(239,68,68,0.1)":"rgba(245,158,11,0.1)",click:"assignments"},
          ].map(b => (
            <div key={b.label} onClick={()=>b.click&&setPage(b.click)}
              style={{padding:"6px 14px",borderRadius:99,background:b.bg,color:b.col,fontSize:12.5,fontWeight:700,cursor:b.click?"pointer":"default",border:`1px solid ${b.col}25`,transition:"transform .15s"}}
              onMouseOver={e=>b.click&&(e.currentTarget.style.transform="scale(1.04)")}
              onMouseOut={e=>b.click&&(e.currentTarget.style.transform="none")}>
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Current + Next class */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        <div className="glass-card" style={{padding:"18px",cursor:"pointer"}} onClick={()=>setPage("timetable")}>
          <div style={{fontSize:11,fontWeight:700,color:"#64748b",letterSpacing:".5px",textTransform:"uppercase",marginBottom:8}}>Now Playing</div>
          {currCourse ? (
            <>
              <div style={{width:10,height:10,borderRadius:"50%",background:currCourse.color,boxShadow:`0 0 8px ${currCourse.color}`,marginBottom:8,animation:"pulse 2s infinite"}} />
              <div style={{fontSize:14,fontWeight:700,color:"#0f172a",lineHeight:1.3}}>{currCourse.name}</div>
              <div style={{fontSize:11.5,color:"#64748b",marginTop:3}}>{currCourse.faculty}</div>
              <span className="tag tag-green" style={{marginTop:8,display:"inline-flex"}}>● Live Now</span>
            </>
          ) : <div style={{fontSize:13,color:"#94a3b8",fontStyle:"italic"}}>No class right now</div>}
        </div>
        <div className="glass-card" style={{padding:"18px",cursor:"pointer"}} onClick={()=>setPage("timetable")}>
          <div style={{fontSize:11,fontWeight:700,color:"#64748b",letterSpacing:".5px",textTransform:"uppercase",marginBottom:8}}>Up Next</div>
          {nextCourse ? (
            <>
              <div style={{width:10,height:10,borderRadius:"50%",background:nextCourse.color,marginBottom:8,opacity:.6}} />
              <div style={{fontSize:14,fontWeight:700,color:"#0f172a",lineHeight:1.3}}>{nextCourse.name}</div>
              <div style={{fontSize:11.5,color:"#64748b",marginTop:3}}>{nextCourse.faculty}</div>
              <span className="tag tag-blue" style={{marginTop:8,display:"inline-flex"}}>⏰ Coming up</span>
            </>
          ) : <div style={{fontSize:13,color:"#94a3b8",fontStyle:"italic"}}>No more classes today</div>}
        </div>
      </div>

      {/* Stats row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:14}}>
        {[
          {val:"84.92%",label:"Attendance",col:"#6366f1",click:"attendance"},
          {val:`${pendingA.length}`,label:"Due Tasks",col:pendingA.length>2?"#ef4444":"#f59e0b",click:"assignments"},
          {val:"8.4",label:"CGPA",col:"#10b981",click:null},
          {val:"179",label:"Total Classes",col:"#06b6d4",click:"attendance"},
        ].map(s => (
          <div key={s.label} className="glass-card-sm" style={{padding:"14px 12px",textAlign:"center",cursor:s.click?"pointer":"default"}} onClick={()=>s.click&&setPage(s.click)}>
            <div style={{fontSize:20,fontWeight:800,color:s.col}}>{s.val}</div>
            <div style={{fontSize:11,color:"#64748b",marginTop:3,fontWeight:500}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Assignment Progress */}
      <div className="glass-card" style={{padding:"20px 22px",marginBottom:14,cursor:"pointer"}} onClick={()=>setPage("assignments")}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:15,color:"#0f172a"}}>Assignment Progress</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20,fontWeight:800,color:progPct>=60?"#10b981":"#f59e0b"}}>{progPct}%</span>
            <span style={{fontSize:12,color:"#6366f1",fontWeight:600}}>View all →</span>
          </div>
        </div>
        <div className="progress-track" style={{marginBottom:12}}>
          <div className="progress-fill" style={{width:`${progPct}%`,background:"linear-gradient(90deg,#6366f1,#8b5cf6)"}} />
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <span className="tag tag-green">✓ {submittedA.length} Submitted</span>
          {overdueA.length>0 && <span className="tag tag-red">⚠ {overdueA.length} Overdue</span>}
          <span className="tag tag-amber">⏳ {pendingA.length} Pending</span>
        </div>
        {/* Quick pending list */}
        {pendingA.length > 0 && (
          <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:8}}>
            {pendingA.slice(0,3).map(a => {
              const cc = getCourse(a.code);
              return (
                <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,background:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.7)"}}>
                  <div style={{width:32,height:32,borderRadius:9,background:cc?.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:cc?.color,flexShrink:0}}>{cc?.short}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#0f172a",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{a.title}</div>
                    <div style={{fontSize:11,color:"#64748b"}}>Due {a.due}</div>
                  </div>
                  <button className="btn-primary" style={{padding:"6px 14px",fontSize:12}} onClick={e=>{e.stopPropagation();setSubmitTarget(a)}}>Submit</button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Today Schedule */}
      <div className="glass-card" style={{padding:"20px 22px",marginBottom:14,cursor:"pointer"}} onClick={()=>setPage("timetable")}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:15,color:"#0f172a"}}>Today — Wednesday</div>
          <span style={{fontSize:12,color:"#6366f1",fontWeight:600}}>Full week →</span>
        </div>
        {todaySlots.map((code,i) => {
          const cc = code ? getCourse(code) : null;
          const isNow = i === nowSlotIdx;
          return (
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{fontSize:11,color:"#94a3b8",width:44,textAlign:"right",fontWeight:500,flexShrink:0}}>{SLOTS[i]}</div>
              {code ? (
                <div style={{flex:1,padding:"9px 14px",borderRadius:12,background:isNow?cc.color:cc.bg,border:isNow?`1.5px solid ${cc.color}`:`1px solid ${cc.color}20`,display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:isNow?"#fff":cc.color,flexShrink:0}} />
                  <span style={{fontSize:13,fontWeight:600,color:isNow?"#fff":cc.color,flex:1}}>{cc?.name}</span>
                  {isNow && <span style={{fontSize:10,fontWeight:700,background:"rgba(255,255,255,0.25)",color:"#fff",padding:"2px 8px",borderRadius:6}}>NOW</span>}
                </div>
              ) : (
                <div style={{flex:1,padding:"9px 14px",borderRadius:12,background:"rgba(255,255,255,0.3)",color:"#cbd5e1",fontSize:12}}>Free period</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Notices + Fee row */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div className="glass-card" style={{padding:"20px 20px",cursor:"pointer"}} onClick={()=>setPage("notices")}>
          <div style={{fontWeight:700,fontSize:15,color:"#0f172a",marginBottom:14}}>🔔 Notices</div>
          {NOTICES.slice(0,3).map(n => (
            <div key={n.id} style={{display:"flex",gap:10,alignItems:"flex-start",paddingBottom:10,marginBottom:10,borderBottom:"1px solid rgba(99,102,241,0.06)"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:n.urgent?"#ef4444":"#94a3b8",marginTop:5,flexShrink:0}} />
              <div style={{fontSize:12.5,fontWeight:500,color:"#334155",lineHeight:1.4,flex:1}}>{n.title}</div>
            </div>
          ))}
        </div>
        <div className="glass-card" style={{padding:"20px 20px",cursor:"pointer"}} onClick={()=>setPage("fees")}>
          <div style={{fontWeight:700,fontSize:15,color:"#0f172a",marginBottom:14}}>💳 Fees</div>
          {FEES.map(f => (
            <div key={f.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:8,marginBottom:8,borderBottom:"1px solid rgba(99,102,241,0.06)"}}>
              <div style={{fontSize:12.5,fontWeight:500,color:"#334155"}}>{f.label.split("–")[0]}</div>
              <span className={`tag ${f.status==="paid"?"tag-green":"tag-red"}`}>{f.status==="paid"?"✓ Paid":"Due"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ASSIGNMENTS PAGE
══════════════════════════════════════════════════════ */
function AssignmentsPage({allA, pendingA, overdueA, submittedA, progPct, assignTab, setAssignTab, setSubmitTarget, assignSearch, setAssignSearch}) {
  const displayMap = {pending:[...overdueA,...pendingA], submitted:submittedA, overdue:overdueA};
  const base = displayMap[assignTab] || allA;
  const filtered = base.filter(a => a.title.toLowerCase().includes(assignSearch.toLowerCase()) || a.subject.toLowerCase().includes(assignSearch.toLowerCase()));

  return (
    <div style={{padding:"24px"}} className="stagger">
      {/* Header */}
      <div className="glass-card" style={{padding:"20px 22px",marginBottom:20,background:"linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.08))"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div><div style={{fontSize:13,fontWeight:600,color:"#6366f1"}}>Session {STUDENT.session}</div>
          <div style={{fontSize:14,color:"#64748b",marginTop:1}}>Track your academic submissions</div></div>
          <div style={{fontSize:26,fontWeight:800,color:"#0f172a"}}>{progPct}%</div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{width:`${progPct}%`,background:"linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)"}} />
        </div>
        <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
          <span className="tag tag-green">✓ {submittedA.length} submitted</span>
          {overdueA.length>0 && <span className="tag tag-red">⚠ {overdueA.length} overdue</span>}
          <span className="tag tag-amber">⏳ {pendingA.length} pending</span>
          <span className="tag tag-slate">📁 {allA.length} total</span>
        </div>
      </div>

      {/* Search */}
      <div style={{position:"relative",marginBottom:16}}>
        <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",fontSize:14}}>🔍</span>
        <input type="text" placeholder="Search assignments…" value={assignSearch} onChange={e=>setAssignSearch(e.target.value)} style={{paddingLeft:36}} />
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[
          {id:"pending",label:`Pending (${pendingA.length+overdueA.length})`},
          {id:"submitted",label:`Submitted (${submittedA.length})`},
          {id:"overdue",label:`Overdue (${overdueA.length})`},
        ].map(t => (
          <button key={t.id} onClick={()=>setAssignTab(t.id)}
            style={{padding:"8px 16px",borderRadius:12,fontWeight:600,fontSize:13,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .18s",
              background:assignTab===t.id?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(255,255,255,0.5)",
              color:assignTab===t.id?"#fff":"#64748b",
              boxShadow:assignTab===t.id?"0 4px 12px rgba(99,102,241,0.35)":"none"}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Assignment list */}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {filtered.length === 0 && <div style={{textAlign:"center",padding:"48px",color:"#94a3b8",fontSize:14}}>No assignments here 🎉</div>}
        {filtered.map(a => {
          const cc = getCourse(a.code);
          const isDone = a.status === "submitted";
          const isOver = a.status === "overdue";
          return (
            <div key={a.id} className="glass-card" style={{padding:"18px 20px",borderLeft:`3px solid ${isOver?"#ef4444":isDone?"#10b981":cc?.color||"#6366f1"}`}}>
              <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:44,height:44,borderRadius:12,background:cc?.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:cc?.color,flexShrink:0,border:`1px solid ${cc?.color||"#6366f1"}25`}}>
                  {cc?.short||a.code.slice(0,4)}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:15,color:"#0f172a",marginBottom:3}}>{a.title}</div>
                  <div style={{fontSize:12.5,color:"#64748b"}}>{a.subject}</div>
                  <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>Faculty: {a.faculty}</div>
                  {a.desc && <div style={{fontSize:12.5,color:"#475569",marginTop:8,padding:"8px 12px",background:"rgba(99,102,241,0.06)",borderRadius:10,lineHeight:1.5}}>{a.desc}</div>}
                  <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap",alignItems:"center"}}>
                    <span className={`tag ${isOver?"tag-red":isDone?"tag-green":"tag-amber"}`}>
                      {isOver?"⚠ Overdue":isDone?"✓ Submitted":"⏳ Pending"}
                    </span>
                    <span className="tag tag-slate">📅 Due {a.due}</span>
                    {a.marks && <span className="tag tag-blue">🎯 {a.marks}</span>}
                    {a.submittedOn && <span className="tag tag-slate">🕐 {a.submittedOn}</span>}
                  </div>
                </div>
                {!isDone && (
                  <button className={isOver?"btn-danger":"btn-primary"} style={{padding:"8px 16px",fontSize:13,flexShrink:0}} onClick={()=>setSubmitTarget(a)}>
                    Submit
                  </button>
                )}
                {isDone && (
                  <div style={{textAlign:"center",flexShrink:0}}>
                    <div style={{fontSize:22}}>✅</div>
                    {a.marks && <div style={{fontSize:12,fontWeight:700,color:"#10b981",marginTop:2}}>{a.marks}</div>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TIMETABLE PAGE
══════════════════════════════════════════════════════ */
function TimetablePage({ttView, setTtView, nowSlotIdx, todaySlots}) {
  const [selectedDay, setSelectedDay] = useState(TODAY);
  const daySlots = TIMETABLE[selectedDay] || [];

  return (
    <div style={{padding:"24px"}} className="stagger">
      {/* Legend */}
      <div className="glass-card" style={{padding:"16px 20px",marginBottom:20,display:"flex",flexWrap:"wrap",gap:8}}>
        {COURSES.filter(c=>c.classes>0||c.code==="DMA011C").map(c => (
          <span key={c.code} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:99,background:c.bg,border:`1px solid ${c.color}30`,fontSize:11.5,fontWeight:700,color:c.color}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:c.color,display:"inline-block"}} />{c.short}
          </span>
        ))}
      </div>

      {/* View toggle */}
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {["today","week"].map(v => (
          <button key={v} onClick={()=>setTtView(v)}
            style={{padding:"8px 20px",borderRadius:12,fontWeight:600,fontSize:13,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .18s",
              background:ttView===v?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(255,255,255,0.5)",
              color:ttView===v?"#fff":"#64748b",boxShadow:ttView===v?"0 4px 12px rgba(99,102,241,0.35)":"none"}}>
            {v==="today"?"Today":"Weekly View"}
          </button>
        ))}
      </div>

      {ttView === "today" && (
        <>
          {/* Day selector */}
          <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
            {DAYS.map(d => (
              <button key={d} onClick={()=>setSelectedDay(d)}
                style={{padding:"8px 14px",borderRadius:12,fontWeight:600,fontSize:13,cursor:"pointer",border:"none",fontFamily:"inherit",transition:"all .18s",flexShrink:0,
                  background:selectedDay===d?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(255,255,255,0.5)",
                  color:selectedDay===d?"#fff":"#64748b",
                  boxShadow:selectedDay===d?"0 4px 12px rgba(99,102,241,0.35)":"none"}}>
                {d.slice(0,3)} {d===TODAY && selectedDay!==d && "•"}
              </button>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {daySlots.map((code,i) => {
              const cc = code ? getCourse(code) : null;
              const isNow = selectedDay === TODAY && i === nowSlotIdx;
              return (
                <div key={i} className="glass-card" style={{display:"flex",gap:14,alignItems:"stretch",padding:"0",overflow:"hidden",border:isNow?`2px solid ${cc?.color||"#6366f1"}`:"1px solid rgba(255,255,255,0.75)"}}>
                  <div style={{width:70,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"14px 8px",background:"rgba(255,255,255,0.4)"}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#334155"}}>{SLOTS[i].split(" ")[0]}</div>
                    <div style={{fontSize:10,color:"#94a3b8"}}>{SLOTS[i].split(" ")[1]}</div>
                  </div>
                  {code && cc ? (
                    <div style={{flex:1,padding:"14px 18px",borderLeft:`3px solid ${cc.color}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:14,color:"#0f172a"}}>{cc.name}</div>
                        <div style={{fontSize:12,color:"#64748b",marginTop:3}}>{cc.code} · {cc.type}</div>
                        {cc.faculty !== "—" && <div style={{fontSize:12,color:"#94a3b8",marginTop:1}}>👤 {cc.faculty}</div>}
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                        <span style={{padding:"4px 10px",borderRadius:99,background:cc.bg,color:cc.color,fontSize:11,fontWeight:700}}>{cc.short}</span>
                        {isNow && <span className="tag tag-green" style={{fontSize:10}}>● NOW</span>}
                      </div>
                    </div>
                  ) : (
                    <div style={{flex:1,padding:"14px 18px",display:"flex",alignItems:"center"}}>
                      <span style={{fontSize:13,color:"#cbd5e1",fontStyle:"italic"}}>Free period</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {ttView === "week" && (
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"4px",minWidth:620}}>
            <thead>
              <tr>
                <th style={{fontSize:11,color:"#94a3b8",textAlign:"right",paddingRight:10,fontWeight:500,width:56}}>Time</th>
                {DAYS.map(d => (
                  <th key={d} style={{padding:"8px 4px",fontSize:12,fontWeight:700,color:d===TODAY?"#6366f1":"#475569",textAlign:"center"}}>
                    {d===TODAY ? <span style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",borderRadius:8,padding:"3px 10px",fontSize:11,display:"inline-block"}}>{d.slice(0,3)}</span> : d.slice(0,3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((slot,i) => (
                <tr key={i}>
                  <td style={{fontSize:11,color:"#cbd5e1",textAlign:"right",paddingRight:10,fontWeight:500,whiteSpace:"nowrap"}}>{slot}</td>
                  {DAYS.map(day => {
                    const code = TIMETABLE[day]?.[i];
                    const cc = code ? getCourse(code) : null;
                    const isNow = day===TODAY && i===nowSlotIdx;
                    return (
                      <td key={day} style={{padding:"2px"}}>
                        {code && cc ? (
                          <div className="tt-cell" style={{background:isNow?cc.color:cc.bg,color:isNow?"#fff":cc.color,border:`1.5px solid ${isNow?cc.color:cc.color+"30"}`}}>
                            <div style={{width:6,height:6,borderRadius:"50%",background:isNow?"rgba(255,255,255,0.7)":cc.color,flexShrink:0}} />
                            <span style={{lineHeight:1.2}}>{cc.short}</span>
                          </div>
                        ) : (
                          <div style={{height:40,borderRadius:10,background:"rgba(255,255,255,0.25)"}} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ATTENDANCE PAGE
══════════════════════════════════════════════════════ */
function AttendancePage() {
  const pct = STUDENT.attendance;
  const r = 38, circ = 2 * Math.PI * r;
  const fill = circ - (pct / 100) * circ;
  const col = pct>=85?"#10b981":pct>=75?"#f59e0b":"#ef4444";

  return (
    <div style={{padding:"24px"}} className="stagger">
      {/* Overall card */}
      <div className="glass-card" style={{padding:"24px",marginBottom:20,display:"flex",gap:24,alignItems:"center",background:"linear-gradient(135deg,rgba(99,102,241,0.08),rgba(16,185,129,0.06))"}}>
        <div style={{flexShrink:0}}>
          <svg width={92} height={92} className="ring-chart">
            <circle cx={46} cy={46} r={r} fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth={8} />
            <circle cx={46} cy={46} r={r} fill="none" stroke={col} strokeWidth={8} strokeDasharray={circ} strokeDashoffset={fill} strokeLinecap="round" style={{transition:"stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)"}} />
          </svg>
        </div>
        <div>
          <div style={{fontSize:32,fontWeight:800,color:"#0f172a",letterSpacing:"-1px"}}>{pct}%</div>
          <div style={{fontSize:14,color:"#64748b",marginTop:2}}>Overall Attendance</div>
          <div style={{fontSize:13,color:"#94a3b8",marginTop:4}}>{STUDENT.present} present · {STUDENT.absent} absent · {STUDENT.totalClasses} total</div>
          {pct < 85 && (
            <div style={{marginTop:8,padding:"6px 12px",borderRadius:10,background:"rgba(245,158,11,0.1)",color:"#92400e",fontSize:12.5,fontWeight:600,border:"1px solid rgba(245,158,11,0.2)"}}>
              ⚠ Need ~{Math.max(0,Math.ceil((0.85*STUDENT.totalClasses-STUDENT.present)/0.15))} more classes to reach 85%
            </div>
          )}
        </div>
      </div>

      {/* Subject-wise */}
      <div style={{fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:".7px",textTransform:"uppercase",marginBottom:12}}>Subject-wise Breakdown</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {COURSES.filter(c=>c.classes>0).map(c => {
          const ok = c.pct>=85, warn = c.pct>=75;
          const barCol = ok?"#10b981":warn?"#f59e0b":"#ef4444";
          return (
            <div key={c.code} className="glass-card" style={{padding:"16px 20px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                    <span style={{padding:"2px 8px",borderRadius:6,background:c.bg,color:c.color,fontSize:11,fontWeight:800}}>{c.code}</span>
                    <span style={{fontSize:11.5,color:"#94a3b8"}}>{c.type}</span>
                  </div>
                  <div style={{fontSize:14,fontWeight:700,color:"#0f172a"}}>{c.name}</div>
                  {c.faculty!=="—" && <div style={{fontSize:12,color:"#64748b",marginTop:2}}>{c.faculty}</div>}
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:20,fontWeight:800,color:barCol}}>{c.pct>0?c.pct.toFixed(1)+"%":"N/A"}</div>
                  <div style={{fontSize:11,color:"#94a3b8",marginTop:1}}>{c.present}/{c.classes}</div>
                </div>
              </div>
              {c.pct > 0 && (
                <div className="progress-track">
                  <div className="progress-fill" style={{width:`${Math.min(c.pct,100)}%`,background:`linear-gradient(90deg,${barCol}99,${barCol})`}} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FEES PAGE
══════════════════════════════════════════════════════ */
function FeesPage() {
  const totalDue = FEES.filter(f=>f.status==="due").reduce((s,f)=>s+parseInt(f.amount.replace(/[₹,]/g,"")),0);
  return (
    <div style={{padding:"24px"}} className="stagger">
      {totalDue > 0 && (
        <div className="glass-card" style={{padding:"20px 22px",marginBottom:20,background:"linear-gradient(135deg,rgba(239,68,68,0.1),rgba(245,158,11,0.08))",border:"1px solid rgba(239,68,68,0.2)"}}>
          <div style={{fontSize:13,fontWeight:600,color:"#dc2626",marginBottom:4}}>⚠ Payment Due</div>
          <div style={{fontSize:28,fontWeight:800,color:"#0f172a"}}>₹{totalDue.toLocaleString()}</div>
          <div style={{fontSize:13,color:"#64748b",marginTop:2}}>Due by May 15, 2026 · Late fee ₹500 after deadline</div>
          <button className="btn-danger" style={{marginTop:14}}>Pay Online →</button>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {FEES.map(f => (
          <div key={f.label} className="glass-card" style={{padding:"18px 20px",display:"flex",alignItems:"center",gap:14,borderLeft:`3px solid ${f.status==="paid"?"#10b981":"#ef4444"}`}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:15,color:"#0f172a"}}>{f.label}</div>
              <div style={{fontSize:12.5,color:"#64748b",marginTop:2}}>{f.date}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:20,fontWeight:800,color:f.status==="paid"?"#0f172a":"#dc2626"}}>{f.amount}</div>
              <span className={`tag ${f.status==="paid"?"tag-green":"tag-red"}`} style={{marginTop:4,display:"inline-flex"}}>{f.status==="paid"?"✓ Paid":"⚠ Due"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   NOTICES PAGE
══════════════════════════════════════════════════════ */
function NoticesPage({expandNotice, setExpandNotice}) {
  return (
    <div style={{padding:"24px"}} className="stagger">
      <div className="glass-card" style={{padding:"16px 20px",marginBottom:20,background:"linear-gradient(135deg,rgba(99,102,241,0.08),rgba(236,72,153,0.05))"}}>
        <div style={{fontSize:14,fontWeight:600,color:"#0f172a"}}>{NOTICES.length} active notices</div>
        <div style={{fontSize:12.5,color:"#64748b",marginTop:2}}>{NOTICES.filter(n=>n.urgent).length} urgent</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {NOTICES.map(n => (
          <div key={n.id} className="glass-card" style={{padding:"18px 20px",cursor:"pointer",borderLeft:`3px solid ${n.urgent?"#ef4444":"#6366f1"}`}} onClick={()=>setExpandNotice(expandNotice===n.id?null:n.id)}>
            <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:42,height:42,borderRadius:12,background:n.urgent?"rgba(239,68,68,0.1)":"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{n.urgent?"🚨":"📢"}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14.5,color:"#0f172a",lineHeight:1.3}}>{n.title}</div>
                <div style={{fontSize:12,color:"#94a3b8",marginTop:3}}>{n.date}</div>
              </div>
              {n.urgent && <span className="tag tag-red">Urgent</span>}
              <span style={{fontSize:12,color:"#94a3b8",alignSelf:"center"}}>{expandNotice===n.id?"▲":"▼"}</span>
            </div>
            {expandNotice===n.id && (
              <div style={{marginTop:14,padding:"14px 16px",background:"rgba(255,255,255,0.5)",borderRadius:12,fontSize:13.5,color:"#334155",lineHeight:1.7,borderTop:"1px solid rgba(99,102,241,0.08)"}}>
                {n.body}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   STUB PAGE
══════════════════════════════════════════════════════ */
function StubPage({page}) {
  const map = {results:{icon:"📊",title:"Results",msg:"Results will be available after mid-semester exams"},docs:{icon:"📄",title:"Documents",msg:"Upload and view your academic documents here"},more:{icon:"⋯",title:"More",msg:"Additional features coming soon"}};
  const p = map[page]||{icon:"📌",title:page,msg:"Coming soon"};
  return (
    <div style={{padding:"24px"}} className="fade-in">
      <div className="glass-card" style={{padding:"60px 24px",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:16}}>{p.icon}</div>
        <div style={{fontWeight:800,fontSize:20,color:"#0f172a",marginBottom:8}}>{p.title}</div>
        <div style={{fontSize:14,color:"#64748b"}}>{p.msg}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ICON COMPONENTS
══════════════════════════════════════════════════════ */
function HomeIcon({active}) { return <span style={{fontSize:18,opacity:active?1:.7}}>⌂</span>; }
function TaskIcon({active}) { return <span style={{fontSize:18,opacity:active?1:.7}}>✏</span>; }
function CalIcon({active}) { return <span style={{fontSize:18,opacity:active?1:.7}}>▦</span>; }
function AttIcon({active}) { return <span style={{fontSize:18,opacity:active?1:.7}}>◎</span>; }
function MoreIcon({active}) { return <span style={{fontSize:18,opacity:active?1:.7}}>⋯</span>; }