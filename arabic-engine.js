/**
 * Arabic Verb Conjugation Engine
 * Implements the 10 Arabic verb forms (measures) with their conjugation patterns
 */

class ArabicVerbEngine {
    constructor() {
        // Define common Arabic roots for practice
        // Format: [root1, root2, root3, meaning, perfect_vowel, imperfect_vowel]
        this.commonRoots = [
            // Basic verbs
            ['ف', 'ع', 'ل', 'to do', 'فَتحة', 'ضَمّة'], // فَعَلَ - يَفْعُلُ
            ['ك', 'ت', 'ب', 'to write', 'فَتحة', 'ضَمّة'], // كَتَبَ - يَكْتُبُ
            ['ق', 'ر', 'أ', 'to read', 'فَتحة', 'فَتحة'], // قَرَأَ - يَقْرَأُ
            ['د', 'ر', 'س', 'to study', 'فَتحة', 'ضَمّة'], // دَرَسَ - يَدْرُسُ
            ['ع', 'م', 'ل', 'to work', 'كَسرة', 'فَتحة'], // عَمِلَ - يَعْمَلُ
            
            // Movement verbs
            ['خ', 'ر', 'ج', 'to go out', 'فَتحة', 'ضَمّة'], // خَرَجَ - يَخْرُجُ
            ['د', 'خ', 'ل', 'to enter', 'فَتحة', 'ضَمّة'], // دَخَلَ - يَدْخُلُ
            ['ج', 'ل', 'س', 'to sit', 'فَتحة', 'كَسرة'], // جَلَسَ - يَجْلِسُ
            ['ر', 'ج', 'ع', 'to return', 'فَتحة', 'كَسرة'], // رَجَعَ - يَرْجِعُ
            ['ذ', 'ه', 'ب', 'to go', 'فَتحة', 'فَتحة'], // ذَهَبَ - يَذْهَبُ
            ['ج', 'ي', 'ء', 'to come', 'فَتحة', 'كَسرة'], // جَاءَ - يَجِيءُ
            ['م', 'ش', 'ي', 'to walk', 'فَتحة', 'كَسرة'], // مَشَى - يَمْشِي
            ['ر', 'ك', 'ب', 'to ride', 'كَسرة', 'فَتحة'], // رَكِبَ - يَرْكَبُ
            ['ن', 'ز', 'ل', 'to descend', 'فَتحة', 'كَسرة'], // نَزَلَ - يَنْزِلُ
            ['ص', 'ع', 'د', 'to ascend', 'كَسرة', 'فَتحة'], // صَعِدَ - يَصْعَدُ
            
            // Action verbs
            ['ن', 'ص', 'ر', 'to help', 'فَتحة', 'ضَمّة'], // نَصَرَ - يَنْصُرُ
            ['ض', 'ر', 'ب', 'to hit', 'فَتحة', 'كَسرة'], // ضَرَبَ - يَضْرِبُ
            ['ق', 'ط', 'ع', 'to cut', 'فَتحة', 'فَتحة'], // قَطَعَ - يَقْطَعُ
            ['ج', 'م', 'ع', 'to gather', 'فَتحة', 'فَتحة'], // جَمَعَ - يَجْمَعُ
            ['ح', 'م', 'ل', 'to carry', 'فَتحة', 'كَسرة'], // حَمَلَ - يَحْمِلُ
            ['ط', 'ل', 'ب', 'to request', 'فَتحة', 'ضَمّة'], // طَلَبَ - يَطْلُبُ
            ['أ', 'خ', 'ذ', 'to take', 'فَتحة', 'ضَمّة'], // أَخَذَ - يَأْخُذُ
            ['و', 'ض', 'ع', 'to put', 'فَتحة', 'فَتحة'], // وَضَعَ - يَضَعُ
            ['ر', 'ف', 'ع', 'to raise', 'فَتحة', 'فَتحة'], // رَفَعَ - يَرْفَعُ
            ['د', 'ف', 'ع', 'to push', 'فَتحة', 'فَتحة'], // دَفَعَ - يَدْفَعُ
            ['س', 'ح', 'ب', 'to pull', 'فَتحة', 'فَتحة'], // سَحَبَ - يَسْحَبُ
            ['ق', 'ذ', 'ف', 'to throw', 'فَتحة', 'كَسرة'], // قَذَفَ - يَقْذِفُ
            
            // Cognitive/Sensory verbs  
            ['ف', 'ه', 'م', 'to understand', 'كَسرة', 'فَتحة'], // فَهِمَ - يَفْهَمُ
            ['س', 'م', 'ع', 'to hear', 'كَسرة', 'فَتحة'], // سَمِعَ - يَسْمَعُ
            ['ع', 'ر', 'ف', 'to know', 'فَتحة', 'كَسرة'], // عَرَفَ - يَعْرِفُ
            ['ر', 'أ', 'ي', 'to see', 'فَتحة', 'فَتحة'], // رَأَى - يَرَى
            ['ع', 'ل', 'م', 'to know', 'كَسرة', 'فَتحة'], // عَلِمَ - يَعْلَمُ
            ['ظ', 'ن', 'ن', 'to think', 'فَتحة', 'ضَمّة'], // ظَنَّ - يَظُنُّ
            ['ذ', 'ك', 'ر', 'to remember', 'فَتحة', 'ضَمّة'], // ذَكَرَ - يَذْكُرُ
            ['ن', 'س', 'ي', 'to forget', 'كَسرة', 'فَتحة'], // نَسِيَ - يَنْسَى
            ['ح', 'س', 'ب', 'to think/calculate', 'كَسرة', 'فَتحة'], // حَسِبَ - يَحْسَبُ
            
            // Communication verbs
            ['ق', 'و', 'ل', 'to say', 'فَتحة', 'ضَمّة'], // قَالَ - يَقُولُ
            ['ك', 'ل', 'م', 'to speak', 'فَتحة', 'كَسرة'], // كَلَّمَ - يُكَلِّمُ
            ['س', 'أ', 'ل', 'to ask', 'فَتحة', 'فَتحة'], // سَأَلَ - يَسْأَلُ
            ['ج', 'و', 'ب', 'to answer', 'فَتحة', 'كَسرة'], // جَاوَبَ - يُجَاوِبُ
            ['ن', 'د', 'ي', 'to call', 'فَتحة', 'كَسرة'], // نَادَى - يُنَادِي
            ['ص', 'ر', 'خ', 'to shout', 'فَتحة', 'ضَمّة'], // صَرَخَ - يَصْرُخُ
            
            // Daily life verbs
            ['ش', 'ر', 'ب', 'to drink', 'كَسرة', 'فَتحة'], // شَرِبَ - يَشْرَبُ
            ['أ', 'ك', 'ل', 'to eat', 'فَتحة', 'ضَمّة'], // أَكَلَ - يَأْكُلُ
            ['ن', 'و', 'م', 'to sleep', 'فَتحة', 'فَتحة'], // نَامَ - يَنَامُ
            ['ق', 'و', 'م', 'to stand', 'فَتحة', 'ضَمّة'], // قَامَ - يَقُومُ
            ['ل', 'ب', 'س', 'to wear', 'كَسرة', 'فَتحة'], // لَبِسَ - يَلْبَسُ
            ['غ', 'س', 'ل', 'to wash', 'فَتحة', 'كَسرة'], // غَسَلَ - يَغْسِلُ
            ['ط', 'ب', 'خ', 'to cook', 'فَتحة', 'ضَمّة'], // طَبَخَ - يَطْبُخُ
            ['ف', 'ت', 'ح', 'to open', 'فَتحة', 'فَتحة'], // فَتَحَ - يَفْتَحُ
            ['غ', 'ل', 'ق', 'to close', 'فَتحة', 'كَسرة'], // غَلَقَ - يَغْلِقُ
            ['ر', 'ق', 'د', 'to sleep', 'فَتحة', 'ضَمّة'], // رَقَدَ - يَرْقُدُ
            
            // Emotional/State verbs
            ['ح', 'ب', 'ب', 'to love', 'فَتحة', 'كَسرة'], // حَبَّ - يُحِبُّ
            ['ك', 'ر', 'ه', 'to hate', 'كَسرة', 'فَتحة'], // كَرِهَ - يَكْرَهُ
            ['خ', 'و', 'ف', 'to fear', 'فَتحة', 'فَتحة'], // خَافَ - يَخَافُ
            ['ف', 'ر', 'ح', 'to be happy', 'كَسرة', 'فَتحة'], // فَرِحَ - يَفْرَحُ
            ['ح', 'ز', 'ن', 'to be sad', 'كَسرة', 'فَتحة'], // حَزِنَ - يَحْزَنُ
            ['غ', 'ض', 'ب', 'to be angry', 'كَسرة', 'فَتحة'], // غَضِبَ - يَغْضَبُ
            ['ر', 'ض', 'ي', 'to be pleased', 'كَسرة', 'فَتحة'], // رَضِيَ - يَرْضَى
            
            // Distance/Position verbs
            ['ب', 'ع', 'د', 'to be far', 'كَسرة', 'فَتحة'], // بَعِدَ - يَبْعَدُ
            ['ق', 'ر', 'ب', 'to be near', 'كَسرة', 'فَتحة'], // قَرِبَ - يَقْرَبُ
            ['و', 'ص', 'ل', 'to arrive', 'فَتحة', 'كَسرة'], // وَصَلَ - يَصِلُ
            ['ب', 'د', 'أ', 'to begin', 'فَتحة', 'فَتحة'], // بَدَأَ - يَبْدَأُ
            ['ا', 'ن', 'ت', 'to end', 'فَتحة', 'كَسرة'], // اِنْتَهَى - يَنْتَهِي
            
            // Time/Weather verbs
            ['ط', 'ل', 'ع', 'to rise (sun)', 'فَتحة', 'فَتحة'], // طَلَعَ - يَطْلَعُ
            ['غ', 'ر', 'ب', 'to set (sun)', 'فَتحة', 'ضَمّة'], // غَرَبَ - يَغْرُبُ
            ['م', 'ط', 'ر', 'to rain', 'فَتحة', 'ضَمّة'], // مَطَرَ - يَمْطُرُ
            
            // Business/Transaction verbs
            ['ب', 'ي', 'ع', 'to sell', 'فَتحة', 'كَسرة'], // بَاعَ - يَبِيعُ
            ['ش', 'ر', 'ي', 'to buy', 'فَتحة', 'كَسرة'], // شَرَى - يَشْرِي
            ['د', 'ف', 'ع', 'to pay', 'فَتحة', 'فَتحة'], // دَفَعَ - يَدْفَعُ
            ['ر', 'ب', 'ح', 'to profit', 'كَسرة', 'فَتحة'], // رَبِحَ - يَرْبَحُ
            ['خ', 'س', 'ر', 'to lose', 'كَسرة', 'فَتحة'], // خَسِرَ - يَخْسَرُ
            
            // Creative/Making verbs
            ['ص', 'ن', 'ع', 'to make', 'فَتحة', 'فَتحة'], // صَنَعَ - يَصْنَعُ
            ['ب', 'ن', 'ي', 'to build', 'فَتحة', 'كَسرة'], // بَنَى - يَبْنِي
            ['ر', 'س', 'م', 'to draw', 'فَتحة', 'ضَمّة'], // رَسَمَ - يَرْسُمُ
            ['غ', 'ن', 'ي', 'to sing', 'فَتحة', 'كَسرة'], // غَنَّى - يُغَنِّي
            ['ر', 'ق', 'ص', 'to dance', 'فَتحة', 'ضَمّة'], // رَقَصَ - يَرْقُصُ
            
            // Learning/Teaching verbs
            ['ت', 'ع', 'ل', 'to learn', 'فَتحة', 'كَسرة'], // تَعَلَّمَ - يَتَعَلَّمُ
            ['ع', 'ل', 'م', 'to teach', 'فَتحة', 'كَسرة'], // عَلَّمَ - يُعَلِّمُ
            ['ح', 'ف', 'ظ', 'to memorize', 'كَسرة', 'فَتحة'], // حَفِظَ - يَحْفَظُ
            
            // Sports/Games verbs
            ['ل', 'ع', 'ب', 'to play', 'كَسرة', 'فَتحة'], // لَعِبَ - يَلْعَبُ
            ['ج', 'ر', 'ي', 'to run', 'فَتحة', 'كَسرة'], // جَرَى - يَجْرِي
            ['س', 'ب', 'ح', 'to swim', 'فَتحة', 'فَتحة'], // سَبَحَ - يَسْبَحُ
            ['ق', 'ف', 'ز', 'to jump', 'فَتحة', 'كَسرة'], // قَفَزَ - يَقْفِزُ
            
            // Social verbs
            ['ز', 'و', 'ر', 'to visit', 'فَتحة', 'ضَمّة'], // زَارَ - يَزُورُ
            ['ل', 'ق', 'ي', 'to meet', 'كَسرة', 'فَتحة'], // لَقِيَ - يَلْقَى
            ['ص', 'د', 'ق', 'to believe', 'فَتحة', 'كَسرة'], // صَدَقَ - يَصْدِقُ
            ['ك', 'ذ', 'ب', 'to lie', 'فَتحة', 'كَسرة'], // كَذَبَ - يَكْذِبُ
            ['ث', 'ق', 'ل', 'to be heavy', 'فَتحة', 'ضَمّة'], // ثَقُلَ - يَثْقُلُ
            ['خ', 'ف', 'ف', 'to be light', 'فَتحة', 'كَسرة'] // خَفَّ - يَخِفُّ
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
    generatePracticeCard(allowedForms, allowedTypes) {
        // Select random root
        const randomRoot = this.commonRoots[Math.floor(Math.random() * this.commonRoots.length)];
        const root = randomRoot.slice(0, 3); // Take only the 3 letters, not the meaning
        
        // Select random form from allowed forms
        const randomForm = allowedForms[Math.floor(Math.random() * allowedForms.length)];
        
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