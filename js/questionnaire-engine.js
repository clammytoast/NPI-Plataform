class NPIQuestionnaire {
    constructor() {
        this.currentSection = 0;
        this.currentQuestion = 0;
        this.responses = {};
        this.sections = [];
        
        this.loadQuestionnaireData();
    }

    async loadQuestionnaireData() {
        console.log('📥 Loading questionnaire data...');
        try {
            // Try multiple paths for GitHub Pages compatibility
            const possiblePaths = [
                './data/questions.json',
                '/data/questions.json', 
                'data/questions.json',
                './npi-profiler/data/questions.json'
            ];
            
            let data = null;
            for (const path of possiblePaths) {
                try {
                    console.log(`🔍 Trying path: ${path}`);
                    const response = await fetch(path);
                    if (response.ok) {
                        data = await response.json();
                        console.log('✅ Loaded questions from:', path);
                        break;
                    }
                } catch (e) {
                    console.log('❌ Failed to load from:', path);
                    continue;
                }
            }
            
            if (data && data.sections) {
                this.sections = data.sections;
                console.log(`✅ Loaded ${this.sections.length} sections with ${this.getTotalQuestions()} total questions`);
            } else {
                console.log('⚠️ Using fallback questions');
                this.loadFallbackQuestions();
            }
        } catch (error) {
            console.error('❌ Failed to load questionnaire data:', error);
            this.loadFallbackQuestions();
        }
    }

    loadFallbackQuestions() {
        // Embedded basic questions as fallback
        this.sections = [
            {
                id: "developmental_history",
                name: "Life Experiences & Development", 
                description: "These questions explore your early formative experiences and how they shaped your fundamental sense of safety and understanding.",
                questions: [
                    {
                        id: "early_childhood_moments",
                        text: "When you think back to your early childhood, what moments stand out the most emotionally?",
                        type: "text",
                        maxLength: 1500,
                        placeholder: "Describe the moments that feel most significant, whether happy, scary, confusing, or comforting..."
                    },
                    {
                        id: "childhood_safety", 
                        text: "Can you describe a time when you felt very safe or very unsafe as a child?",
                        type: "text",
                        maxLength: 1200,
                        placeholder: "What was happening? Who was there? How did your body feel?"
                    }
                ]
            },
            {
                id: "personality_assessment",
                name: "Core Personality Assessment",
                description: "Scientific personality assessment to map your fundamental traits and tendencies.",
                questions: [
                    {
                        id: "big5_openness",
                        text: "How open are you to new experiences, ideas, and unconventional thinking?",
                        type: "scale",
                        min: 1,
                        max: 10,
                        minLabel: "Very Traditional",
                        maxLabel: "Very Adventurous"
                    },
                    {
                        id: "big5_conscientiousness",
                        text: "How organized, disciplined, and reliable are you?",
                        type: "scale",
                        min: 1,
                        max: 10,
                        minLabel: "Very Spontaneous", 
                        maxLabel: "Very Organized"
                    }
                ]
            }
        ];
        
        console.log(`✅ Fallback loaded: ${this.sections.length} sections`);
    }

    getCurrentSection() {
        return this.sections[this.currentSection];
    }

    getCurrentQuestion() {
        const section = this.getCurrentSection();
        return section ? section.questions[this.currentQuestion] : null;
    }

    getTotalQuestions() {
        return this.sections.reduce((total, section) => total + section.questions.length, 0);
    }

    getAnsweredCount() {
        return Object.keys(this.responses).length;
    }

    getProgress() {
        const total = this.getTotalQuestions();
        return total > 0 ? (this.getAnsweredCount() / total) * 100 : 0;
    }

    saveResponse(questionId, response) {
        this.responses[questionId] = {
            value: response,
            timestamp: new Date().toISOString(),
            section: this.sections[this.currentSection].id
        };
    }

    nextQuestion() {
        const currentSection = this.sections[this.currentSection];
        
        if (this.currentQuestion < currentSection.questions.length - 1) {
            this.currentQuestion++;
            return true;
        } else if (this.currentSection < this.sections.length - 1) {
            this.currentSection++;
            this.currentQuestion = 0;
            return true;
        }
        return false; // Questionnaire complete
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            return true;
        } else if (this.currentSection > 0) {
            this.currentSection--;
            this.currentQuestion = this.sections[this.currentSection].questions.length - 1;
            return true;
        }
        return false; // At the beginning
    }

    isComplete() {
        return this.getAnsweredCount() >= this.getTotalQuestions();
    }

    getAllResponses() {
        return this.responses;
    }
}
