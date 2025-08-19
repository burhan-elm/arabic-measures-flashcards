/**
 * Arabic Verb Forms Practice App
 * Main application logic for the flashcard interface
 */

class ArabicPracticeApp {
    constructor() {
        this.engine = new ArabicVerbEngine();
        this.currentSession = null;
        this.currentCardIndex = 0;
        this.score = { correct: 0, total: 0 };
        this.isAnswerRevealed = false;
        this.colorCodingEnabled = false; // Default: color coding is OFF
        
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Settings panel elements
        this.settingsPanel = document.getElementById('settingsPanel');
        this.formCheckboxes = document.querySelectorAll('.form-checkbox');
        this.typeCheckboxes = document.querySelectorAll('.type-checkbox');
        this.startPracticeBtn = document.getElementById('startPractice');

        // Flashcard elements
        this.flashcardContainer = document.getElementById('flashcardContainer');
        this.arabicWord = document.getElementById('arabicWord');
        this.cardCounter = document.getElementById('cardCounter');
        this.scoreDisplay = document.getElementById('score');
        this.answerSection = document.getElementById('answerSection');
        
        // Answer display elements
        this.answerRoot = document.getElementById('answerRoot');
        this.answerForm = document.getElementById('answerForm');
        this.answerFormDesc = document.getElementById('answerFormDesc');
        this.answerType = document.getElementById('answerType');
        this.answerPattern = document.getElementById('answerPattern');

        // Control buttons
        this.revealBtn = document.getElementById('revealBtn');
        this.correctBtn = document.getElementById('correctBtn');
        this.incorrectBtn = document.getElementById('incorrectBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.backToSettingsBtn = document.getElementById('backToSettings');
        this.newSessionBtn = document.getElementById('newSession');
        this.showReferenceBtn = document.getElementById('showReference');

        // Reference table elements
        this.referenceOverlay = document.getElementById('referenceOverlay');
        this.closeReferenceBtn = document.getElementById('closeReference');
        this.verbFormsTableBody = document.getElementById('verbFormsTableBody');
        this.colorCodingToggle = document.getElementById('colorCodingToggle');

        // Results elements
        this.resultsContainer = document.getElementById('resultsContainer');
        this.finalScore = document.getElementById('finalScore');
        this.accuracy = document.getElementById('accuracy');
        this.totalCards = document.getElementById('totalCards');
        this.practiceAgainBtn = document.getElementById('practiceAgain');
        this.backToStartBtn = document.getElementById('backToStart');
    }

    attachEventListeners() {
        // Settings panel
        this.startPracticeBtn.addEventListener('click', () => this.startPracticeSession());

        // Flashcard controls
        this.revealBtn.addEventListener('click', () => this.revealAnswer());
        this.correctBtn.addEventListener('click', () => this.markAnswer(true));
        this.incorrectBtn.addEventListener('click', () => this.markAnswer(false));
        this.nextBtn.addEventListener('click', () => this.nextCard());

        // Navigation buttons
        this.backToSettingsBtn.addEventListener('click', () => this.showSettings());
        this.newSessionBtn.addEventListener('click', () => this.startNewSession());
        this.showReferenceBtn.addEventListener('click', () => this.showReferenceTable());

        // Reference table buttons
        this.closeReferenceBtn.addEventListener('click', () => this.hideReferenceTable());
        this.referenceOverlay.addEventListener('click', (e) => {
            if (e.target === this.referenceOverlay) {
                this.hideReferenceTable();
            }
        });
        
        // Color coding toggle
        this.colorCodingToggle.addEventListener('change', () => {
            this.colorCodingEnabled = this.colorCodingToggle.checked;
            this.populateReferenceTable(); // Refresh the table with new setting
        });
        
        // Results buttons
        this.practiceAgainBtn.addEventListener('click', () => this.startNewSession());
        this.backToStartBtn.addEventListener('click', () => this.showSettings());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Initialize reference table
        this.initializeReferenceTable();
    }

    getSelectedForms() {
        const selected = [];
        this.formCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selected.push(parseInt(checkbox.value));
            }
        });
        return selected;
    }

    getSelectedTypes() {
        const selected = [];
        this.typeCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selected.push(checkbox.value);
            }
        });
        return selected;
    }

    startPracticeSession() {
        const selectedForms = this.getSelectedForms();
        const selectedTypes = this.getSelectedTypes();

        if (selectedForms.length === 0) {
            alert('Please select at least one verb form.');
            return;
        }

        if (selectedTypes.length === 0) {
            alert('Please select at least one conjugation type.');
            return;
        }

        // Generate session
        this.currentSession = this.generateSession(selectedForms, selectedTypes, 20); // 20 cards per session
        this.currentCardIndex = 0;
        this.score = { correct: 0, total: 0 };
        this.isAnswerRevealed = false;

        // Show flashcard interface
        this.showFlashcardInterface();
        this.displayCurrentCard();
    }

    generateSession(forms, types, cardCount) {
        const cards = [];
        for (let i = 0; i < cardCount; i++) {
            try {
                const card = this.engine.generatePracticeCard(forms, types);
                cards.push(card);
            } catch (error) {
                console.error('Error generating card:', error);
                i--; // Retry this iteration
            }
        }
        return cards;
    }

    showSettings() {
        this.settingsPanel.style.display = 'block';
        this.flashcardContainer.style.display = 'none';
        this.resultsContainer.style.display = 'none';
    }

    showFlashcardInterface() {
        this.settingsPanel.style.display = 'none';
        this.flashcardContainer.style.display = 'block';
        this.resultsContainer.style.display = 'none';
    }

    showResults() {
        this.settingsPanel.style.display = 'none';
        this.flashcardContainer.style.display = 'none';
        this.resultsContainer.style.display = 'block';

        // Update results display
        this.finalScore.textContent = `${this.score.correct}/${this.score.total}`;
        
        const accuracy = this.score.total > 0 ? Math.round((this.score.correct / this.score.total) * 100) : 0;
        this.accuracy.textContent = `${accuracy}%`;
        
        this.totalCards.textContent = this.score.total;
    }

    displayCurrentCard() {
        if (!this.currentSession || this.currentCardIndex >= this.currentSession.length) {
            this.showResults();
            return;
        }

        const card = this.currentSession[this.currentCardIndex];
        
        // Update card display
        this.arabicWord.textContent = card.question.word;
        
        // Update counter and score
        this.cardCounter.textContent = `Card ${this.currentCardIndex + 1} of ${this.currentSession.length}`;
        this.scoreDisplay.textContent = `Score: ${this.score.correct}/${this.score.total}`;

        // Reset button states
        this.resetCardControls();
        this.hideAnswer();
    }

    revealAnswer() {
        const card = this.currentSession[this.currentCardIndex];
        
        // Show answer section
        this.answerSection.style.display = 'block';
        
        // Populate answer details
        this.answerRoot.textContent = card.answer.rootDisplay;
        this.answerForm.textContent = card.answer.formName;
        this.answerFormDesc.textContent = card.answer.formDescription;
        this.answerType.textContent = card.answer.typeName;
        this.answerPattern.textContent = card.answer.pattern;

        // Update button states
        this.revealBtn.style.display = 'none';
        this.correctBtn.style.display = 'inline-block';
        this.incorrectBtn.style.display = 'inline-block';
        
        this.isAnswerRevealed = true;
    }

    hideAnswer() {
        this.answerSection.style.display = 'none';
        this.isAnswerRevealed = false;
    }

    markAnswer(isCorrect) {
        this.score.total++;
        if (isCorrect) {
            this.score.correct++;
        }

        // Update score display
        this.scoreDisplay.textContent = `Score: ${this.score.correct}/${this.score.total}`;

        // Update button states
        this.correctBtn.style.display = 'none';
        this.incorrectBtn.style.display = 'none';
        this.nextBtn.style.display = 'inline-block';

        // Visual feedback
        if (isCorrect) {
            this.showFeedback('Correct! ✓', 'success');
        } else {
            this.showFeedback('Keep practicing! ✗', 'error');
        }
    }

    nextCard() {
        this.currentCardIndex++;
        this.displayCurrentCard();
    }

    resetCardControls() {
        this.revealBtn.style.display = 'inline-block';
        this.correctBtn.style.display = 'none';
        this.incorrectBtn.style.display = 'none';
        this.nextBtn.style.display = 'none';
    }

    startNewSession() {
        // Reset current session
        this.currentSession = null;
        this.currentCardIndex = 0;
        this.score = { correct: 0, total: 0 };
        
        // Start a new practice session with current settings
        this.startPracticeSession();
    }

    showFeedback(message, type) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.className = `feedback feedback-${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            ${type === 'success' ? 'background: #48bb78;' : 'background: #f56565;'}
        `;

        document.body.appendChild(feedback);

        // Remove after 2 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }

    handleKeyboard(event) {
        // Handle reference table keyboard shortcuts
        if (this.referenceOverlay.style.display === 'flex') {
            if (event.key === 'Escape') {
                event.preventDefault();
                this.hideReferenceTable();
            }
            return;
        }

        if (this.flashcardContainer.style.display === 'none') {
            return; // Only handle keyboard when flashcard is visible
        }

        switch (event.key) {
            case ' ': // Spacebar
            case 'Enter':
                event.preventDefault();
                if (!this.isAnswerRevealed) {
                    this.revealAnswer();
                } else if (this.nextBtn.style.display !== 'none') {
                    this.nextCard();
                }
                break;
            case '1':
                event.preventDefault();
                if (this.isAnswerRevealed && this.correctBtn.style.display !== 'none') {
                    this.markAnswer(true);
                }
                break;
            case '0':
                event.preventDefault();
                if (this.isAnswerRevealed && this.incorrectBtn.style.display !== 'none') {
                    this.markAnswer(false);
                }
                break;
            case 'r':
            case 'R':
                event.preventDefault();
                this.showReferenceTable();
                break;
            case 'Escape':
                event.preventDefault();
                this.showSettings();
                break;
        }
    }

    // Utility method to get statistics for the current session
    getSessionStats() {
        return {
            cardsCompleted: this.score.total,
            correct: this.score.correct,
            accuracy: this.score.total > 0 ? (this.score.correct / this.score.total) * 100 : 0,
            remaining: this.currentSession ? this.currentSession.length - this.currentCardIndex : 0
        };
    }

    // Reference table methods
    initializeReferenceTable() {
        this.populateReferenceTable();
    }

    showReferenceTable() {
        this.referenceOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    hideReferenceTable() {
        this.referenceOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    populateReferenceTable() {
        const tbody = this.verbFormsTableBody;
        tbody.innerHTML = ''; // Clear existing content

        const verbForms = this.engine.getAllForms();
        
        for (let i = 1; i <= 10; i++) {
            const form = verbForms[i];
            if (!form) continue;

            const row = document.createElement('tr');
            
            // Get patterns for this form
            const patterns = form.patterns;
            
            // Define the column order (RTL: right to left)
            const columns = [
                'passive_participle', 'active_participle', 'verbal_noun', 
                'passive_imperfect', 'passive_perfect', 'imperative', 
                'imperfect', 'perfect'
            ];

            columns.forEach(columnType => {
                const cell = document.createElement('td');
                let pattern = patterns[columnType];
                
                // Handle Form I multiple patterns - use display pattern if available, otherwise fatha pattern
                if (i === 1 && typeof pattern === 'object') {
                    pattern = pattern['display'] || pattern['فَتحة'] || pattern['ضَمّة'] || Object.values(pattern)[0];
                }
                
                if (pattern && pattern !== '-') {
                    cell.className = 'arabic-pattern';
                    
                    // Conjugate the pattern with the canonical root (ف-ع-ل) and then apply color coding
                    const sampleRoot = ['ف', 'ع', 'ل'];
                    try {
                        const conjugatedForm = this.engine.conjugateVerb(sampleRoot, pattern);
                        // Apply color coding to the conjugated form
                        cell.innerHTML = this.colorCodePattern(conjugatedForm, i, pattern);
                    } catch (error) {
                        // Fallback to original pattern if conjugation fails
                        cell.innerHTML = this.colorCodePattern(pattern, i, pattern);
                    }
                } else {
                    cell.className = 'not-available';
                    cell.textContent = '—';
                }
                
                row.appendChild(cell);
            });

            // Form number (rightmost column)
            const formCell = document.createElement('td');
            formCell.className = 'form-number';
            formCell.textContent = `${form.name}`;
            row.appendChild(formCell);

            tbody.appendChild(row);
        }
    }

    colorCodePattern(conjugatedWord, formNumber, originalPattern) {
        // Check if color coding is enabled
        if (!this.colorCodingEnabled) {
            return conjugatedWord;
        }
        
        // Highlight all morphological additions (everything that's NOT root letters) in bold red
        const additionColor = '#e53e3e'; // Red for morphological additions
        
        let coloredWord = conjugatedWord;
        
        // Instead of coloring individual characters, group consecutive non-root characters
        // This preserves Arabic text flow and proper letter joining
        coloredWord = coloredWord.replace(/([^فعل]+)/g, 
            `<span style="color: ${additionColor} !important; font-weight: bold !important;">$1</span>`);
        
        return coloredWord;
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArabicPracticeApp();
    
    // Add keyboard shortcuts help
    console.log('Keyboard shortcuts:');
    console.log('Space/Enter: Reveal answer or next card');
    console.log('1: Mark correct');
    console.log('0: Mark incorrect');
    console.log('Escape: Back to settings');
});