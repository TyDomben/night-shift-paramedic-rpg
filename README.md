# Night Shift - A Paramedic RPG

A narrative-driven, story-rich RPG where you play as a paramedic navigating medical emergencies, personal trauma, and the grinding reality of EMS work. Every call is a story, every partner changes the game, and your mental health is as critical as your medical skills.

**Inspired by**: Disco Elysium's dialogue system and the film "Bring Out The Dead"

## Features

### Core Gameplay
- **24 Skills** across 4 categories (Medical, Physical, Interpersonal, Mental/Emotional)
- **5 Character Backgrounds** with unique starting stats and dialogue
- **5 Personality Archetypes** that affect your approach to the job
- **Mental Health System** with stress, coping mechanisms, and mental states
- **6 Fully-Realized Partners** with deep relationship mechanics
- **Procedural Call Generation** with 50+ call templates

### Story Elements
- **Traumatic Prologue** that establishes the emotional stakes
- **Flashback System** triggered by similar situations
- **Multiple Endings** based on your choices, relationships, and mental health
- **Disco Elysium-style Skill Voices** as internal monologue

### Character Backgrounds
- **Burned Out Veteran** - High medical skills, low sanity
- **Idealistic Rookie** - High empathy, naive, learns fast
- **Career-Changer** - Diverse skills, proving yourself
- **Legacy Paramedic** - Family pressure, reputation to uphold
- **Second Chance** - Recovering from addiction/incident

### Partner System
1. **Marcus "Doc" Williams** - Cynical veteran, 20 years on the job
2. **Jenny Rodriguez** - Optimistic, 3 years in, still believes
3. **Darius Thompson** - Former military medic with PTSD
4. **Olivia Chen** - Perfectionist studying for medical school
5. **Ray "Lucky" Sullivan** - Uses humor as armor
6. **Sarah Mitchell** - Former patient who became a paramedic because of you

### Call Types
- **Routine**: Elderly falls, chest pain, anxiety attacks
- **Medical Emergencies**: Cardiac arrest, stroke, overdose, childbirth
- **Traumatic**: Pediatric trauma, domestic violence, shootings
- **Psychological**: Mental health crises, treatment refusals

## Technical Details

### Built With
- Vanilla JavaScript (ES6+)
- HTML5 Canvas-ready architecture
- CSS3 with custom properties
- Local Storage for save system

### Project Structure
```
night-shift-paramedic-rpg/
├── index.html              # Main game page
├── css/
│   └── styles.css          # Game styling
├── js/
│   ├── utils.js            # Utility functions
│   ├── audio.js            # Audio system
│   ├── medical-protocols.js # Medically accurate ACLS/MARCH protocols
│   ├── skill-check-system.js # Six-tier skill check with consequences
│   ├── character.js        # Character/skills system (24 skills)
│   ├── mental-health.js    # Stress and coping mechanisms
│   ├── partners.js         # Partner relationships (6 partners)
│   ├── calls.js            # Call/mission system
│   ├── dialogue.js         # Disco Elysium-style dialogue (16 skill voices)
│   ├── thought-cabinet.js  # Thought internalization system (10+ thoughts)
│   ├── mini-games.js       # Medical procedure mini-games (CPR, IV, defib)
│   ├── endings.js          # 8 complete endings with sequences
│   ├── activities.js       # 15+ off-duty activities
│   ├── story-calls-1.js    # Complete scripted story calls
│   ├── story-calls-2.js    # Traumatic calls & partner missions
│   ├── ui.js               # UI/HUD management
│   └── game.js             # Main game engine
└── README.md
```

## How to Play

1. Open `index.html` in a modern web browser
2. Click "New Game" to start
3. Create your character by selecting:
   - Name
   - Background
   - Personality archetype
   - Distribute skill points
4. Experience the traumatic prologue
5. Navigate shifts, make choices, manage your mental health

### Controls
- Click to advance dialogue
- Click choices to select them
- Use bottom buttons to access character sheet, partner info, equipment

## Game Systems

### Enhanced Skill Check System
Skills use an advanced six-tier success/failure system with real consequences:

**Success Tiers:**
- **Critical Success** (margin ≥10): Exceptional performance, stress reduction, time bonus, extra patient stability
- **Success** (margin 5-9): Competent execution, normal progress
- **Marginal Success** (margin 0-4): Barely adequate, complication risk 30%, minor time delay

**Failure Tiers:**
- **Marginal Failure** (margin -1 to -5): Suboptimal attempt, patient worsens, stress +3, retry possible
- **Failure** (margin -6 to -10): Significant consequences, patient deteriorates, stress +8, equipment wasted
- **Critical Failure** (margin ≤-11): Catastrophic error, guaranteed complication, stress +15, no retry possible

**Modifiers:**
- High stress (>70): -1 per 10 points over threshold
- Low energy (<30): -1 per 15 points under threshold
- Missing equipment: -4 penalty per required item
- Partner assistance: +2 to +4 depending on partner's expertise
- Mental state: varies by condition and skill type

**Retry System:**
- Failed checks can often be retried at +2 difficulty
- Retries cost time and increase stress (+3)
- Critical failures may prevent retry (too much damage done)
- Equipment depletion can prevent retry

### Stress & Mental States
- Stress increases from traumatic calls, deaths, and poor choices
- High stress leads to mental states like Dissociated, Hypervigilant, or Depressed
- Each mental state affects gameplay with buffs and debuffs
- Manage stress through healthy or unhealthy coping mechanisms

### Relationships
- Work shifts with different partners
- Build trust through choices and shared experiences
- Higher relationship levels unlock personal story missions and special endings

### Medical Accuracy
The game features medically accurate protocols and procedures:

**ACLS (Advanced Cardiac Life Support):**
- CPR standards: 100-120 compressions/minute, 2-2.4 inches depth, 30:2 ratio
- Proper medication dosing: Epinephrine 1mg IV, Atropine 0.5mg, Amiodarone 300mg
- Correct rhythm recognition and treatment algorithms
- Realistic termination criteria (20-30 minutes, 3 rounds epi, medical control)

**Medication Administration:**
- Accurate dosing: Aspirin 324mg, Nitroglycerin 0.4mg SL, Narcan 0.4-2mg IN/IM
- Real contraindications checked: NTG contraindicated with Viagra <24h or hypotension
- Drug-drug interactions and allergic reactions
- Proper routes: IV, IM, SL, IN, PO

**Treatment Protocols:**
- MARCH algorithm for trauma (Massive hemorrhage, Airway, Respirations, Circulation, Hypothermia)
- STEMI protocol with 12-lead ECG and aspirin
- Respiratory distress management with albuterol/CPAP
- Proper use of spinal immobilization and splinting

**Realistic Vital Signs:**
- Accurate vital signs for each patient based on age and condition
- BP, HR, RR, SpO2, temperature, consciousness level, pain scale
- Pediatric vitals adjusted (higher HR/RR, lower BP)
- Geriatric considerations (baseline hypertension common)
- Condition-specific presentations:
  - Cardiac arrest: 0/0 BP, HR 0, asystole
  - Chest pain: Elevated BP (140-180/85-105), tachycardia
  - Opioid overdose: Bradycardia, hypoventilation (4-10 RR), pinpoint pupils, low SpO2
  - Anaphylaxis: Hypotension, tachycardia, low SpO2, stridor
  - Diabetic emergencies: Glucose readings (35-600 mg/dL range)

**Medical History Generation:**
- Age-appropriate comorbidities (HTN, diabetes, A-fib, COPD)
- Call-specific history (prior MI for cardiac calls, epilepsy for seizures)
- Medication lists that match conditions (Warfarin for A-fib, metformin for diabetes)
- Allergies tracked (15% chance of aspirin allergy)
- Drug interactions considered in treatment validation

**Equipment Requirements:**
- Call-specific equipment needs automatically determined
- Cardiac arrest: Defibrillator, airway kit, medications, CPR board
- Trauma: Tourniquets, splints, trauma kit, IV supplies
- Overdose: Narcan (if opioid), airway kit, restraints
- Missing equipment applies -4 penalty to relevant skill checks
- Equipment depletion tracked through failed attempts

**Realistic Complications:**
- Rib fractures from CPR (8-10% incidence)
- Esophageal intubation risk
- IV infiltration and hematomas
- Medication errors with serious consequences
- Missed diagnoses affecting patient outcomes

## Content Warnings

This game contains mature themes including:
- Death and dying
- Trauma and PTSD
- Mental health struggles
- Substance abuse
- Medical emergencies
- Child victims

Player discretion is advised. The game includes content warning toggles in Options.

## Development Status

This is a comprehensive implementation with all core systems:
- [x] Character creation (24 skills, 5 backgrounds, 5 archetypes)
- [x] Mental health system with 7 mental states
- [x] Partner relationships (6 partners with full dialogue)
- [x] Enhanced six-tier skill check system with real consequences
- [x] Medically accurate ACLS/MARCH protocols
- [x] Medication contraindication validation system
- [x] Retry mechanics with increasing difficulty
- [x] Realistic medical complications from failures
- [x] Disco Elysium-style dialogue with 16 skill voices
- [x] Playable traumatic prologue sequence with realistic CPR
- [x] Thought Cabinet system (10+ internalizeable thoughts)
- [x] Medical procedure mini-games (CPR, IV, Defibrillation)
- [x] 8 complete endings with full sequences
- [x] 15+ off-duty activities (therapy, hobbies, social)
- [x] Complete scripted story calls with full dialogue trees
- [x] Partner personal story missions
- [x] Save/load system

### Additional Features
- **Thought Cabinet**: Internalize thoughts to gain permanent bonuses (like Disco Elysium)
- **Mini-Games**: Interactive CPR rhythm game (100-120 BPM, 2-2.4" depth), IV placement, defibrillation timing
- **Multiple Endings**: 8 endings (Burnout, Survivor, Redeemed, Escalation, Promotion, Change, True Partner, Advocate)
- **Off-Duty Activities**: Therapy sessions with dialogue trees, exercise, social activities, hobbies
- **Coping Mechanisms**: Both healthy (therapy, exercise) and unhealthy (alcohol, isolation) with consequences
- **Dynamic Treatment Choices**: Call-specific treatment options based on patient presentation and vitals
- **Medical Validation**: Real-time contraindication checking for medications based on patient history
- **Complication System**: 50+ realistic medical complications tied to specific failures
- **Patient Stability Tracking**: Real-time tracking of patient condition through skill checks
  - Successful interventions improve stability
  - Failures worsen patient condition
  - Complications apply -2 penalty each
  - Final outcome determined by stability score, not just pass/fail
- **Realistic Vital Signs**: Every patient has accurate vitals (BP, HR, RR, SpO2, temp, pain)
- **Equipment System**: Call-type specific equipment requirements with penalties for missing gear
- **Medical History**: Patients have realistic comorbidities, medications, and allergies
- **Chief Complaints**: Proper EMS-style chief complaints matching medical protocols

### Future Enhancements
- Full audio implementation with actual sound files
- Visual assets and character portraits
- Mobile-responsive design
- Additional scripted story calls (currently ~15, target 50+)
- Investigation side-quests

## Credits

Designed as a narrative exploration of the paramedic experience, aiming to capture both the heroism and the toll of EMS work. This is not a medical training tool and takes creative liberties for narrative purposes.

**Recommended consultation**: Work with actual EMS professionals and mental health experts for authenticity and responsible representation.

## License

This project is for educational and portfolio purposes.

---

*"Every call is a story. Every choice leaves a mark. Every shift changes you. Are you ready to answer?"*
