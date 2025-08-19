# Arabic Verb Forms Practice App

A web-based flashcard application for memorizing Arabic verb conjugation patterns (الأوزان). This app helps you practice identifying root letters, verb forms (measures), and conjugation types based on classical Arabic morphology.

## Features

### 🔤 Comprehensive Verb Forms
- **10 Arabic Verb Forms (I-X)**: Practice all major verb measures with their unique patterns
- **8 Conjugation Types**: Perfect, Imperfect, Passive Perfect, Passive Imperfect, Imperative, Active Participle, Passive Participle, and Verbal Noun (Masdar)
- **20+ Common Arabic Roots**: Including ف-ع-ل, ك-ت-ب, ق-ر-أ, د-ر-س, and more

### 📚 Interactive Learning
- **Flashcard Interface**: Clean, modern design optimized for Arabic text
- **Customizable Practice**: Choose which verb forms and conjugation types to include
- **Self-Assessment**: Mark your answers as correct/incorrect for progress tracking
- **Score Tracking**: Monitor your accuracy and improvement over time

### ⌨️ User-Friendly Controls
- **Keyboard Shortcuts**: 
  - Space/Enter: Reveal answer or next card
  - 1: Mark correct
  - 0: Mark incorrect
  - Escape: Back to settings
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Arabic Font Support**: Uses Amiri font for proper Arabic text rendering

## How to Use

### 1. Setup
1. Clone or download this repository
2. Open `index.html` in a web browser
3. Or serve it locally with: `python3 -m http.server 8000`

### 2. Configure Practice Session
1. **Select Verb Forms**: Choose which forms (I-X) you want to practice
2. **Select Conjugation Types**: Pick from:
   - Perfect (Past tense) - الماضي
   - Imperfect (Present tense) - المضارع
   - Passive Perfect (Past passive) - الماضي المجهول
   - Passive Imperfect (Present passive) - المضارع المجهول
   - Imperative (Command) - الأمر
   - Active Participle - اسم الفاعل
   - Passive Participle - اسم المفعول
   - Verbal Noun (Masdar) - المصدر
3. Click "Start Practice"

### 3. Practice Session
1. **Study the Arabic word** displayed on the flashcard
2. **Try to identify**:
   - The 3 root letters
   - Which verb form (I-X) it belongs to
   - What conjugation type it is
3. **Reveal the answer** when ready
4. **Mark yourself** as correct or incorrect
5. **Continue** to the next card

### 4. Review Results
- See your overall score and accuracy
- Start a new session or return to settings

## Arabic Verb Forms Reference

| Form | Pattern | Meaning | Example (Root: ف-ع-ل) |
|------|---------|---------|---------------------|
| I | فَعَلَ | Basic meaning | فَعَلَ |
| II | فَعَّلَ | Causative/Intensive | فَعَّلَ |
| III | فَاعَلَ | Associative | فَاعَلَ |
| IV | أَفْعَلَ | Causative | أَفْعَلَ |
| V | تَفَعَّلَ | Reflexive of II | تَفَعَّلَ |
| VI | تَفَاعَلَ | Reflexive of III | تَفَاعَلَ |
| VII | اِنْفَعَلَ | Reflexive/Passive | اِنْفَعَلَ |
| VIII | اِفْتَعَلَ | Reflexive | اِفْتَعَلَ |
| IX | اِفْعَلَّ | Colors/Defects | اِفْعَلَّ |
| X | اِسْتَفْعَلَ | Seeking/Requesting | اِسْتَفْعَلَ |

## Technical Details

### Files Structure
```
arabic-practice/
├── index.html          # Main application interface
├── styles.css          # Styling and responsive design
├── arabic-engine.js    # Arabic conjugation engine
├── app.js              # Main application logic
├── test.html           # Test page for engine verification
└── README.md           # This file
```

### Browser Support
- Modern browsers with ES6+ support
- Unicode Arabic text rendering
- Local storage (optional, for future features)

### Fonts
- **Arabic Text**: Amiri (Google Fonts)
- **Interface**: Inter (Google Fonts)

## License

MIT License - Feel free to use for educational purposes.
