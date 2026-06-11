import React, { useState } from "react";

const C = {
  green: "#495E57",
  yellow: "#F4CE14",
  salmon: "#EE9972",
  offwhite: "#EDEFEE",
  charcoal: "#333333",
  white: "#FFFFFF",
  lightGreen: "#D4EDDA",
  errorRed: "#C0392B",
  errorBg: "#FDEDEC",
};

const TIMES = [
  "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM",
];

const OCCASIONS = ["Birthday","Anniversary","Business Meal","Date Night","None"];

/* ---------- helpers ---------- */
function getToday() {
  return new Date().toISOString().split("T")[0];
}
function fmt(date) {
  if (!date) return "";
  const d = new Date(date + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
}
function validate(fields) {
  const e = {};
  if (!fields.date) e.date = "Please select a date.";
  if (!fields.time) e.time = "Please select a time.";
  if (fields.diners < 1 || fields.diners > 10) e.diners = "Please choose 1–10 diners.";
  return e;
}
function validateGuest(fields) {
  const e = {};
  if (!fields.firstName.trim()) e.firstName = "First name is required.";
  if (!fields.lastName.trim()) e.lastName = "Last name is required.";
  if (!fields.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email.";
  if (!fields.phone.trim()) e.phone = "Phone number is required.";
  return e;
}

/* ============================================================
   SHARED UI primitives
   ============================================================ */
function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display:"block", fontWeight:600, fontSize:"0.85rem",
        color: C.charcoal, marginBottom:"0.4rem", letterSpacing:"0.03em" }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ margin:"0.3rem 0 0", fontSize:"0.8rem", color: C.errorRed }}>{error}</p>
      )}
    </div>
  );
}

const inputStyle = (hasError) => ({
  width:"100%", boxSizing:"border-box",
  padding:"0.75rem 1rem", borderRadius:8,
  border: `1.5px solid ${hasError ? C.errorRed : "#CCC"}`,
  fontSize:"0.95rem", color: C.charcoal, background: C.white,
  outline:"none", fontFamily:"inherit",
});

/* ============================================================
   STEP 1 — Booking details
   ============================================================ */
function StepBooking({ booking, setBooking, onNext }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const set = (k, v) => {
    setBooking(b => ({ ...b, [k]: v }));
    if (touched[k]) {
      const e = validate({ ...booking, [k]: v });
      setErrors(prev => ({ ...prev, [k]: e[k] }));
    }
  };

  const blur = (k) => {
    setTouched(t => ({ ...t, [k]: true }));
    const e = validate(booking);
    setErrors(prev => ({ ...prev, [k]: e[k] }));
  };

  const submit = () => {
    setTouched({ date:true, time:true, diners:true });
    const e = validate(booking);
    setErrors(e);
    if (!Object.values(e).some(Boolean)) onNext();
  };

  return (
    <div>
      <h2 style={{ fontFamily:"'Markazi Text',serif", fontSize:"2rem", color: C.green,
        margin:"0 0 0.25rem", fontWeight:500 }}>Reserve a Table</h2>
      <p style={{ color:"#777", fontSize:"0.9rem", margin:"0 0 2rem" }}>
        Book your spot at Little Lemon — Chicago's favourite Mediterranean bistro.
      </p>

      <Field label="Date" error={touched.date && errors.date}>
        <input type="date" min={getToday()} value={booking.date}
          onChange={e => set("date", e.target.value)}
          onBlur={() => blur("date")}
          style={inputStyle(touched.date && errors.date)} />
      </Field>

      <Field label="Time" error={touched.time && errors.time}>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
          {TIMES.map(t => (
            <button key={t} onClick={() => { set("time", t); blur("time"); }}
              style={{
                padding:"0.5rem 0.85rem", borderRadius:6, fontSize:"0.85rem",
                fontWeight:600, cursor:"pointer", fontFamily:"inherit",
                border: booking.time === t ? `2px solid ${C.green}` : "1.5px solid #CCC",
                background: booking.time === t ? C.green : C.white,
                color: booking.time === t ? C.white : C.charcoal,
                transition:"all 0.15s",
              }}>
              {t}
            </button>
          ))}
        </div>
        {touched.time && errors.time && (
          <p style={{ margin:"0.3rem 0 0", fontSize:"0.8rem", color: C.errorRed }}>{errors.time}</p>
        )}
      </Field>

      <Field label="Number of diners" error={touched.diners && errors.diners}>
        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          <button onClick={() => set("diners", Math.max(1, booking.diners - 1))}
            style={{ width:40, height:40, borderRadius:"50%", border:`1.5px solid ${C.green}`,
              background: C.white, color: C.green, fontSize:"1.5rem", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>
            −
          </button>
          <span style={{ fontSize:"1.5rem", fontWeight:700, minWidth:30, textAlign:"center",
            color: C.charcoal }}>{booking.diners}</span>
          <button onClick={() => set("diners", Math.min(10, booking.diners + 1))}
            style={{ width:40, height:40, borderRadius:"50%", border:`1.5px solid ${C.green}`,
              background: C.white, color: C.green, fontSize:"1.5rem", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>
            +
          </button>
          <span style={{ fontSize:"0.9rem", color:"#888" }}>guests</span>
        </div>
      </Field>

      <Field label="Occasion (optional)">
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
          {OCCASIONS.map(o => (
            <button key={o} onClick={() => set("occasion", booking.occasion === o ? "" : o)}
              style={{
                padding:"0.45rem 1rem", borderRadius:20, fontSize:"0.85rem",
                fontWeight:600, cursor:"pointer", fontFamily:"inherit",
                border: booking.occasion === o ? `2px solid ${C.salmon}` : "1.5px solid #CCC",
                background: booking.occasion === o ? C.salmon : C.white,
                color: booking.occasion === o ? C.white : C.charcoal,
                transition:"all 0.15s",
              }}>
              {o}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Special requests (optional)">
        <textarea rows={3} value={booking.notes}
          onChange={e => set("notes", e.target.value)}
          placeholder="e.g. high chair needed, window table preferred…"
          style={{ ...inputStyle(false), resize:"vertical", minHeight:80, fontFamily:"inherit" }} />
      </Field>

      <button onClick={submit}
        style={{ width:"100%", padding:"1rem", borderRadius:8, background: C.yellow,
          color: C.charcoal, fontWeight:800, fontSize:"1rem", border:"none",
          cursor:"pointer", fontFamily:"inherit", letterSpacing:"0.02em",
          transition:"background 0.2s" }}
        onMouseEnter={e => e.target.style.background = "#ddb800"}
        onMouseLeave={e => e.target.style.background = C.yellow}>
        Continue to your details →
      </button>
    </div>
  );
}

/* ============================================================
   STEP 2 — Guest details
   ============================================================ */
function StepGuest({ booking, guest, setGuest, onBack, onNext }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const set = (k, v) => {
    setGuest(g => ({ ...g, [k]: v }));
    if (touched[k]) {
      const e = validateGuest({ ...guest, [k]: v });
      setErrors(prev => ({ ...prev, [k]: e[k] }));
    }
  };

  const blur = (k) => {
    setTouched(t => ({ ...t, [k]: true }));
    const e = validateGuest(guest);
    setErrors(prev => ({ ...prev, [k]: e[k] }));
  };

  const submit = () => {
    const allTouched = Object.fromEntries(Object.keys(guest).map(k => [k, true]));
    setTouched(allTouched);
    const e = validateGuest(guest);
    setErrors(e);
    if (!Object.values(e).some(Boolean)) onNext();
  };

  return (
    <div>
      {/* Summary pill */}
      <div style={{ background: C.green, color: C.white, borderRadius:8,
        padding:"0.75rem 1.25rem", marginBottom:"1.5rem", fontSize:"0.9rem" }}>
        📅 <strong>{fmt(booking.date)}</strong> &nbsp;·&nbsp;
        🕐 <strong>{booking.time}</strong> &nbsp;·&nbsp;
        👥 <strong>{booking.diners} {booking.diners === 1 ? "guest" : "guests"}</strong>
        {booking.occasion ? ` · ${booking.occasion}` : ""}
      </div>

      <h2 style={{ fontFamily:"'Markazi Text',serif", fontSize:"2rem", color: C.green,
        margin:"0 0 0.25rem", fontWeight:500 }}>Your details</h2>
      <p style={{ color:"#777", fontSize:"0.9rem", margin:"0 0 2rem" }}>
        We'll send your confirmation to the email address below.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 1rem" }}>
        <Field label="First name" error={touched.firstName && errors.firstName}>
          <input type="text" value={guest.firstName} autoComplete="given-name"
            onChange={e => set("firstName", e.target.value)} onBlur={() => blur("firstName")}
            placeholder="Maria" style={inputStyle(touched.firstName && errors.firstName)} />
        </Field>
        <Field label="Last name" error={touched.lastName && errors.lastName}>
          <input type="text" value={guest.lastName} autoComplete="family-name"
            onChange={e => set("lastName", e.target.value)} onBlur={() => blur("lastName")}
            placeholder="Garcia" style={inputStyle(touched.lastName && errors.lastName)} />
        </Field>
      </div>

      <Field label="Email address" error={touched.email && errors.email}>
        <input type="email" value={guest.email} autoComplete="email"
          onChange={e => set("email", e.target.value)} onBlur={() => blur("email")}
          placeholder="maria@email.com" style={inputStyle(touched.email && errors.email)} />
      </Field>

      <Field label="Phone number" error={touched.phone && errors.phone}>
        <input type="tel" value={guest.phone} autoComplete="tel"
          onChange={e => set("phone", e.target.value)} onBlur={() => blur("phone")}
          placeholder="+1 (312) 555-0100" style={inputStyle(touched.phone && errors.phone)} />
      </Field>

      <div style={{ display:"flex", gap:"1rem", marginTop:"0.5rem" }}>
        <button onClick={onBack}
          style={{ flex:1, padding:"1rem", borderRadius:8,
            background: C.white, color: C.charcoal, fontWeight:700, fontSize:"0.95rem",
            border:"1.5px solid #CCC", cursor:"pointer", fontFamily:"inherit" }}>
          ← Back
        </button>
        <button onClick={submit}
          style={{ flex:2, padding:"1rem", borderRadius:8, background: C.yellow,
            color: C.charcoal, fontWeight:800, fontSize:"1rem", border:"none",
            cursor:"pointer", fontFamily:"inherit", transition:"background 0.2s" }}
          onMouseEnter={e => e.target.style.background = "#ddb800"}
          onMouseLeave={e => e.target.style.background = C.yellow}>
          Confirm booking →
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   STEP 3 — Confirmation
   ============================================================ */
function StepConfirmation({ booking, guest, onReset }) {
  const ref = `LL-${Math.floor(Math.random() * 90000) + 10000}`;
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ fontSize:"4rem", marginBottom:"1rem" }}>🎉</div>
      <h2 style={{ fontFamily:"'Markazi Text',serif", fontSize:"2.25rem", color: C.green,
        margin:"0 0 0.5rem", fontWeight:500 }}>
        You're booked, {guest.firstName}!
      </h2>
      <p style={{ color:"#777", fontSize:"0.95rem", margin:"0 0 2rem" }}>
        A confirmation has been sent to <strong>{guest.email}</strong>
      </p>

      <div style={{ background: C.offwhite, borderRadius:12, padding:"1.5rem 2rem",
        textAlign:"left", marginBottom:"2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
          {[
            ["Booking ref", ref],
            ["Name", `${guest.firstName} ${guest.lastName}`],
            ["Date", fmt(booking.date)],
            ["Time", booking.time],
            ["Guests", `${booking.diners} ${booking.diners === 1 ? "guest" : "guests"}`],
            ["Occasion", booking.occasion || "—"],
          ].map(([k, v]) => (
            <div key={k}>
              <p style={{ margin:0, fontSize:"0.75rem", fontWeight:700, color:"#999",
                textTransform:"uppercase", letterSpacing:"0.08em" }}>{k}</p>
              <p style={{ margin:"0.2rem 0 0", fontSize:"0.95rem", fontWeight:600,
                color: C.charcoal }}>{v}</p>
            </div>
          ))}
        </div>
        {booking.notes && (
          <div style={{ marginTop:"1rem", paddingTop:"1rem",
            borderTop:`1px solid #CCC` }}>
            <p style={{ margin:0, fontSize:"0.75rem", fontWeight:700, color:"#999",
              textTransform:"uppercase", letterSpacing:"0.08em" }}>Special requests</p>
            <p style={{ margin:"0.2rem 0 0", fontSize:"0.95rem", color: C.charcoal }}>
              {booking.notes}
            </p>
          </div>
        )}
      </div>

      <p style={{ fontSize:"0.85rem", color:"#999", margin:"0 0 1.5rem" }}>
        Need to change or cancel? Call us at (312) 555-0178 with your booking reference.
      </p>

      <button onClick={onReset}
        style={{ padding:"0.85rem 2rem", borderRadius:8, background: C.green,
          color: C.white, fontWeight:700, fontSize:"0.95rem", border:"none",
          cursor:"pointer", fontFamily:"inherit" }}>
        Make another reservation
      </button>
    </div>
  );
}

/* ============================================================
   PROGRESS BAR
   ============================================================ */
function Progress({ step }) {
  const steps = ["Booking details", "Your details", "Confirmed"];
  return (
    <div style={{ display:"flex", marginBottom:"2rem", gap:0 }}>
      {steps.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={s} style={{ flex:1, textAlign:"center" }}>
            <div style={{ display:"flex", alignItems:"center" }}>
              {i > 0 && <div style={{ flex:1, height:2,
                background: done || active ? C.green : "#DDD", transition:"background 0.3s" }} />}
              <div style={{
                width:28, height:28, borderRadius:"50%", flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"0.8rem", fontWeight:700,
                background: done ? C.green : active ? C.yellow : "#DDD",
                color: done ? C.white : active ? C.charcoal : "#999",
                transition:"all 0.3s",
              }}>
                {done ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && <div style={{ flex:1, height:2,
                background: done ? C.green : "#DDD", transition:"background 0.3s" }} />}
            </div>
            <p style={{ margin:"0.4rem 0 0", fontSize:"0.72rem", fontWeight:600,
              color: active ? C.green : done ? "#666" : "#AAA",
              textTransform:"uppercase", letterSpacing:"0.06em" }}>{s}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
const INIT_BOOKING = { date:"", time:"", diners:2, occasion:"", notes:"" };
const INIT_GUEST = { firstName:"", lastName:"", email:"", phone:"" };

export default function App() {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState(INIT_BOOKING);
  const [guest, setGuest] = useState(INIT_GUEST);

  const reset = () => {
    setStep(0);
    setBooking(INIT_BOOKING);
    setGuest(INIT_GUEST);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#F7F7F5", fontFamily:"'Karla','Segoe UI',sans-serif" }}>
      {/* Header */}
      <header style={{ background: C.white, borderBottom:"3px solid #F4CE14",
        boxShadow:"0 2px 8px rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 2rem",
          display:"flex", alignItems:"center", height:64 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background: C.green,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"1.5rem" }}>🍋</div>
            <div>
              <div style={{ fontFamily:"'Markazi Text',serif", fontSize:"1.4rem",
                fontWeight:700, color: C.green, lineHeight:1.1 }}>Little Lemon</div>
              <div style={{ fontSize:"0.7rem", fontWeight:700, color: C.salmon,
                textTransform:"uppercase", letterSpacing:"0.1em" }}>Chicago</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main card */}
      <main style={{ maxWidth:640, margin:"3rem auto", padding:"0 1.5rem 4rem" }}>
        <div style={{ background: C.white, borderRadius:16,
          boxShadow:"0 4px 24px rgba(0,0,0,0.08)", padding:"2.5rem 2.5rem 2rem" }}>
          <Progress step={step} />

          {step === 0 && (
            <StepBooking booking={booking} setBooking={setBooking}
              onNext={() => setStep(1)} />
          )}
          {step === 1 && (
            <StepGuest booking={booking} guest={guest} setGuest={setGuest}
              onBack={() => setStep(0)} onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <StepConfirmation booking={booking} guest={guest} onReset={reset} />
          )}
        </div>
      </main>
    </div>
  );
}
