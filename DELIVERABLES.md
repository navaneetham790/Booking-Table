# Little Lemon — Reserve-a-Table Design Deliverables

---

## 1. Problem Statement

**Problem to solve:** Little Lemon restaurant currently takes reservations only by phone. This creates friction for customers who prefer to book digitally, leads to missed bookings outside opening hours, and increases staff workload handling calls during service. The goal is to design a seamless, mobile-friendly online table booking experience that allows guests to choose a date, time, and party size without calling the restaurant.

---

## 2. Persona

**Name:** Maria Garcia  
**Age:** 34  
**Gender:** Female  
**Occupation:** Marketing Manager  
**Location:** Lincoln Park, Chicago  

**Photo suggestion:** Professional headshot, friendly expression, mid-30s woman (use a placeholder image or royalty-free photo from Unsplash)

**Statement:** *"I love discovering neighbourhood restaurants, but I need to be able to book online at 11pm after the kids are asleep."*

**Bio:**  
Maria is a busy marketing manager and mother of two who lives a 10-minute drive from Little Lemon. She discovered the restaurant through Instagram and loves Mediterranean food. She typically plans dinners 2–4 days in advance and almost always books via her phone. She avoids calling restaurants and will choose a competitor if online booking is unavailable.

**Core needs:**
- Book a table quickly without needing to call during business hours
- Receive instant confirmation of her reservation
- Be able to specify a special occasion (birthday, anniversary)
- Modify or cancel a booking easily

**Frustrations:**
- Restaurants that only accept phone reservations
- Booking forms that don't work well on mobile
- No email confirmation after booking
- Forms that lose her data if she makes a mistake

---

## 3. User Journey Map

**Persona:** Maria Garcia  
**Scenario:** Booking a birthday dinner for 4 at Little Lemon, one week in advance

### User expectations:
- The booking form is easy to find on the website
- Date, time, and party size can be selected quickly
- The form validates her input clearly
- She receives a confirmation email immediately

---

| Stage | Awareness | Discovery | Booking | Confirmation | Pre-visit |
|-------|-----------|-----------|---------|--------------|-----------|
| **Step** | Sees LL on Instagram | Visits littlelemon.com | Opens Reserve a Table form | Receives email | Arrives at restaurant |
| **Doing** | Taps link in bio | Scrolls homepage, clicks "Reserve" | Selects date, time, party size; enters details | Reads confirmation email | Shows confirmation to host |
| **Thinking** | "This looks like a great spot for Mum's birthday" | "I hope they have online booking" | "Easy so far — I like the time buttons" | "Great, I'm confirmed — I'll add it to my calendar" | "Let's see if they have my booking" |
| **Saying** | "Has anyone been to Little Lemon?" (texts friend) | "Finally, a Reserve button!" | "Which night works for everyone?" | "Done! Dinner is booked" | "We have a reservation under Garcia" |
| **Feeling** | Excited, curious | Relieved (online booking exists) | Focused, slightly uncertain on date | Confident, satisfied | Relaxed and excited |
| **Emotions** | 😊 | 😌 | 🤔 | 😄 | 🥳 |

### Opportunities for improvement:
- Show real-time availability (greyed-out fully-booked times)
- Allow guests to note dietary restrictions in the booking form
- Send SMS confirmation in addition to email
- Add a "Modify booking" link in the confirmation email
- Show estimated wait time for walk-in alternatives

### Actions for next design phase:
- Add availability indicator to time slot buttons
- Design a "Booking confirmed" email template
- Add dietary/allergy field to guest details step
- Design a "Manage booking" page accessible via confirmation email link
- Test the form on iOS Safari and Android Chrome

---

## 4. Wireframe Description (for Figma)

### Screen 1 — Booking Details
```
┌─────────────────────────────────┐
│  🍋 Little Lemon  Chicago       │
├─────────────────────────────────┤
│                                 │
│  [Step 1] ─────── [Step 2] ─── [Step 3]
│  Booking          Details       Confirmed
│                                 │
│  Reserve a Table                │
│  Book your spot at Little Lemon │
│                                 │
│  Date                           │
│  [  Date picker input        ]  │
│                                 │
│  Time                           │
│  [12PM] [12:30] [1PM] [1:30]   │
│  [6PM]  [6:30]  [7PM] [7:30]   │
│                                 │
│  Number of diners               │
│      [−]   2   [+]   guests     │
│                                 │
│  Occasion (optional)            │
│  [Birthday] [Anniversary] ...   │
│                                 │
│  [Continue to your details →]   │
└─────────────────────────────────┘
```

### Screen 2 — Guest Details
```
┌─────────────────────────────────┐
│  🍋 Little Lemon  Chicago       │
├─────────────────────────────────┤
│  ✓ ─────── [Step 2] ─── [Step 3]
│                                 │
│  📅 Friday, July 4 · 7:00 PM · 4 guests
│                                 │
│  Your details                   │
│  We'll send confirmation here.  │
│                                 │
│  First name     Last name       │
│  [          ]   [           ]   │
│                                 │
│  Email address                  │
│  [                           ]  │
│                                 │
│  Phone number                   │
│  [                           ]  │
│                                 │
│  [← Back]  [Confirm booking →]  │
└─────────────────────────────────┘
```

### Screen 3 — Confirmation
```
┌─────────────────────────────────┐
│  🍋 Little Lemon  Chicago       │
├─────────────────────────────────┤
│  ✓ ─────── ✓ ─────── [Step 3]  │
│                                 │
│           🎉                    │
│   You're booked, Maria!         │
│   Confirmation sent to          │
│   maria@email.com               │
│                                 │
│  ┌─────────────────────────────┐ │
│  │ Booking ref    LL-47291     │ │
│  │ Name           Maria Garcia │ │
│  │ Date           Fri, July 4  │ │
│  │ Time           7:00 PM      │ │
│  │ Guests         4            │ │
│  │ Occasion       Birthday     │ │
│  └─────────────────────────────┘ │
│                                 │
│     [Make another reservation]  │
└─────────────────────────────────┘
```

---

## 5. Style Guide (Little Lemon brand)

| Token | Value |
|-------|-------|
| Primary green | `#495E57` |
| Highlight yellow | `#F4CE14` |
| Secondary salmon | `#EE9972` |
| Light background | `#EDEFEE` |
| Body text | `#333333` |
| Display font | Markazi Text (headings, logo) |
| Body font | Karla (all other text) |
| Corner radius | 8px (inputs), 12px (cards) |

---

## 6. Interactive Components (for grading criteria)

Two interactive components used in the prototype:

1. **Time slot buttons** — Toggle between unselected (white border) and selected (filled green) state when clicked. This gives users immediate visual feedback on their chosen time.

2. **Occasion pills** — Toggle between unselected and selected (salmon fill) state when clicked. Also supports deselection by clicking again. Demonstrates radio-button-style interaction without native radio inputs.
