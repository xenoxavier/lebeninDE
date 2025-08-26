class LebenInDeutschlandQuiz {
    constructor() {
        this.allQuestions = []; // Will be loaded from JSON
        this.questions = []; // Current quiz questions
        this.quizMode = 'practice'; // 'practice', 'exam', 'all'
        this.showCorrectAnswer = false;
        
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.isQuizActive = false;
        this.achievements = {
            'first-question': false,
            'streak-5': false,
            'half-way': false,
            'perfect-score': false
        };
        this.currentStreak = 0;
        
        // Dashboard data
        this.userProfile = {
            name: 'Student',
            avatar: '🇩🇪',
            totalSessions: 0,
            studyTimeMinutes: 0,
            successRate: 0,
            totalQuestionsAnswered: 0,
            averageAnswerTime: 0,
            bestStreak: 0,
            daysStudied: 0,
            lastStudyDate: null
        };
        
        this.quizHistory = [];
        this.studyStreak = 0;
        this.weakAreas = {
            'Politik in der Demokratie': { correct: 0, total: 0 },
            'Geschichte und Verantwortung': { correct: 0, total: 0 },
            'Mensch und Gesellschaft': { correct: 0, total: 0 }
        };
        
        this.bundeslandQuestions = {}; // Will store state-specific questions
        
        // Load fallback questions immediately so quiz always works
        console.log('Loading fallback questions in constructor...');
        this.loadFallbackQuestions();
        console.log(`Constructor: Loaded ${this.allQuestions.length} fallback questions`);
        
        this.init();
    }
    
    async init() {
        // Try to load questions from JSON, but fallback is already loaded
        await this.loadQuestions();
        
        console.log(`Quiz initialized with ${this.allQuestions.length} questions`);
        
        this.loadUserData();
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupThemeToggle();
        this.setupScrollAnimations();
        this.setupParticleSystem();
        this.setupScrollIndicator();
        this.setupSoundEffects();
        this.setupMagneticEffects();
        this.setupDashboard();
    }
    
    async loadQuestions() {
        // We already have fallback questions loaded, try to upgrade to JSON questions
        const fallbackCount = this.allQuestions.length;
        console.log(`Starting with ${fallbackCount} fallback questions`);
        
        try {
            console.log('Attempting to load questions from fragen/questions-working.json');
            const response = await fetch('fragen/questions-working.json');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            // Get the text content first to examine it
            const textContent = await response.text();
            console.log('Raw text length:', textContent.length);
            
            if (textContent.length === 0) {
                throw new Error('File is empty');
            }
            
            console.log('First 200 chars:', textContent.substring(0, 200));
            console.log('Last 200 chars:', textContent.substring(textContent.length - 200));
            
            // Try to parse JSON with better error reporting
            let data;
            try {
                data = JSON.parse(textContent);
                console.log('JSON parsed successfully');
            } catch (jsonError) {
                console.error('JSON parsing failed:', jsonError);
                console.error('Error at position:', jsonError.message);
                // Try to find problematic characters
                const lines = textContent.split('\n');
                console.log('Total lines:', lines.length);
                throw new Error(`JSON Parse Error: ${jsonError.message}`);
            }
            
            console.log('Data structure:', typeof data, data ? Object.keys(data) : 'null');
            
            if (!data) {
                throw new Error('Parsed data is null or undefined');
            }
            
            // Handle both array format and object format
            let questionArray;
            if (Array.isArray(data)) {
                // Direct array format
                questionArray = data;
                console.log(`Found ${questionArray.length} questions in direct array format`);
            } else if (data.questions && Array.isArray(data.questions)) {
                // Object with questions property
                questionArray = data.questions;
                console.log(`Found ${questionArray.length} questions in object format`);
            } else {
                throw new Error(`No valid questions found. Data type: ${typeof data}`);
            }
            
            console.log('Sample question structure:', questionArray[0]);
            
            // Validate and convert questions
            const jsonQuestions = [];
            let validQuestions = 0;
            
            for (let index = 0; index < questionArray.length; index++) {
                const q = questionArray[index];
                
                // Validate question structure
                if (!q.question || typeof q.question !== 'string') {
                    console.warn(`Question ${index + 1} missing or invalid 'question' field:`, q);
                    continue;
                }
                
                if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
                    console.warn(`Question ${index + 1} missing or invalid 'options' field:`, q);
                    continue;
                }
                
                if (!q.answer || typeof q.answer !== 'string') {
                    console.warn(`Question ${index + 1} missing or invalid 'answer' field:`, q);
                    continue;
                }
                
                // Find correct answer index
                const correctIndex = q.options.findIndex(option => option === q.answer);
                if (correctIndex === -1) {
                    console.warn(`Question ${index + 1} answer "${q.answer}" not found in options:`, q.options);
                    continue;
                }
                
                // Valid question, convert it
                jsonQuestions.push({
                    id: q.number || q.id || index + 1,
                    question: q.question,
                    options: q.options,
                    correct: correctIndex
                });
                validQuestions++;
            }
            
            if (jsonQuestions.length === 0) {
                throw new Error('No valid questions found in JSON file');
            }
            
            // Successfully loaded from JSON, replace fallback questions
            this.allQuestions = jsonQuestions;
            console.log(`Successfully upgraded to ${this.allQuestions.length} valid questions from JSON file`);
            console.log(`${validQuestions} valid out of ${questionArray.length} total questions`);
            console.log('First converted question:', this.allQuestions[0]);
            
        } catch (error) {
            console.error('Failed to load questions from JSON file:', error);
            console.log(`Continuing with ${fallbackCount} fallback questions`);
            // Keep the fallback questions that are already loaded
        }
        
        console.log(`Final question count: ${this.allQuestions.length}`);
    }
    
    loadFallbackQuestions() {
        console.log('loadFallbackQuestions() called');
        // Provide more comprehensive fallback questions
        this.allQuestions = [
            {
                id: 1,
                question: "Was ist ein Rechtsstaat?",
                options: [
                    "Ein Staat, in dem es nur rechte politische Parteien gibt",
                    "Ein Staat, in dem die Bürger über das Recht entscheiden",
                    "Ein Staat, in dem alle Bürger und Institutionen vor dem Gesetz gleich sind",
                    "Ein Staat, in dem nur das Parlament Gesetze beschließen darf"
                ],
                correct: 2
            },
            {
                id: 2,
                question: "Was steht nicht im Grundgesetz von Deutschland?",
                options: [
                    "Die Würde des Menschen ist unantastbar",
                    "Alle Menschen sind vor dem Gesetz gleich",
                    "Die Bundesrepublik Deutschland ist ein sozialer Bundesstaat",
                    "Alle Bürger haben das Recht auf Arbeit"
                ],
                correct: 3
            },
            {
                id: 3,
                question: "Welches Recht gehört zu den Grundrechten in Deutschland?",
                options: [
                    "Waffenbesitz",
                    "Faustrecht",
                    "Meinungsfreiheit",
                    "Selbstjustiz"
                ],
                correct: 2
            },
            {
                id: 4,
                question: "Was bedeutet „Volkssouveränität"?",
                options: [
                    "Der König herrscht über das Volk",
                    "Das Bundesverfassungsgericht steht über der Verfassung",
                    "Das Volk wählt den Bundespräsidenten direkt",
                    "Alle Staatsgewalt geht vom Volke aus"
                ],
                correct: 3
            },
            {
                id: 5,
                question: "Was ist Deutschland?",
                options: [
                    "Eine Monarchie",
                    "Ein Bundesstaat",
                    "Eine Diktatur",
                    "Eine Kolonie"
                ],
                correct: 1
            }
        ];
        
        // Create additional sample questions to reach a reasonable number for testing
        for (let i = 6; i <= 50; i++) {
            this.allQuestions.push({
                id: i,
                question: `Beispielfrage ${i}: Welche Aussage über Deutschland ist korrekt?`,
                options: [
                    "Option A - Erste Antwortmöglichkeit",
                    "Option B - Zweite Antwortmöglichkeit", 
                    "Option C - Dritte Antwortmöglichkeit",
                    "Option D - Vierte Antwortmöglichkeit"
                ],
                correct: Math.floor(Math.random() * 4) // Random correct answer for demo
            });
        }
        
        console.log(`Generated ${this.allQuestions.length} fallback questions`);
        console.log('First fallback question:', this.allQuestions[0]);
        console.log('Last fallback question:', this.allQuestions[this.allQuestions.length - 1]);
        console.log(`loadFallbackQuestions() completed successfully`);
    }
    
    setupEventListeners() {
        // CTA Buttons (only buttons, not links)
        const ctaButtons = document.querySelectorAll('button.cta-primary, button.cta-button, button.cta-nav-btn, button.cta-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.startQuiz();
            });
        });
        
        // Navigation links (only internal anchor links)
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.scrollToSection(href);
                });
            }
        });
        
        // Quiz controls
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevQuestion());
    }
    
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Add fade-in class to sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });
        
        // Animate hero stats
        const stats = document.querySelectorAll('.hero-stats .stat-number');
        stats.forEach(stat => {
            observer.observe(stat);
            stat.addEventListener('intersectionChange', () => {
                if (stat.classList.contains('visible')) {
                    this.animateCounter(stat);
                }
            });
        });
    }
    
    animateCounter(element) {
        const text = element.textContent;
        const target = parseInt(text.replace(/[^\d]/g, ''));
        if (isNaN(target)) return;
        
        const suffix = text.replace(/[\d]/g, '');
        const duration = 2000;
        const start = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * progress);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Quiz Mode Management
    setQuizMode(mode) {
        this.quizMode = mode;
        
        // Update mode display
        const modeInfo = document.getElementById('current-mode');
        const modeButtons = document.querySelectorAll('.mode-btn, .mode-btn-compact');
        
        // Reset button states
        modeButtons.forEach(btn => btn.classList.remove('active'));
        
        switch (mode) {
            case 'practice':
                // All questions available for practice
                this.questions = [...this.allQuestions];
                this.showCorrectAnswer = true;
                if (modeInfo) modeInfo.textContent = 'Practice Mode: All Questions with Answers';
                document.querySelectorAll('[data-mode="practice"]').forEach(btn => btn.classList.add('active'));
                break;
                
            case 'exam':
                // Random 33 questions for official exam simulation
                this.questions = this.getRandomQuestions(33);
                this.showCorrectAnswer = true; // User requested to see correct answers
                if (modeInfo) modeInfo.textContent = 'Exam Mode: 33 Random Questions';
                document.querySelectorAll('[data-mode="exam"]').forEach(btn => btn.classList.add('active'));
                break;
                
            case 'all':
            case 'review':
                // All 300 questions for complete practice (review mode)
                this.questions = [...this.allQuestions];
                this.showCorrectAnswer = true;
                if (modeInfo) modeInfo.textContent = 'Review Mode: Study All Questions';
                document.querySelectorAll('[data-mode="all"], [data-mode="review"]').forEach(btn => btn.classList.add('active'));
                break;
                
            case 'bundesland':
                // Bundesland-specific questions (already loaded)
                this.showCorrectAnswer = true;
                const stateName = this.currentBundesland || 'Selected State';
                if (modeInfo) modeInfo.textContent = `${stateName}: State-Specific Questions`;
                break;
                
            default:
                this.questions = this.allQuestions.slice(0, 10);
                this.showCorrectAnswer = true;
                if (modeInfo) modeInfo.textContent = 'Practice Mode: 10 Questions with Answers';
        }
        
        // Reset quiz state
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        
        console.log(`Quiz mode set to: ${mode}, Questions: ${this.questions.length}`);
    }
    
    getRandomQuestions(count) {
        const shuffled = [...this.allQuestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    startQuiz(mode = 'practice') {
        // Always redirect to quiz page for consistent experience
        window.location.href = `quiz.html?mode=${mode}`;
    }
    
    // New method for dedicated quiz page
    startQuizPage(mode = 'practice') {
        console.log(`Starting quiz page with mode: ${mode}`);
        console.log(`Available questions before setQuizMode: ${this.allQuestions.length}`);
        
        this.setQuizMode(mode);
        
        console.log(`Questions after setQuizMode: ${this.questions.length}`);
        
        if (this.questions.length === 0) {
            console.error('No questions available after setQuizMode!');
            return;
        }
        
        this.isQuizActive = true;
        this.currentQuestion = 0; // Ensure we start at question 0
        this.quizStartTime = Date.now();
        this.setupQuizPageLayout(mode);
        this.updateQuestionNavigation();
        this.loadQuestion();
        this.updateProgress();
        
        console.log(`Quiz started successfully with ${this.questions.length} questions`);
    }
    
    setupQuizPageLayout(mode) {
        // Update quiz page header based on mode
        const quizTitle = document.getElementById('quiz-title');
        const quizSubtitle = document.getElementById('quiz-subtitle');
        const quizBadge = document.getElementById('quiz-badge');
        const badgeIcon = document.getElementById('badge-icon');
        const badgeText = document.getElementById('badge-text');
        const examInfoPanel = document.getElementById('exam-info-panel');
        const timerDisplay = document.getElementById('timer-display');
        const passRequirement = document.getElementById('pass-requirement');
        const passScore = document.getElementById('pass-score');
        const performanceIndicator = document.getElementById('performance-indicator');
        const correctLegend = document.getElementById('correct-legend');
        const incorrectLegend = document.getElementById('incorrect-legend');
        const remainingStat = document.getElementById('remaining-stat');
        
        // Show/hide correct/incorrect legends based on mode
        if (this.showCorrectAnswer) {
            if (correctLegend) correctLegend.style.display = 'flex';
            if (incorrectLegend) incorrectLegend.style.display = 'flex';
        }
        
        switch (mode) {
            case 'practice':
                if (quizTitle) quizTitle.textContent = 'Practice Quiz';
                if (quizSubtitle) quizSubtitle.textContent = 'Practice all questions with instant feedback and explanations';
                if (quizBadge) {
                    quizBadge.style.display = 'inline-flex';
                    badgeIcon.textContent = '📚';
                    badgeText.textContent = 'Practice Mode';
                }
                if (remainingStat) remainingStat.style.display = 'block';
                if (examInfoPanel) this.setupPracticeInfo(examInfoPanel);
                break;
                
            case 'exam':
                if (quizTitle) quizTitle.textContent = 'Official Exam Simulation';
                if (quizSubtitle) quizSubtitle.textContent = 'Complete 33 questions to pass the citizenship test';
                if (quizBadge) {
                    quizBadge.style.display = 'inline-flex';
                    badgeIcon.textContent = '📝';
                    badgeText.textContent = 'Exam Simulation';
                }
                if (passRequirement) {
                    passRequirement.style.display = 'flex';
                    passScore.textContent = '17/33';
                }
                if (performanceIndicator) performanceIndicator.style.display = 'block';
                if (remainingStat) remainingStat.style.display = 'block';
                if (examInfoPanel) this.setupExamInfo(examInfoPanel);
                break;
                
            case 'all':
            case 'review':
                if (quizTitle) quizTitle.textContent = 'Review Mode';
                if (quizSubtitle) quizSubtitle.textContent = 'Study all 300 questions with detailed focus';
                if (quizBadge) {
                    quizBadge.style.display = 'inline-flex';
                    badgeIcon.textContent = '📖';
                    badgeText.textContent = 'Study Mode';
                }
                if (remainingStat) remainingStat.style.display = 'block';
                if (examInfoPanel) this.setupReviewInfo(examInfoPanel);
                break;
                
            case 'bundesland':
                const stateName = this.currentBundesland || 'Bundesland';
                if (quizTitle) quizTitle.textContent = `${stateName} Quiz`;
                if (quizSubtitle) quizSubtitle.textContent = `State-specific questions for ${stateName}`;
                if (quizBadge) {
                    quizBadge.style.display = 'inline-flex';
                    badgeIcon.textContent = '🏛️';
                    badgeText.textContent = 'State Quiz';
                }
                if (examInfoPanel) this.setupBundeslandInfo(examInfoPanel, stateName);
                break;
        }
    }
    
    setupPracticeInfo(panel) {
        panel.style.display = 'block';
        const instructionList = document.getElementById('instruction-list');
        if (instructionList) {
            instructionList.innerHTML = `
                <li>Practice all 300 questions at your own pace</li>
                <li>See correct answers immediately after selection</li>
                <li>Review explanations for better understanding</li>
                <li>Navigate freely between questions</li>
                <li>No time limit - focus on learning</li>
            `;
        }
        
        const topicPanel = document.getElementById('exam-topics');
        if (topicPanel) {
            topicPanel.style.display = 'block';
            const topicList = document.getElementById('topic-list');
            if (topicList) {
                topicList.innerHTML = `
                    <span class="topic-tag">Politics & Democracy</span>
                    <span class="topic-tag">History & Responsibility</span>
                    <span class="topic-tag">People & Society</span>
                `;
            }
        }
    }
    
    setupExamInfo(panel) {
        panel.style.display = 'block';
        const instructionList = document.getElementById('instruction-list');
        if (instructionList) {
            instructionList.innerHTML = `
                <li>Complete 33 randomly selected questions</li>
                <li>Need 17 correct answers to pass (52%)</li>
                <li>See answers immediately (practice feature)</li>
                <li>Navigate between questions freely</li>
                <li>Track your performance in real-time</li>
            `;
        }
        
        const topicPanel = document.getElementById('exam-topics');
        if (topicPanel) {
            topicPanel.style.display = 'block';
            const topicList = document.getElementById('topic-list');
            if (topicList) {
                topicList.innerHTML = `
                    <span class="topic-tag">Politics in Democracy</span>
                    <span class="topic-tag">History & Responsibility</span>
                    <span class="topic-tag">People & Society</span>
                    <span class="topic-tag">Random Selection</span>
                `;
            }
        }
    }
    
    setupReviewInfo(panel) {
        panel.style.display = 'block';
        const instructionList = document.getElementById('instruction-list');
        if (instructionList) {
            instructionList.innerHTML = `
                <li>Study all 300 official test questions</li>
                <li>Detailed review with comprehensive feedback</li>
                <li>Navigate between questions for thorough study</li>
                <li>Focus on understanding each topic</li>
                <li>Perfect for comprehensive exam preparation</li>
            `;
        }
        
        const topicPanel = document.getElementById('exam-topics');
        if (topicPanel) {
            topicPanel.style.display = 'block';
            const topicList = document.getElementById('topic-list');
            if (topicList) {
                topicList.innerHTML = `
                    <span class="topic-tag">Comprehensive Review</span>
                    <span class="topic-tag">All Topics</span>
                    <span class="topic-tag">Study Mode</span>
                `;
            }
        }
    }
    
    setupBundeslandInfo(panel, stateName) {
        panel.style.display = 'block';
        const instructionList = document.getElementById('instruction-list');
        if (instructionList) {
            instructionList.innerHTML = `
                <li>Practice questions specific to ${stateName}</li>
                <li>Learn about your state's geography and politics</li>
                <li>Essential for state-specific exam section</li>
                <li>Covers local government and landmarks</li>
                <li>Instant feedback on all questions</li>
            `;
        }
        
        const bundeslandInfoPanel = document.getElementById('bundesland-info');
        if (bundeslandInfoPanel) {
            bundeslandInfoPanel.style.display = 'block';
            const stateDetails = document.getElementById('state-details');
            if (stateDetails) {
                // Get state capital from our data
                const stateCapitals = {
                    'Baden-Württemberg': 'Stuttgart',
                    'Bayern': 'München',
                    'Berlin': 'Berlin',
                    'Brandenburg': 'Potsdam',
                    'Bremen': 'Bremen',
                    'Hamburg': 'Hamburg',
                    'Hessen': 'Wiesbaden',
                    'Mecklenburg-Vorpommern': 'Schwerin',
                    'Niedersachsen': 'Hannover',
                    'Nordrhein-Westfalen': 'Düsseldorf',
                    'Rheinland-Pfalz': 'Mainz',
                    'Saarland': 'Saarbrücken',
                    'Sachsen': 'Dresden',
                    'Sachsen-Anhalt': 'Magdeburg',
                    'Schleswig-Holstein': 'Kiel',
                    'Thüringen': 'Erfurt'
                };
                
                const capital = stateCapitals[stateName] || 'Unknown';
                stateDetails.innerHTML = `
                    <div class="state-detail-item">
                        <span class="state-detail-label">State:</span>
                        <span>${stateName}</span>
                    </div>
                    <div class="state-detail-item">
                        <span class="state-detail-label">Capital:</span>
                        <span>${capital}</span>
                    </div>
                    <div class="state-detail-item">
                        <span class="state-detail-label">Questions:</span>
                        <span>${this.questions.length} available</span>
                    </div>
                `;
            }
        }
    }
    
    restartQuiz() {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode') || 'practice';
        this.startQuizPage(mode);
        
        // Hide results section
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        
        // Show quiz section
        const quizSection = document.querySelector('.quiz-section');
        if (quizSection) {
            quizSection.style.display = 'block';
        }
    }
    
    // Direct question navigation
    jumpToQuestion(questionIndex) {
        if (questionIndex >= 0 && questionIndex < this.questions.length) {
            this.currentQuestion = questionIndex;
            this.loadQuestion();
            this.updateProgress();
            this.updateQuestionNavigation();
        }
    }
    
    // Navigation methods
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.loadQuestion();
            this.updateProgress();
            this.updateQuestionNavigation();
        } else {
            // Last question, finish quiz
            this.finishQuiz();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
            this.updateProgress();
            this.updateQuestionNavigation();
        }
    }
    
    updateQuestionNavigation() {
        const navContainer = document.getElementById('question-navigation');
        if (!navContainer) return;
        
        navContainer.innerHTML = '';
        
        // Ensure we have the correct number of questions loaded
        if (this.questions.length === 0) {
            console.log('No questions loaded yet');
            return;
        }
        
        console.log(`Creating navigation for ${this.questions.length} questions`);
        
        // Create question number buttons - exactly matching the number of questions
        this.questions.forEach((_, index) => {
            const button = document.createElement('button');
            button.className = 'question-nav-btn';
            button.textContent = index + 1;
            button.title = `Go to question ${index + 1}`;
            
            // Add status classes
            if (index === this.currentQuestion) {
                button.classList.add('current');
            }
            if (this.userAnswers[index] !== undefined) {
                button.classList.add('answered');
                if (this.showCorrectAnswer && this.userAnswers[index] === this.questions[index].correct) {
                    button.classList.add('correct');
                } else if (this.showCorrectAnswer && this.userAnswers[index] !== this.questions[index].correct) {
                    button.classList.add('incorrect');
                }
            }
            
            button.addEventListener('click', () => this.jumpToQuestion(index));
            navContainer.appendChild(button);
        });
        
        // Update the question counter display
        const currentSpans = document.querySelectorAll('.current');
        const totalSpans = document.querySelectorAll('.total');
        currentSpans.forEach(span => span.textContent = this.currentQuestion + 1);
        totalSpans.forEach(span => span.textContent = this.questions.length);
    }
    
    loadQuestion() {
        // Check if we have questions loaded
        if (!this.questions || this.questions.length === 0) {
            console.error('No questions loaded!');
            const questionText = document.getElementById('question-text');
            if (questionText) questionText.textContent = 'Error: No questions loaded. Please check the question file.';
            return;
        }
        
        // Check if current question index is valid
        if (this.currentQuestion >= this.questions.length) {
            console.error(`Invalid question index: ${this.currentQuestion} of ${this.questions.length}`);
            this.currentQuestion = 0;
        }
        
        const question = this.questions[this.currentQuestion];
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const currentSpan = document.querySelector('.current');
        const totalSpan = document.querySelector('.total');
        
        // Check if question exists
        if (!question) {
            console.error(`Question ${this.currentQuestion} not found!`);
            if (questionText) questionText.textContent = `Error: Question ${this.currentQuestion + 1} not found`;
            return;
        }
        
        console.log(`Loading question ${this.currentQuestion + 1}:`, question.question);
        
        if (questionText) questionText.textContent = question.question;
        if (currentSpan) currentSpan.textContent = this.currentQuestion + 1;
        if (totalSpan) totalSpan.textContent = this.questions.length;
        
        // Clear previous options and indicators
        this.clearAnswerIndicators();
        
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            // Check if question has options
            if (!question.options || question.options.length === 0) {
                console.error('Question has no options:', question);
                optionsContainer.innerHTML = '<div class="option disabled">Error: No options available</div>';
                return;
            }
            
            console.log(`Creating ${question.options.length} options`);
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.addEventListener('click', () => this.selectOption(index));
                optionsContainer.appendChild(optionElement);
                console.log(`Created option ${index + 1}: ${option}`);
            });
        } else {
            console.error('Options container not found in DOM');
        }
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) prevBtn.disabled = this.currentQuestion === 0;
        if (nextBtn) nextBtn.textContent = this.currentQuestion === this.questions.length - 1 ? 'Beenden' : 'Weiter';
        
        // Restore user's previous selection and answer display if any
        if (this.userAnswers[this.currentQuestion] !== undefined) {
            this.showSelectedOption(this.userAnswers[this.currentQuestion]);
            if (this.showCorrectAnswer) {
                this.showCorrectAnswerIndicator(this.userAnswers[this.currentQuestion]);
            }
        }
    }
    
    selectOption(optionIndex) {
        this.userAnswers[this.currentQuestion] = optionIndex;
        this.showSelectedOption(optionIndex);
        
        // Show correct answer immediately if enabled
        if (this.showCorrectAnswer) {
            this.showCorrectAnswerIndicator(optionIndex);
        }
        
        // Check if answer is correct and update streak
        if (optionIndex === this.questions[this.currentQuestion].correct) {
            this.currentStreak++;
        } else {
            this.currentStreak = 0;
        }
        
        this.updateQuestionNavigation();
        this.checkAchievements();
    }
    
    showCorrectAnswerIndicator(selectedIndex) {
        const options = document.querySelectorAll('.option');
        const correctIndex = this.questions[this.currentQuestion].correct;
        
        options.forEach((option, index) => {
            option.classList.remove('correct-answer', 'wrong-answer');
            
            if (index === correctIndex) {
                option.classList.add('correct-answer');
                option.innerHTML += ' <span class="answer-indicator">✓ Richtig</span>';
            } else if (index === selectedIndex && selectedIndex !== correctIndex) {
                option.classList.add('wrong-answer');
                option.innerHTML += ' <span class="answer-indicator">✗ Falsch</span>';
            }
        });
        
        // Show explanation if available
        this.showAnswerExplanation();
    }
    
    showAnswerExplanation() {
        const explanationDiv = document.getElementById('answer-explanation');
        if (explanationDiv) {
            const question = this.questions[this.currentQuestion];
            const correctOption = question.options[question.correct];
            
            explanationDiv.innerHTML = `
                <div class="explanation-content">
                    <h4>Richtige Antwort:</h4>
                    <p class="correct-answer-text">${correctOption}</p>
                </div>
            `;
            explanationDiv.style.display = 'block';
        }
    }
    
    showSelectedOption(optionIndex) {
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.classList.remove('selected');
            if (index === optionIndex) {
                option.classList.add('selected');
            }
        });
    }
    
    clearAnswerIndicators() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('correct-answer', 'wrong-answer');
            const indicator = option.querySelector('.answer-indicator');
            if (indicator) {
                indicator.remove();
            }
        });
        
        const explanationDiv = document.getElementById('answer-explanation');
        if (explanationDiv) {
            explanationDiv.style.display = 'none';
        }
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.loadQuestion();
            this.updateProgress();
        } else {
            this.finishQuiz();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
            this.updateProgress();
        }
    }
    
    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        const progressText = document.querySelector('.progress-text');
        const progressSubtext = document.getElementById('progress-subtext');
        const progressCircle = document.querySelector('.progress-ring__circle.progress');
        
        if (progressText) progressText.textContent = `${Math.round(progress)}%`;
        
        // Update progress subtext based on mode
        if (progressSubtext) {
            const remaining = this.questions.length - (this.currentQuestion + 1);
            if (remaining === 0) {
                progressSubtext.textContent = 'Complete!';
            } else if (this.quizMode === 'exam') {
                progressSubtext.textContent = `${remaining} questions left`;
            } else {
                progressSubtext.textContent = `Question ${this.currentQuestion + 1}`;
            }
        }
        
        if (progressCircle) {
            const circumference = 2 * Math.PI * 52; // radius is 52
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
        
        // Update current stats
        this.calculateCurrentStats();
        
        // Update performance indicator for exam mode
        if (this.quizMode === 'exam') {
            this.updatePerformanceIndicator();
        }
    }
    
    updatePerformanceIndicator() {
        const statusFill = document.getElementById('status-fill');
        const statusText = document.getElementById('status-text');
        const remainingCount = document.getElementById('remaining-count');
        
        const answeredQuestions = this.userAnswers.filter(answer => answer !== undefined).length;
        const correctAnswers = this.userAnswers.filter((answer, index) => answer === this.questions[index].correct).length;
        const remaining = this.questions.length - answeredQuestions;
        const currentPercentage = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;
        const passThreshold = 51.5; // Need 17 out of 33 = 51.5%
        
        if (remainingCount) {
            remainingCount.textContent = remaining;
        }
        
        if (statusFill && statusText) {
            // Update performance bar
            const fillPercentage = Math.min(100, currentPercentage);
            statusFill.style.width = `${fillPercentage}%`;
            
            // Update color based on performance
            if (currentPercentage >= 80) {
                statusFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
                statusText.textContent = 'Excellent performance! 🌟';
            } else if (currentPercentage >= passThreshold) {
                statusFill.style.background = 'linear-gradient(90deg, #2196F3, #03A9F4)';
                statusText.textContent = 'On track to pass! 👍';
            } else if (answeredQuestions > 0) {
                statusFill.style.background = 'linear-gradient(90deg, #FF9800, #F57C00)';
                statusText.textContent = 'Keep improving! 💪';
            } else {
                statusText.textContent = 'Getting started...';
            }
        }
    }
    
    calculateCurrentStats() {
        let correct = 0;
        let wrong = 0;
        
        this.userAnswers.forEach((answer, index) => {
            if (answer !== undefined) {
                if (answer === this.questions[index].correct) {
                    correct++;
                } else {
                    wrong++;
                }
            }
        });
        
        const correctCount = document.getElementById('correct-count');
        const wrongCount = document.getElementById('wrong-count');
        
        if (correctCount) {
            const prevCorrect = parseInt(correctCount.textContent);
            correctCount.textContent = correct;
            
            // Add celebration effect when correct answers increase
            if (correct > prevCorrect) {
                correctCount.classList.add('sound-success');
                setTimeout(() => correctCount.classList.remove('sound-success'), 800);
            }
        }
        
        if (wrongCount) wrongCount.textContent = wrong;
        
        // Update achievements based on current progress
        this.checkAchievements();
    }
    
    finishQuiz() {
        this.calculateFinalResults();
        this.showResults();
        
        // Check if we're on the dedicated quiz page
        const quizPage = document.getElementById('results');
        if (quizPage) {
            // Hide quiz section and show results
            const quizSection = document.querySelector('.quiz-section');
            if (quizSection) quizSection.style.display = 'none';
            quizPage.style.display = 'block';
            
            // Smooth scroll to results
            quizPage.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Regular dashboard behavior
            this.scrollToSection('#statistics');
        }
        
        // Record quiz session for dashboard
        const timeSpent = Date.now() - (this.quizStartTime || Date.now());
        this.recordQuizSession(this.correctAnswers, this.questions.length, timeSpent);
    }
    
    calculateFinalResults() {
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.correctAnswers++;
            } else {
                this.wrongAnswers++;
            }
        });
    }
    
    showResults() {
        const overallScore = Math.round((this.correctAnswers / this.questions.length) * 100);
        
        // Update statistics display
        const overallScoreEl = document.getElementById('overall-score');
        const totalCorrectEl = document.getElementById('total-correct');
        const totalWrongEl = document.getElementById('total-wrong');
        const averageScoreEl = document.getElementById('average-score');
        
        if (overallScoreEl) overallScoreEl.textContent = `${overallScore}%`;
        if (totalCorrectEl) totalCorrectEl.textContent = this.correctAnswers;
        if (totalWrongEl) totalWrongEl.textContent = this.wrongAnswers;
        if (averageScoreEl) averageScoreEl.textContent = `${overallScore}%`;
        
        // Update progress bar target
        const progressFill = document.querySelector('.stat-progress-fill');
        if (progressFill) {
            progressFill.setAttribute('data-target', overallScore);
        }
        
        // Animate the numbers
        this.animateNumbers();
        
        // Final achievement check
        this.checkAchievements();
        
        // Create celebration effects
        if (this.correctAnswers > 0) {
            const correctCelebration = document.getElementById('correct-celebration');
            if (correctCelebration) {
                correctCelebration.classList.add('active');
                setTimeout(() => correctCelebration.classList.remove('active'), 800);
            }
        }
        
        if (overallScore >= 80) {
            const averageGlow = document.getElementById('average-glow');
            if (averageGlow) {
                averageGlow.classList.add('active');
            }
        }
        
        // Show pass/fail message with enhanced styling
        const passScore = 17; // Need 17 out of 33 to pass
        const passed = this.correctAnswers >= passScore;
        const message = passed ? 
            'Herzlichen Glückwunsch! Sie haben bestanden!' : 
            'Leider nicht bestanden. Versuchen Sie es erneut!';
            
        setTimeout(() => {
            this.showCustomAlert(message, passed);
        }, 1500);
    }
    
    showCustomAlert(message, isSuccess = false) {
        // Create custom alert modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            background: white;
            padding: 3rem 2rem;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            text-align: center;
            max-width: 400px;
            margin: 2rem;
            transform: scale(0.8);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        const icon = isSuccess ? '🎉' : '😔';
        const color = isSuccess ? '#10b981' : '#ef4444';
        
        alertBox.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">${icon}</div>
            <h3 style="color: ${color}; font-size: 1.5rem; margin-bottom: 1rem; font-weight: 700;">${message}</h3>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: ${color}; color: white; border: none; padding: 0.75rem 2rem; 
                           border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 1rem;
                           transition: transform 0.2s ease;" 
                    onmouseover="this.style.transform='scale(1.05)'" 
                    onmouseout="this.style.transform='scale(1)'">
                OK
            </button>
        `;
        
        modal.appendChild(alertBox);
        document.body.appendChild(modal);
        
        // Animate in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            alertBox.style.transform = 'scale(1)';
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    animateNumbers() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            if (isNaN(finalValue)) return;
            
            const duration = 2000;
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(finalValue * progress);
                
                if (stat.textContent.includes('%')) {
                    stat.textContent = `${currentValue}%`;
                } else {
                    stat.textContent = currentValue;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            stat.textContent = '0';
            animate();
        });
        
        // Animate progress bars
        const progressBars = document.querySelectorAll('.stat-progress-fill');
        progressBars.forEach(bar => {
            const target = parseInt(bar.getAttribute('data-target')) || 0;
            setTimeout(() => {
                bar.style.width = `${target}%`;
            }, 500);
        });
    }
    
    setupParticleSystem() {
        const particleSystem = document.getElementById('particle-system');
        if (!particleSystem) return;
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            
            particleSystem.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 15000);
        };
        
        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createParticle(), i * 200);
        }
        
        // Continue creating particles
        setInterval(createParticle, 800);
    }
    
    setupScrollIndicator() {
        // Create scroll indicator
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = '<div class="scroll-progress"></div>';
        document.body.appendChild(indicator);
        
        const progressBar = indicator.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    setupSoundEffects() {
        // Add sound effect classes to various elements
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .cta-primary, .cta-secondary')) {
                e.target.classList.add('sound-pop');
                setTimeout(() => e.target.classList.remove('sound-pop'), 300);
            }
            
            if (e.target.matches('.option')) {
                e.target.classList.add('sound-whoosh');
                setTimeout(() => e.target.classList.remove('sound-whoosh'), 600);
            }
        });
    }
    
    setupMagneticEffects() {
        const cards = document.querySelectorAll('.feature-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.1;
                card.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }
    
    checkAchievements() {
        // First question achievement
        if (this.userAnswers.length > 0 && !this.achievements['first-question']) {
            this.unlockAchievement('first-question');
        }
        
        // Streak achievements
        if (this.currentStreak >= 5 && !this.achievements['streak-5']) {
            this.unlockAchievement('streak-5');
        }
        
        // Half way achievement
        if (this.currentQuestion >= Math.floor(this.questions.length / 2) && !this.achievements['half-way']) {
            this.unlockAchievement('half-way');
        }
        
        // Perfect score achievement
        const correctPercentage = (this.correctAnswers / this.questions.length) * 100;
        if (correctPercentage === 100 && !this.achievements['perfect-score']) {
            this.unlockAchievement('perfect-score');
        }
    }
    
    unlockAchievement(achievementId) {
        this.achievements[achievementId] = true;
        const badge = document.querySelector(`[data-achievement="${achievementId}"]`);
        
        if (badge) {
            badge.classList.add('unlocked');
            badge.classList.add('sound-success');
            
            // Create celebration effect
            this.createCelebrationEffect(badge);
            
            setTimeout(() => {
                badge.classList.remove('sound-success');
            }, 800);
        }
    }
    
    createCelebrationEffect(element) {
        const rect = element.getBoundingClientRect();
        const celebration = document.createElement('div');
        celebration.className = 'achievement-celebration';
        celebration.style.position = 'fixed';
        celebration.style.left = rect.left + rect.width / 2 + 'px';
        celebration.style.top = rect.top + rect.height / 2 + 'px';
        celebration.style.zIndex = '10000';
        celebration.innerHTML = '🎉✨🎊';
        celebration.style.fontSize = '2rem';
        celebration.style.pointerEvents = 'none';
        
        document.body.appendChild(celebration);
        
        // Animate the celebration
        celebration.animate([
            { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(0.5) rotate(360deg)', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }).onfinish = () => {
            document.body.removeChild(celebration);
        };
    }
    
    // Dashboard Methods
    loadUserData() {
        const savedData = localStorage.getItem('lebenDE_userData');
        if (savedData) {
            const userData = JSON.parse(savedData);
            this.userProfile = { ...this.userProfile, ...userData.profile };
            this.quizHistory = userData.history || [];
            this.studyStreak = userData.studyStreak || 0;
            this.weakAreas = userData.weakAreas || this.weakAreas;
            this.achievements = userData.achievements || this.achievements;
        }
        this.updateStudyStreak();
    }
    
    saveUserData() {
        const userData = {
            profile: this.userProfile,
            history: this.quizHistory,
            studyStreak: this.studyStreak,
            weakAreas: this.weakAreas,
            achievements: this.achievements,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('lebenDE_userData', JSON.stringify(userData));
    }
    
    setupDashboard() {
        this.updateDashboardDisplay();
        this.setupDashboardEventListeners();
        this.generateStreakCalendar();
    }
    
    setupDashboardEventListeners() {
        // Edit profile button
        const editProfileBtn = document.getElementById('edit-profile');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => this.showEditProfileModal());
        }
        
        // Avatar edit button
        const avatarEditBtn = document.getElementById('avatar-edit');
        if (avatarEditBtn) {
            avatarEditBtn.addEventListener('click', () => this.showAvatarSelector());
        }
        
        // Focus study button
        const focusStudyBtn = document.querySelector('.focus-study-btn');
        if (focusStudyBtn) {
            focusStudyBtn.addEventListener('click', () => this.startFocusedPractice());
        }
    }
    
    updateDashboardDisplay() {
        // Update profile information
        const profileName = document.getElementById('profile-name');
        const userAvatar = document.getElementById('user-avatar');
        const profileTotalSessions = document.getElementById('profile-total-sessions');
        const profileStudyTime = document.getElementById('profile-study-time');
        const profileSuccessRate = document.getElementById('profile-success-rate');
        
        if (profileName) profileName.textContent = this.userProfile.name;
        if (userAvatar) userAvatar.textContent = this.userProfile.avatar;
        if (profileTotalSessions) profileTotalSessions.textContent = this.userProfile.totalSessions;
        if (profileStudyTime) profileStudyTime.textContent = `${Math.floor(this.userProfile.studyTimeMinutes / 60)}h`;
        if (profileSuccessRate) profileSuccessRate.textContent = `${Math.round(this.userProfile.successRate)}%`;
        
        // Update dashboard progress
        this.updateDashboardProgress();
        
        // Update quick stats
        this.updateQuickStats();
        
        // Update recent activity
        this.updateRecentActivity();
        
        // Update streak display
        this.updateStreakDisplay();
        
        // Update achievements
        this.updateDashboardAchievements();
    }
    
    updateDashboardProgress() {
        const progressText = document.getElementById('dashboard-progress-text');
        const progressCircle = document.getElementById('dashboard-progress-circle');
        const dashboardCorrect = document.getElementById('dashboard-correct');
        const dashboardIncorrect = document.getElementById('dashboard-incorrect');
        const dashboardRemaining = document.getElementById('dashboard-remaining');
        
        const totalAnswered = this.userProfile.totalQuestionsAnswered;
        const correctAnswers = Math.round(totalAnswered * (this.userProfile.successRate / 100));
        const incorrectAnswers = totalAnswered - correctAnswers;
        const totalQuestions = this.questions.length;
        const progress = Math.min(100, (totalAnswered / totalQuestions) * 100);
        
        if (progressText) progressText.textContent = `${Math.round(progress)}%`;
        if (dashboardCorrect) dashboardCorrect.textContent = correctAnswers;
        if (dashboardIncorrect) dashboardIncorrect.textContent = incorrectAnswers;
        if (dashboardRemaining) dashboardRemaining.textContent = Math.max(0, totalQuestions - totalAnswered);
        
        if (progressCircle) {
            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
    }
    
    updateQuickStats() {
        const totalQuestionsAnswered = document.getElementById('total-questions-answered');
        const averageTime = document.getElementById('average-time');
        const bestStreak = document.getElementById('best-streak');
        const daysStudied = document.getElementById('days-studied');
        
        if (totalQuestionsAnswered) totalQuestionsAnswered.textContent = this.userProfile.totalQuestionsAnswered;
        if (averageTime) averageTime.textContent = `${Math.round(this.userProfile.averageAnswerTime)}s`;
        if (bestStreak) bestStreak.textContent = this.userProfile.bestStreak;
        if (daysStudied) daysStudied.textContent = this.userProfile.daysStudied;
    }
    
    updateRecentActivity() {
        const recentActivity = document.getElementById('recent-activity');
        if (!recentActivity) return;
        
        if (this.quizHistory.length === 0) {
            recentActivity.innerHTML = `
                <div class="activity-item empty">
                    <div class="activity-icon">🎯</div>
                    <div class="activity-content">
                        <p>Start your first quiz to see activity here!</p>
                        <span class="activity-time">No activity yet</span>
                    </div>
                </div>
            `;
            return;
        }
        
        const recentEntries = this.quizHistory.slice(-3).reverse();
        recentActivity.innerHTML = recentEntries.map(entry => {
            const timeAgo = this.formatTimeAgo(new Date(entry.date));
            const icon = entry.score >= 70 ? '✅' : entry.score >= 50 ? '⚠️' : '❌';
            return `
                <div class="activity-item">
                    <div class="activity-icon">${icon}</div>
                    <div class="activity-content">
                        <p>Quiz completed: ${entry.score}% (${entry.correct}/${entry.total})</p>
                        <span class="activity-time">${timeAgo}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    updateStreakDisplay() {
        const currentStreak = document.getElementById('current-streak');
        const streakMessage = document.getElementById('streak-message');
        
        if (currentStreak) currentStreak.textContent = this.studyStreak;
        
        if (streakMessage) {
            if (this.studyStreak === 0) {
                streakMessage.textContent = 'Start studying to build your streak!';
            } else if (this.studyStreak === 1) {
                streakMessage.textContent = 'Great start! Keep it up tomorrow!';
            } else if (this.studyStreak < 5) {
                streakMessage.textContent = `You're building momentum! ${5 - this.studyStreak} more days to reach 5!`;
            } else {
                streakMessage.textContent = `Amazing streak! You're on fire! 🔥`;
            }
        }
    }
    
    updateDashboardAchievements() {
        const dashboardAchievements = document.getElementById('dashboard-achievements');
        if (!dashboardAchievements) return;
        
        const earnedAchievements = Object.entries(this.achievements)
            .filter(([key, earned]) => earned)
            .slice(-3);
        
        if (earnedAchievements.length === 0) {
            dashboardAchievements.innerHTML = `
                <div class="achievement-slot empty">
                    <div class="achievement-icon">❓</div>
                    <span class="achievement-name">Complete your first quiz!</span>
                </div>
                <div class="achievement-slot empty">
                    <div class="achievement-icon">❓</div>
                    <span class="achievement-name">Keep practicing!</span>
                </div>
                <div class="achievement-slot empty">
                    <div class="achievement-icon">❓</div>
                    <span class="achievement-name">More achievements await!</span>
                </div>
            `;
            return;
        }
        
        const achievementIcons = {
            'first-question': '🎯',
            'streak-5': '🔥',
            'half-way': '⚡',
            'perfect-score': '🏆'
        };
        
        const achievementNames = {
            'first-question': 'First Question',
            'streak-5': '5 Streak',
            'half-way': 'Half Way',
            'perfect-score': 'Perfect Score'
        };
        
        let html = '';
        for (let i = 0; i < 3; i++) {
            if (i < earnedAchievements.length) {
                const [key] = earnedAchievements[i];
                html += `
                    <div class="achievement-slot earned">
                        <div class="achievement-icon">${achievementIcons[key]}</div>
                        <span class="achievement-name">${achievementNames[key]}</span>
                    </div>
                `;
            } else {
                html += `
                    <div class="achievement-slot empty">
                        <div class="achievement-icon">❓</div>
                        <span class="achievement-name">Keep going!</span>
                    </div>
                `;
            }
        }
        
        dashboardAchievements.innerHTML = html;
    }
    
    generateStreakCalendar() {
        const streakCalendar = document.getElementById('streak-calendar');
        if (!streakCalendar) return;
        
        const today = new Date();
        const days = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            days.push(date);
        }
        
        streakCalendar.innerHTML = days.map(date => {
            const daysDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
            const isActive = daysDiff < this.studyStreak;
            return `<div class="calendar-day${isActive ? ' active' : ''}"></div>`;
        }).join('');
    }
    
    updateStudyStreak() {
        const today = new Date().toDateString();
        const lastStudyDate = this.userProfile.lastStudyDate;
        
        if (!lastStudyDate) {
            this.studyStreak = 0;
            return;
        }
        
        const lastDate = new Date(lastStudyDate);
        const daysDiff = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff > 1) {
            this.studyStreak = 0;
        } else if (daysDiff === 1 && lastDate.toDateString() !== today) {
            // This will be incremented when they complete a quiz today
        }
    }
    
    recordQuizSession(correct, total, timeSpent) {
        const score = Math.round((correct / total) * 100);
        const session = {
            date: new Date().toISOString(),
            correct: correct,
            total: total,
            score: score,
            timeSpent: timeSpent
        };
        
        this.quizHistory.push(session);
        
        // Update user profile stats
        this.userProfile.totalSessions++;
        this.userProfile.totalQuestionsAnswered += total;
        this.userProfile.studyTimeMinutes += Math.round(timeSpent / 60);
        
        // Update success rate (weighted average)
        const totalQuestions = this.userProfile.totalQuestionsAnswered;
        const totalCorrect = this.quizHistory.reduce((sum, session) => sum + session.correct, 0);
        this.userProfile.successRate = (totalCorrect / totalQuestions) * 100;
        
        // Update average answer time
        const totalTime = this.quizHistory.reduce((sum, session) => sum + session.timeSpent, 0);
        this.userProfile.averageAnswerTime = (totalTime / totalQuestions) / 1000;
        
        // Update best streak
        if (this.currentStreak > this.userProfile.bestStreak) {
            this.userProfile.bestStreak = this.currentStreak;
        }
        
        // Update study streak
        const today = new Date().toDateString();
        if (this.userProfile.lastStudyDate !== today) {
            this.studyStreak++;
            this.userProfile.lastStudyDate = today;
            
            // Count unique study days
            const uniqueDays = new Set(this.quizHistory.map(session => 
                new Date(session.date).toDateString()
            )).size;
            this.userProfile.daysStudied = uniqueDays;
        }
        
        this.saveUserData();
        this.updateDashboardDisplay();
    }
    
    startFocusedPractice() {
        // Find the weakest area
        let weakestArea = null;
        let lowestPercentage = 100;
        
        for (const [area, stats] of Object.entries(this.weakAreas)) {
            if (stats.total > 0) {
                const percentage = (stats.correct / stats.total) * 100;
                if (percentage < lowestPercentage) {
                    lowestPercentage = percentage;
                    weakestArea = area;
                }
            }
        }
        
        if (weakestArea) {
            this.showCustomAlert('Focus Practice', `Starting focused practice on: ${weakestArea}`, 'success');
        }
        
        // Start regular quiz for now (could be enhanced with topic-specific questions)
        this.startQuiz();
    }
    
    showEditProfileModal() {
        const currentName = this.userProfile.name;
        const newName = prompt('Enter your name:', currentName);
        
        if (newName && newName.trim() !== '') {
            this.userProfile.name = newName.trim();
            this.saveUserData();
            this.updateDashboardDisplay();
            this.showCustomAlert('Profile Updated', 'Your profile has been updated successfully!', 'success');
        }
    }
    
    showAvatarSelector() {
        const avatars = ['🇩🇪', '👨‍🎓', '👩‍🎓', '🎯', '📚', '🌟', '🚀', '💪', '🎉', '🏆'];
        const currentAvatar = this.userProfile.avatar;
        
        let message = 'Choose your avatar:\n\n';
        avatars.forEach((avatar, index) => {
            message += `${index + 1}. ${avatar}${avatar === currentAvatar ? ' (current)' : ''}\n`;
        });
        
        const choice = prompt(message + '\nEnter number (1-10):');
        const index = parseInt(choice) - 1;
        
        if (index >= 0 && index < avatars.length) {
            this.userProfile.avatar = avatars[index];
            this.saveUserData();
            this.updateDashboardDisplay();
            this.showCustomAlert('Avatar Updated', 'Your avatar has been updated!', 'success');
        }
    }
    
    formatTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    }
    
    // Bundesland Quiz Methods
    async loadBundeslandQuestions(bundesland) {
        try {
            const response = await fetch(`fragen/${bundesland}.txt`);
            const text = await response.text();
            
            // Parse the text file format for Bundesland questions
            const questions = this.parseBundeslandFile(text, bundesland);
            this.bundeslandQuestions[bundesland] = questions;
            
            console.log(`Loaded ${questions.length} questions for ${bundesland}`);
            return questions;
        } catch (error) {
            console.error(`Failed to load questions for ${bundesland}:`, error);
            return [];
        }
    }
    
    parseBundeslandFile(text, bundesland) {
        const questions = [];
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        
        let currentQuestion = null;
        let currentOptions = [];
        let questionCounter = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Skip the bundesland header
            if (line === bundesland) continue;
            
            // Check if line starts with "Aufgabe" (new question)
            if (line.startsWith('Aufgabe')) {
                // Save previous question if exists
                if (currentQuestion && currentOptions.length > 0) {
                    questions.push({
                        id: questionCounter++,
                        question: currentQuestion,
                        options: [...currentOptions],
                        correct: 0 // Default to first option, should be parsed from answer key
                    });
                }
                
                // Start new question
                currentQuestion = null;
                currentOptions = [];
                continue;
            }
            
            // Question text (usually the line after "Aufgabe X")
            if (!currentQuestion && !line.startsWith('Bild') && !line.includes('○') && line.length > 10) {
                currentQuestion = line;
                continue;
            }
            
            // Options (lines that don't start with special markers)
            if (currentQuestion && !line.startsWith('Bild') && !line.startsWith('Aufgabe') && line.length > 2) {
                // Remove bullet points or special characters
                const cleanOption = line.replace(/^[○●•\-\s]*/, '').trim();
                if (cleanOption.length > 0) {
                    currentOptions.push(cleanOption);
                }
            }
        }
        
        // Add the last question
        if (currentQuestion && currentOptions.length > 0) {
            questions.push({
                id: questionCounter++,
                question: currentQuestion,
                options: [...currentOptions],
                correct: 0
            });
        }
        
        return questions;
    }
    
    async startBundeslandQuiz(bundesland) {
        // Load questions if not already loaded
        if (!this.bundeslandQuestions[bundesland]) {
            await this.loadBundeslandQuestions(bundesland);
        }
        
        const questions = this.bundeslandQuestions[bundesland];
        if (questions.length === 0) {
            this.showCustomAlert('Error', `No questions found for ${bundesland}`, false);
            return;
        }
        
        // Set up the quiz with Bundesland questions
        this.questions = questions;
        this.quizMode = 'bundesland';
        this.currentBundesland = bundesland;
        this.showCorrectAnswer = true;
        
        // Redirect to quiz page
        window.location.href = `quiz.html?mode=bundesland&state=${encodeURIComponent(bundesland)}`;
    }
}

// Global functions for Bundesland modal
function showBundeslandSelector() {
    const modal = document.getElementById('bundesland-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeBundeslandSelector() {
    const modal = document.getElementById('bundesland-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function startBundeslandQuiz(bundesland) {
    closeBundeslandSelector();
    if (window.quiz) {
        window.quiz.startBundeslandQuiz(bundesland);
    }
}

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    window.quiz = new LebenInDeutschlandQuiz();
    
    // Check for quiz mode parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const state = urlParams.get('state');
    
    if (mode) {
        // Wait a moment for quiz to initialize, then start with specified mode
        setTimeout(async () => {
            if (mode === 'bundesland' && state) {
                // Load and start Bundesland quiz
                await window.quiz.loadBundeslandQuestions(state);
                window.quiz.questions = window.quiz.bundeslandQuestions[state] || [];
                window.quiz.quizMode = 'bundesland';
                window.quiz.currentBundesland = state;
                window.quiz.startQuizPage('bundesland');
            } else if (['practice', 'exam', 'all', 'review'].includes(mode)) {
                // Wait for questions to load with timeout
                console.log('Waiting for questions to load for mode:', mode);
                let attempts = 0;
                const checkQuestions = () => {
                    attempts++;
                    console.log(`Attempt ${attempts}: allQuestions.length = ${window.quiz.allQuestions.length}`);
                    
                    if (window.quiz.allQuestions.length > 0) {
                        console.log('Questions loaded! Starting quiz page...');
                        window.quiz.startQuizPage(mode);
                    } else if (attempts < 50) { // 5 seconds max
                        setTimeout(checkQuestions, 100);
                    } else {
                        console.error('Timeout waiting for questions to load');
                        // Force display error message
                        const questionText = document.getElementById('question-text');
                        if (questionText) questionText.textContent = 'Error: Questions failed to load. Please refresh the page.';
                    }
                };
                checkQuestions();
            }
        }, 1000);
    }
    
    // Add scroll indicator to the page
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<div class="scroll-progress"></div>';
    document.body.prepend(indicator);
    
    // Enhanced cursor animation system (desktop only)
    if (window.innerWidth > 768) {
        // Create cursor elements
        const cursorDot = document.createElement('div');
        const cursorOutline = document.createElement('div');
        const cursorGlow = document.createElement('div');
        
        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        cursorGlow.className = 'cursor-glow';
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        document.body.appendChild(cursorGlow);
        
        let cursorTrails = [];
        let mouseX = 0, mouseY = 0;
        
        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update cursor dot position (immediate)
            cursorDot.style.left = (mouseX - 4) + 'px';
            cursorDot.style.top = (mouseY - 4) + 'px';
            
            // Update cursor glow position (immediate)
            cursorGlow.style.left = (mouseX - 50) + 'px';
            cursorGlow.style.top = (mouseY - 50) + 'px';
            
            // Create cursor trails
            if (cursorTrails.length < 8) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = (mouseX - 3) + 'px';
                trail.style.top = (mouseY - 3) + 'px';
                document.body.appendChild(trail);
                
                cursorTrails.push({
                    element: trail,
                    created: Date.now()
                });
                
                // Remove trail after animation
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                    const index = cursorTrails.findIndex(t => t.element === trail);
                    if (index > -1) {
                        cursorTrails.splice(index, 1);
                    }
                }, 800);
            }
        });
        
        // Animated cursor outline follow
        function updateOutline() {
            const outlineRect = cursorOutline.getBoundingClientRect();
            const currentX = outlineRect.left + outlineRect.width / 2;
            const currentY = outlineRect.top + outlineRect.height / 2;
            
            const targetX = mouseX - 20;
            const targetY = mouseY - 20;
            
            cursorOutline.style.left = targetX + 'px';
            cursorOutline.style.top = targetY + 'px';
            
            requestAnimationFrame(updateOutline);
        }
        updateOutline();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .cta-primary, .cta-secondary, .option, .quiz-btn, .next-btn');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
                cursorGlow.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
                cursorGlow.classList.remove('hover');
            });
        });
        
        // Click effects
        document.addEventListener('mousedown', () => {
            cursorDot.classList.add('click');
            
            // Create click ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: fixed;
                left: ${mouseX - 15}px;
                top: ${mouseY - 15}px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
                pointer-events: none;
                z-index: 10002;
                animation: rippleEffect 0.6s ease-out forwards;
            `;
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        document.addEventListener('mouseup', () => {
            cursorDot.classList.remove('click');
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleEffect {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});