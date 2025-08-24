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
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupThemeToggle();
        this.setupScrollAnimations();
        this.setupParticleSystem();
        this.setupScrollIndicator();
        this.setupSoundEffects();
        this.setupMagneticEffects();
    }
    
    setupEventListeners() {
        // CTA Buttons
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-button, .cta-nav-btn, .cta-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.startQuiz();
            });
        });
        
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href');
                this.scrollToSection(target);
            });
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
        this.scrollToSection('#quiz');
        this.isQuizActive = true;
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
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
}

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LebenInDeutschlandQuiz();
    
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