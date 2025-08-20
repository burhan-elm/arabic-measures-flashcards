/**
 * Arabic Verb Conjugation Engine
 * Implements the 10 Arabic verb forms (measures) with their conjugation patterns
 */

class ArabicVerbEngine {
    constructor() {
        // Define common Arabic roots for practice
        // Format: [root1, root2, root3, meaning, perfect_vowel, imperfect_vowel, valid_forms]
        // valid_forms: array of form numbers (1-10) where this root has valid conjugations
        // Total: 26 roots with comprehensive form coverage
        this.commonRoots = [
            // Basic verbs (well-attested across multiple forms)
            ['ف', 'ع', 'ل', 'to do', 'فَتحة', 'ضَمّة', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], // فَعَلَ - يَفْعُلُ (canonical, works in all forms)
            ['ك', 'ت', 'ب', 'to write', 'فَتحة', 'ضَمّة', [1, 2, 3, 4, 5, 6, 8, 10]], // كَتَبَ - يَكْتُبُ
            ['ق', 'ر', 'أ', 'to read', 'فَتحة', 'فَتحة', [1, 2, 3, 4, 5, 6, 8, 10]], // قَرَأَ - يَقْرَأُ
            ['د', 'ر', 'س', 'to study', 'فَتحة', 'ضَمّة', [1, 2, 3, 4, 5, 6, 8, 10]], // دَرَسَ - يَدْرُسُ
            ['ع', 'م', 'ل', 'to work', 'كَسرة', 'فَتحة', [1, 2, 3, 4, 5, 6, 8, 10]], // عَمِلَ - يَعْمَلُ
            
            // Movement verbs
            ['خ', 'ر', 'ج', 'to go out', 'فَتحة', 'ضَمّة', [1, 2, 4, 10]], // خَرَجَ - يَخْرُجُ
            ['د', 'خ', 'ل', 'to enter', 'فَتحة', 'ضَمّة', [1, 2, 4, 10]], // دَخَلَ - يَدْخُلُ
            ['ج', 'ل', 'س', 'to sit', 'فَتحة', 'كَسرة', [1, 2, 4]], // جَلَسَ - يَجْلِسُ
            ['ر', 'ج', 'ع', 'to return', 'فَتحة', 'كَسرة', [1, 2, 4, 8]], // رَجَعَ - يَرْجِعُ
            ['ذ', 'ه', 'ب', 'to go', 'فَتحة', 'فَتحة', [1, 2, 4]], // ذَهَبَ - يَذْهَبُ
            ['ج', 'ي', 'ء', 'to come', 'فَتحة', 'كَسرة', [1, 2, 4, 8]], // جَاءَ - يَجِيءُ
            ['م', 'ش', 'ي', 'to walk', 'فَتحة', 'كَسرة', [1, 2, 8]], // مَشَى - يَمْشِي
            ['ر', 'ك', 'ب', 'to ride', 'كَسرة', 'فَتحة', [1, 2, 8]], // رَكِبَ - يَرْكَبُ
            ['ن', 'ز', 'ل', 'to descend', 'فَتحة', 'كَسرة', [1, 2, 4, 10]], // نَزَلَ - يَنْزِلُ
            ['ص', 'ع', 'د', 'to ascend', 'كَسرة', 'فَتحة', [1, 2, 8]], // صَعِدَ - يَصْعَدُ
            
            // Action verbs
            ['ن', 'ص', 'ر', 'to help', 'فَتحة', 'ضَمّة', [1, 2, 3, 4, 8, 10]], // نَصَرَ - يَنْصُرُ
            ['ض', 'ر', 'ب', 'to hit', 'فَتحة', 'كَسرة', [1, 2, 3, 4, 8]], // ضَرَبَ - يَضْرِبُ
            ['ق', 'ط', 'ع', 'to cut', 'فَتحة', 'فَتحة', [1, 2, 4, 7, 8]], // قَطَعَ - يَقْطَعُ
            ['ج', 'م', 'ع', 'to gather', 'فَتحة', 'فَتحة', [1, 2, 4, 6, 8]], // جَمَعَ - يَجْمَعُ
            ['ح', 'م', 'ل', 'to carry', 'فَتحة', 'كَسرة', [1, 2, 5, 6, 8, 10]], // حَمَلَ - يَحْمِلُ
            
            // Form VII (reflexive/passive) verbs
            ['ك', 'س', 'ر', 'to break', 'فَتحة', 'كَسرة', [1, 2, 4, 7, 8]], // كَسَرَ - يَكْسِرُ (Form VII: اِنْكَسَرَ - to be broken)
            ['ف', 'ت', 'ح', 'to open', 'فَتحة', 'كَسرة', [1, 2, 4, 7, 8]], // فَتَحَ - يَفْتَحُ (Form VII: اِنْفَتَحَ - to be opened)
            ['ق', 'ل', 'ب', 'to turn', 'فَتحة', 'كَسرة', [1, 2, 4, 7, 8]], // قَلَبَ - يَقْلِبُ (Form VII: اِنْقَلَبَ - to be overturned)
            
            // Form IX (colors/defects) verbs  
            ['ح', 'م', 'ر', 'to be red', 'كَسرة', 'كَسرة', [1, 2, 4, 9]], // حَمِرَ - يَحْمَرُ (Form IX: اِحْمَرَّ - to become red)
            ['س', 'و', 'د', 'to be black', 'كَسرة', 'كَسرة', [1, 2, 4, 9]], // سَوِدَ - يَسْوَدُ (Form IX: اِسْوَدَّ - to become black)
            ['ب', 'ي', 'ض', 'to be white', 'كَسرة', 'كَسرة', [1, 2, 4, 9]] // بَيِضَ - يَبِيضُ (Form IX: اِبْيَضَّ - to become white)
        ];

        // Verb form patterns - based on the classical Arabic measures
        this.verbForms = {
            1: {
                name: 'Form I',
                description: 'Regular',
                patterns: {
                    // Multiple patterns for Form I based on vowel combinations
                    perfect: {
                        'فَتحة': 'فَعَلَ',  // فَعَلَ pattern
                        'كَسرة': 'فَعِلَ',   // فَعِلَ pattern
                        'display': 'فَعلَ'   // Generic display pattern without middle vowel
                    },
                    imperfect: {
                        'ضَمّة': 'يَفْعُلُ',   // يَفْعُلُ pattern  
                        'كَسرة': 'يَفْعِلُ',  // يَفْعِلُ pattern
                        'فَتحة': 'يَفْعَلُ',   // يَفْعَلُ pattern
                        'display': 'يَفْعلُ'   // Generic display pattern without middle vowel
                    },
                    passive_perfect: 'فُعِلَ',
                    passive_imperfect: 'يُفْعَلُ',
                    imperative: {
                        'ضَمّة': 'اُفْعُلْ',   // اُفْعُلْ for يَفْعُلُ verbs
                        'كَسرة': 'اِفْعِلْ',  // اِفْعِلْ for يَفْعِلُ verbs  
                        'فَتحة': 'اِفْعَلْ',   // اِفْعَلْ for يَفْعَلُ verbs
                        'display': 'اِفْعلْ'   // Generic display pattern without middle vowel
                    },
                    active_participle: 'فَاعِل',
                    passive_participle: 'مَفْعُول',
                    verbal_noun: 'فَعْل'
                }
            },
            2: {
                name: 'Form II',
                description: 'Causative/intensive',
                patterns: {
                    perfect: 'فَعَّلَ',
                    imperfect: 'يُفَعِّلُ',
                    passive_perfect: 'فُعِّلَ',
                    passive_imperfect: 'يُفَعَّلُ',
                    imperative: 'فَعِّلْ',
                    active_participle: 'مُفَعِّل',
                    passive_participle: 'مُفَعَّل',
                    verbal_noun: 'تَفْعِيل'
                }
            },
            3: {
                name: 'Form III',
                description: 'Associative - do with/to someone',
                patterns: {
                    perfect: 'فَاعَلَ',
                    imperfect: 'يُفَاعِلُ',
                    passive_perfect: 'فُوعِلَ',
                    passive_imperfect: 'يُفَاعَلُ',
                    imperative: 'فَاعِلْ',
                    active_participle: 'مُفَاعِل',
                    passive_participle: 'مُفَاعَل',
                    verbal_noun: 'مُفَاعَلَة'
                }
            },
            4: {
                name: 'Form IV',
                description: 'Causative',
                patterns: {
                    perfect: 'أَفْعَلَ',
                    imperfect: 'يُفْعِلُ',
                    passive_perfect: 'أُفْعِلَ',
                    passive_imperfect: 'يُفْعَلُ',
                    imperative: 'أَفْعِلْ',
                    active_participle: 'مُفْعِل',
                    passive_participle: 'مُفْعَل',
                    verbal_noun: 'إِفْعَال'
                }
            },
            5: {
                name: 'Form V',
                description: 'Reflexive of Form II - doing the action to oneself',
                patterns: {
                    perfect: 'تَفَعَّلَ',
                    imperfect: 'يَتَفَعَّلُ',
                    passive_perfect: 'تُفُعِّلَ',
                    passive_imperfect: 'يُتَفَعَّلُ',
                    imperative: 'تَفَعَّلْ',
                    active_participle: 'مُتَفَعِّل',
                    passive_participle: 'مُتَفَعَّل',
                    verbal_noun: 'تَفَعُّل'
                }
            },
            6: {
                name: 'Form VI',
                description: 'Reflexive of Form III - reciprocal action',
                patterns: {
                    perfect: 'تَفَاعَلَ',
                    imperfect: 'يَتَفَاعَلُ',
                    passive_perfect: 'تُفُوعِلَ',
                    passive_imperfect: 'يُتَفَاعَلُ',
                    imperative: 'تَفَاعَلْ',
                    active_participle: 'مُتَفَاعِل',
                    passive_participle: 'مُتَفَاعَل',
                    verbal_noun: 'تَفَاعُل'
                }
            },
            7: {
                name: 'Form VII',
                description: 'Passive of Form I - action happens to the subject',
                patterns: {
                    perfect: 'اِنْفَعَلَ',
                    imperfect: 'يَنْفَعِلُ',
                    passive_perfect: '-',
                    passive_imperfect: '-',
                    imperative: 'اِنْفَعِلْ',
                    active_participle: 'مُنْفَعِل',
                    passive_participle: '-',
                    verbal_noun: 'اِنْفِعَال'
                }
            },
            8: {
                name: 'Form VIII',
                description: 'Reflexive of I',
                patterns: {
                    perfect: 'اِفْتَعَلَ',
                    imperfect: 'يَفْتَعِلُ',
                    passive_perfect: 'اُفْتُعِلَ',
                    passive_imperfect: 'يُفْتَعَلُ',
                    imperative: 'اِفْتَعِلْ',
                    active_participle: 'مُفْتَعِل',
                    passive_participle: 'مُفْتَعَل',
                    verbal_noun: 'اِفْتِعَال'
                }
            },
            9: {
                name: 'Form IX',
                description: 'Add colour/Be defective',
                patterns: {
                    perfect: 'اِفْعَلَّ',
                    imperfect: 'يَفْعَلُّ',
                    passive_perfect: '-',
                    passive_imperfect: '-',
                    imperative: '-',
                    active_participle: 'مُفْعَلّ',
                    passive_participle: '-',
                    verbal_noun: 'اِفْعِلَال'
                }
            },
            10: {
                name: 'Form X',
                description: 'Seeking/requesting',
                patterns: {
                    perfect: 'اِسْتَفْعَلَ',
                    imperfect: 'يَسْتَفْعِلُ',
                    passive_perfect: 'اُسْتُفْعِلَ',
                    passive_imperfect: 'يُسْتَفْعَلُ',
                    imperative: 'اِسْتَفْعِلْ',
                    active_participle: 'مُسْتَفْعِل',
                    passive_participle: 'مُسْتَفْعَل',
                    verbal_noun: 'اِسْتِفْعَال'
                }
            }
        };

        // Type names in both English and Arabic
        this.typeNames = {
            perfect: 'Perfect (Past) - الماضي',
            imperfect: 'Imperfect (Present) - المضارع',
            passive_perfect: 'Passive Perfect (Past) - الماضي المجهول',
            passive_imperfect: 'Passive Imperfect (Present) - المضارع المجهول',
            imperative: 'Imperative (Command) - الأمر',
            active_participle: 'Active Participle - اسم الفاعل',
            passive_participle: 'Passive Participle - اسم المفعول',
            verbal_noun: 'Verbal Noun (Masdar) - المصدر'
        };
    }

    /**
     * Apply a verb pattern to a root
     * @param {Array} root - Array of 3 Arabic letters [ف, ع, ل]
     * @param {string} pattern - Arabic pattern like 'فَعَلَ'
     * @returns {string} - Conjugated Arabic word
     */
    conjugateVerb(root, pattern) {
        if (!root || root.length !== 3) {
            throw new Error('Root must contain exactly 3 letters');
        }

        const [first, second, third] = root;
        
        // Use a single replacement pass to avoid interference between substitutions
        let result = pattern.replace(/[فعل]/g, (match) => {
            switch (match) {
                case 'ف': return first;
                case 'ع': return second;
                case 'ل': return third;
                default: return match;
            }
        });

        return result;
    }

    /**
     * Generate all conjugations for a given root and form
     * @param {Array} root - Array of 3 Arabic letters
     * @param {number} formNumber - Verb form number (1-10)
     * @param {Object} rootData - Optional: full root data with vowel info
     * @returns {Object} - Object containing all conjugations
     */
    generateConjugations(root, formNumber, rootData = null) {
        const form = this.verbForms[formNumber];
        if (!form) {
            throw new Error(`Invalid form number: ${formNumber}`);
        }

        const conjugations = {};
        
        for (const [type, pattern] of Object.entries(form.patterns)) {
            if (pattern === '-') {
                conjugations[type] = null; // Some forms don't have certain conjugations
            } else if (formNumber === 1 && typeof pattern === 'object') {
                // Handle Form I special vowel patterns
                const selectedPattern = this.selectFormIPattern(type, pattern, rootData);
                conjugations[type] = selectedPattern ? this.conjugateVerb(root, selectedPattern) : null;
            } else {
                conjugations[type] = this.conjugateVerb(root, pattern);
            }
        }

        return {
            root: root,
            form: formNumber,
            formName: form.name,
            description: form.description,
            conjugations: conjugations
        };
    }

    /**
     * Select the correct Form I pattern based on root vowel information
     * @param {string} type - Conjugation type (perfect, imperfect, imperative)
     * @param {Object} patterns - Available patterns for this type
     * @param {Object} rootData - Root data with vowel information
     * @returns {string} - Selected pattern
     */
    selectFormIPattern(type, patterns, rootData) {
        if (!rootData || rootData.length < 6) {
            // Default patterns if no vowel information available
            const defaults = {
                'perfect': patterns['فَتحة'] || Object.values(patterns)[0],
                'imperfect': patterns['ضَمّة'] || Object.values(patterns)[0],
                'imperative': patterns['ضَمّة'] || Object.values(patterns)[0]
            };
            return defaults[type] || Object.values(patterns)[0];
        }

        const perfectVowel = rootData[4]; // Index 4: perfect vowel
        const imperfectVowel = rootData[5]; // Index 5: imperfect vowel

        switch (type) {
            case 'perfect':
                return patterns[perfectVowel] || patterns['فَتحة'];
            case 'imperfect':
                return patterns[imperfectVowel] || patterns['ضَمّة'];
            case 'imperative':
                return patterns[imperfectVowel] || patterns['ضَمّة'];
            default:
                return Object.values(patterns)[0];
        }
    }

    /**
     * Generate a random practice card
     * @param {Array} allowedForms - Array of form numbers to include
     * @param {Array} allowedTypes - Array of conjugation types to include
     * @returns {Object} - Practice card with question and answer
     */
    generatePracticeCard(allowedForms, allowedTypes, learningMode = 'mixed') {
        let randomRoot, root, randomForm;
        
        if (learningMode === 'patterns') {
            // Use only the canonical ف-ع-ل root for pattern practice
            randomRoot = ['ف', 'ع', 'ل', 'to do', 'فَتحة', 'ضَمّة', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]];
            root = ['ف', 'ع', 'ل'];
            // Select random form from allowed forms (all are valid for canonical root)
            randomForm = allowedForms[Math.floor(Math.random() * allowedForms.length)];
        } else {
            // Form-first selection: pick a random form first, then find a root that supports it
            // This ensures equal probability for each form regardless of how many roots support it
            randomForm = allowedForms[Math.floor(Math.random() * allowedForms.length)];
            
            // Find all roots that support this form
            const candidateRoots = this.commonRoots.filter(rootData => {
                const validForms = rootData[6] || [1]; // Default to Form I if no validity data
                return validForms.includes(randomForm);
            });
            
            // Select random root from candidates that support this form
            randomRoot = candidateRoots[Math.floor(Math.random() * candidateRoots.length)];
            root = randomRoot.slice(0, 3); // Take only the 3 letters, not the meaning
        }
        
        // Select random type from allowed types
        const randomType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
        
        // Generate the conjugation with proper vowel handling
        const conjugations = this.generateConjugations(root, randomForm, randomRoot);
        const conjugatedWord = conjugations.conjugations[randomType];
        
        // Skip if this form doesn't have this conjugation type
        if (!conjugatedWord) {
            return this.generatePracticeCard(allowedForms, allowedTypes);
        }
        
        // Get the pattern used for display
        const form = this.verbForms[randomForm];
        let pattern = form.patterns[randomType];
        
        // Handle Form I pattern selection for display - use generic display pattern if available
        if (randomForm === 1 && typeof pattern === 'object') {
            // For answer display, prefer the generic 'display' pattern to show that vowel varies
            if (pattern['display'] && (randomType === 'perfect' || randomType === 'imperfect' || randomType === 'imperative')) {
                pattern = pattern['display'];
            } else {
                // For other types or if no display pattern, use the specific vowel pattern
                pattern = this.selectFormIPattern(randomType, pattern, randomRoot);
            }
        }
        
        return {
            question: {
                word: conjugatedWord,
                arabic: conjugatedWord
            },
            answer: {
                root: root,
                rootDisplay: root.join('-'),
                form: randomForm,
                formName: form.name,
                formDescription: form.description,
                type: randomType,
                typeName: this.typeNames[randomType],
                pattern: pattern,
                meaning: randomRoot[3] // The meaning from our root data
            }
        };
    }

    /**
     * Get form information by number
     * @param {number} formNumber - Form number (1-10)
     * @returns {Object} - Form information
     */
    getFormInfo(formNumber) {
        return this.verbForms[formNumber] || null;
    }

    /**
     * Get all available verb forms
     * @returns {Object} - All verb forms
     */
    getAllForms() {
        return this.verbForms;
    }

    /**
     * Validate if a root array is valid Arabic letters
     * @param {Array} root - Array of potential Arabic letters
     * @returns {boolean} - True if valid
     */
    isValidRoot(root) {
        if (!Array.isArray(root) || root.length !== 3) {
            return false;
        }
        
        // Basic check - could be enhanced with proper Arabic letter validation
        return root.every(letter => 
            typeof letter === 'string' && 
            letter.length === 1 && 
            letter.match(/[\u0600-\u06FF]/) // Arabic Unicode range
        );
    }

    /**
     * Get example words for a specific form
     * @param {number} formNumber - Form number
     * @param {string} type - Conjugation type
     * @returns {Array} - Array of example words
     */
    getExamples(formNumber, type) {
        const examples = [];
        const sampleRoots = this.commonRoots.slice(0, 5); // Take first 5 roots
        
        for (const rootData of sampleRoots) {
            const root = rootData.slice(0, 3);
            try {
                const conjugations = this.generateConjugations(root, formNumber, rootData);
                if (conjugations.conjugations[type]) {
                    examples.push({
                        word: conjugations.conjugations[type],
                        root: root.join('-'),
                        meaning: rootData[3]
                    });
                }
            } catch (error) {
                continue; // Skip invalid combinations
            }
        }
        
        return examples;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArabicVerbEngine;
} else {
    window.ArabicVerbEngine = ArabicVerbEngine;
}