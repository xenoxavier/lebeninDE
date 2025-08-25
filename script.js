class LebenInDeutschlandQuiz {
    constructor() {
        this.questions = [
            {
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
                question: "Was ist Deutschland?",
                options: [
                    "Eine Monarchie",
                    "Ein Bundesstaat",
                    "Eine Diktatur",
                    "Eine Kolonie"
                ],
                correct: 1
            },
            {
                question: "Womit finanziert der deutsche Staat die Sozialversicherung?",
                options: [
                    "Kirchensteuer",
                    "Sozialabgaben",
                    "Spendengeldern",
                    "Vereinsbeiträgen"
                ],
                correct: 1
            },
            {
                question: "Wie viele Bundesländer hat die Bundesrepublik Deutschland?",
                options: [
                    "14",
                    "15",
                    "16",
                    "17"
                ],
                correct: 2
            },
            {
                question: "Was ist mit dem deutschen Grundgesetz vereinbar?",
                options: [
                    "Die Prügelstrafe",
                    "Die Folter",
                    "Die Todesstrafe",
                    "Die Geldstrafe"
                ],
                correct: 3
            },
            {
                question: "Welche Aussage ist richtig? In Deutschland ...",
                options: [
                    "sind Staat und Religionsgemeinschaften voneinander getrennt",
                    "bilden die Religionsgemeinschaften den Staat",
                    "ist der Staat abhängig von den Religionsgemeinschaften",
                    "bilden Staat und Religionsgemeinschaften eine Einheit"
                ],
                correct: 0
            },
            {
                question: "Was ist eine Aufgabe von Wahlhelfern/Wahlhelferinnen in Deutschland?",
                options: [
                    "Sie helfen alten Menschen bei der Stimmabgabe",
                    "Sie schreiben die Wahlprogramme",
                    "Sie geben Zwischenergebnisse an die Medien weiter",
                    "Sie zählen die Stimmen aus"
                ],
                correct: 3
            }
        ];
        
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
        
        this.init();
    }
    
    init() {
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
    
    startQuiz() {
        // Check if we're on the dashboard page with quiz section
        const quizSection = document.getElementById('quiz');
        if (!quizSection) {
            // If no quiz section, redirect to dashboard
            window.location.href = 'dashboard.html';
            return;
        }
        
        this.scrollToSection('#quiz');
        this.isQuizActive = true;
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.quizStartTime = Date.now(); // Track quiz start time for dashboard
        this.loadQuestion();
        this.updateProgress();
    }
    
    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const currentSpan = document.querySelector('.current');
        const totalSpan = document.querySelector('.total');
        
        if (questionText) questionText.textContent = question.question;
        if (currentSpan) currentSpan.textContent = this.currentQuestion + 1;
        if (totalSpan) totalSpan.textContent = this.questions.length;
        
        // Clear previous options
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.addEventListener('click', () => this.selectOption(index));
                optionsContainer.appendChild(optionElement);
            });
        }
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) prevBtn.disabled = this.currentQuestion === 0;
        if (nextBtn) nextBtn.textContent = this.currentQuestion === this.questions.length - 1 ? 'Beenden' : 'Weiter';
        
        // Restore user's previous selection if any
        if (this.userAnswers[this.currentQuestion] !== undefined) {
            this.showSelectedOption(this.userAnswers[this.currentQuestion]);
        }
    }
    
    selectOption(optionIndex) {
        this.userAnswers[this.currentQuestion] = optionIndex;
        this.showSelectedOption(optionIndex);
        
        // Check if answer is correct and update streak
        if (optionIndex === this.questions[this.currentQuestion].correct) {
            this.currentStreak++;
        } else {
            this.currentStreak = 0;
        }
        
        this.checkAchievements();
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
        const progressCircle = document.querySelector('.progress-ring__circle.progress');
        
        if (progressText) progressText.textContent = `${Math.round(progress)}%`;
        
        if (progressCircle) {
            const circumference = 2 * Math.PI * 52; // radius is 52
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
        
        // Update current stats
        this.calculateCurrentStats();
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
        this.scrollToSection('#statistics');
        
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
}

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quiz = new LebenInDeutschlandQuiz();
    
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