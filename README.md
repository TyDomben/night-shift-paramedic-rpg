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
├── index.html          # Main game page
├── css/
│   └── styles.css      # Game styling
├── js/
│   ├── utils.js        # Utility functions
│   ├── audio.js        # Audio system (placeholder)
│   ├── character.js    # Character/skills system
│   ├── mental-health.js # Stress and coping
│   ├── partners.js     # Partner relationships
│   ├── calls.js        # Call/mission system
│   ├── dialogue.js     # Disco Elysium-style dialogue
│   ├── ui.js           # UI/HUD management
│   └── game.js         # Main game engine
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

### Skill Checks
Skills are checked using a d20 roll system. Higher skill values give better chances of success. Your mental state, stress level, and partner can all modify these checks.

### Stress & Mental States
- Stress increases from traumatic calls, deaths, and poor choices
- High stress leads to mental states like Dissociated, Hypervigilant, or Depressed
- Each mental state affects gameplay with buffs and debuffs
- Manage stress through healthy or unhealthy coping mechanisms

### Relationships
- Work shifts with different partners
- Build trust through choices and shared experiences
- Higher relationship levels unlock personal story missions and special endings

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

This is a functional prototype demonstrating core systems:
- [x] Character creation and skills
- [x] Mental health system
- [x] Partner relationships
- [x] Call generation and skill checks
- [x] Disco Elysium-style dialogue with skill voices
- [x] Playable prologue sequence
- [x] Main game loop
- [x] Save/load system

### Future Enhancements
- Full audio implementation
- More scripted story calls
- Complete partner story arcs
- Multiple ending paths
- Visual assets and scenes
- Mobile-responsive design
- Additional coping mechanism mini-games

## Credits

Designed as a narrative exploration of the paramedic experience, aiming to capture both the heroism and the toll of EMS work. This is not a medical training tool and takes creative liberties for narrative purposes.

**Recommended consultation**: Work with actual EMS professionals and mental health experts for authenticity and responsible representation.

## License

This project is for educational and portfolio purposes.

---

*"Every call is a story. Every choice leaves a mark. Every shift changes you. Are you ready to answer?"*
