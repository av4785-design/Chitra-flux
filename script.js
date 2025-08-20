class ChitraFluxChatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.quickActions = document.getElementById('quickActions');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.currentStep = 'greeting';
        this.selectedCategory = null;
        this.selectedStyle = null;
        this.selectedComplexity = null;
        this.selectedPlatform = null;
        
        this.categories = {
            'poster': {
                name: 'Poster Design',
                icon: '🎨',
                styles: ['Vintage', 'Modern Minimalist', 'Retro', 'Cyberpunk', 'Art Deco', 'Grunge'],
                complexities: ['Simple & Clean', 'Detailed & Rich', 'Highly Complex'],
                platforms: ['DALL·E 3', 'MidJourney', 'Stable Diffusion', 'Adobe Firefly']
            },
            'logo': {
                name: 'Logo Design',
                icon: '⚡',
                styles: ['Minimalist', 'Corporate', 'Playful', 'Luxury', 'Tech/Modern', 'Vintage'],
                complexities: ['Simple Icon', 'Detailed Emblem', 'Complex Symbol'],
                platforms: ['DALL·E 3', 'MidJourney', 'Stable Diffusion', 'Adobe Firefly']
            },
            'portrait': {
                name: 'Portrait Art',
                icon: '👤',
                styles: ['Realistic', 'Anime/Manga', 'Oil Painting', 'Digital Art', 'Watercolor', 'Sketch'],
                complexities: ['Simple Portrait', 'Detailed Character', 'Full Scene'],
                platforms: ['DALL·E 3', 'MidJourney', 'Stable Diffusion', 'Adobe Firefly']
            },
            'abstract': {
                name: 'Abstract Art',
                icon: '🌀',
                styles: ['Geometric', 'Fluid/Organic', 'Surreal', 'Psychedelic', 'Kandinsky-inspired', 'Modern'],
                complexities: ['Simple Forms', 'Complex Patterns', 'Multi-layered'],
                platforms: ['DALL·E 3', 'MidJourney', 'Stable Diffusion', 'Adobe Firefly']
            },
            'digital': {
                name: 'Digital Art',
                icon: '💻',
                styles: ['Sci-fi', 'Fantasy', 'Concept Art', 'Game Art', 'Illustration', 'Pixel Art'],
                complexities: ['Simple Design', 'Detailed Artwork', 'Ultra-detailed'],
                platforms: ['DALL·E 3', 'MidJourney', 'Stable Diffusion', 'Adobe Firefly']
            }
        };

        this.colorPalettes = {
            'poster': [
                { name: 'Bold & Vibrant', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'] },
                { name: 'Professional', colors: ['#2C3E50', '#34495E', '#95A5A6', '#BDC3C7', '#ECF0F1'] },
                { name: 'Warm & Inviting', colors: ['#E17055', '#FDCB6E', '#6C5CE7', '#A29BFE', '#FD79A8'] }
            ],
            'logo': [
                { name: 'Corporate Blue', colors: ['#3498DB', '#2980B9', '#ECF0F1', '#BDC3C7', '#34495E'] },
                { name: 'Modern Tech', colors: ['#6C5CE7', '#A29BFE', '#00B894', '#00CEC9', '#2D3436'] },
                { name: 'Luxury Gold', colors: ['#F39C12', '#E67E22', '#2C3E50', '#ECF0F1', '#BDC3C7'] }
            ],
            'portrait': [
                { name: 'Natural Skin Tones', colors: ['#D4A574', '#E6B887', '#F4D1A6', '#F8E6D3', '#2C3E50'] },
                { name: 'Anime Vibrant', colors: ['#FF7675', '#74B9FF', '#A29BFE', '#FDCB6E', '#2D3436'] },
                { name: 'Classic Art', colors: ['#8B4513', '#A0522D', '#DEB887', '#F5DEB3', '#2F4F4F'] }
            ],
            'abstract': [
                { name: 'Rainbow Spectrum', colors: ['#FF0080', '#FF8000', '#FFFF00', '#80FF00', '#0080FF'] },
                { name: 'Monochrome', colors: ['#000000', '#404040', '#808080', '#C0C0C0', '#FFFFFF'] },
                { name: 'Sunset Gradient', colors: ['#FF6B6B', '#FF8E53', '#FF6B9D', '#C44569', '#F8B500'] }
            ],
            'digital': [
                { name: 'Cyberpunk Neon', colors: ['#FF00FF', '#00FFFF', '#FF0080', '#8000FF', '#000000'] },
                { name: 'Fantasy Magic', colors: ['#6C5CE7', '#A29BFE', '#00B894', '#FDCB6E', '#2D3436'] },
                { name: 'Sci-fi Blue', colors: ['#0080FF', '#00BFFF', '#4169E1', '#1E90FF', '#000080'] }
            ]
        };

        this.init();
    }

    init() {
        this.addMessage('bot', '👋 Hello! I\'m Chitra-Flux, your AI Art Design Inspirer!');
        setTimeout(() => {
            this.addMessage('bot', 'I\'m here to help you create amazing AI art prompts for your creative projects. I can generate customized prompts, suggest color palettes, and recommend art styles for different platforms like DALL·E, MidJourney, and Stable Diffusion.');
            setTimeout(() => {
                this.addMessage('bot', 'What type of art design inspiration do you need today? Choose a category to get started:');
                this.showCategoryButtons();
            }, 2000);
        }, 1500);
    }

    addMessage(sender, text, isHtml = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        
        if (isHtml) {
            messageBubble.innerHTML = text;
        } else {
            messageBubble.textContent = text;
        }
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.appendChild(messageBubble);
        messageDiv.appendChild(messageTime);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping(callback, delay = 1500) {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
        setTimeout(() => {
            this.typingIndicator.style.display = 'none';
            callback();
        }, delay);
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    clearQuickActions() {
        this.quickActions.innerHTML = '';
    }

    showCategoryButtons() {
        this.clearQuickActions();
        Object.keys(this.categories).forEach(key => {
            const category = this.categories[key];
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.innerHTML = `${category.icon} ${category.name}`;
            button.onclick = () => this.selectCategory(key);
            this.quickActions.appendChild(button);
        });
    }

    selectCategory(category) {
        this.selectedCategory = category;
        const categoryData = this.categories[category];
        this.addMessage('user', `${categoryData.icon} ${categoryData.name}`);
        
        this.showTyping(() => {
            this.addMessage('bot', `Great choice! Let's create some amazing ${categoryData.name.toLowerCase()} prompts. First, what style are you looking for?`);
            this.showStyleButtons();
        });
    }

    showStyleButtons() {
        this.clearQuickActions();
        const styles = this.categories[this.selectedCategory].styles;
        styles.forEach(style => {
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.textContent = style;
            button.onclick = () => this.selectStyle(style);
            this.quickActions.appendChild(button);
        });
    }

    selectStyle(style) {
        this.selectedStyle = style;
        this.addMessage('user', style);
        
        this.showTyping(() => {
            this.addMessage('bot', `Perfect! ${style} is a fantastic choice. Now, how complex would you like your ${this.categories[this.selectedCategory].name.toLowerCase()} to be?`);
            this.showComplexityButtons();
        });
    }

    showComplexityButtons() {
        this.clearQuickActions();
        const complexities = this.categories[this.selectedCategory].complexities;
        complexities.forEach(complexity => {
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.textContent = complexity;
            button.onclick = () => this.selectComplexity(complexity);
            this.quickActions.appendChild(button);
        });
    }

    selectComplexity(complexity) {
        this.selectedComplexity = complexity;
        this.addMessage('user', complexity);
        
        this.showTyping(() => {
            this.addMessage('bot', `Excellent! Which AI platform will you be using to generate your artwork?`);
            this.showPlatformButtons();
        });
    }

    showPlatformButtons() {
        this.clearQuickActions();
        const platforms = this.categories[this.selectedCategory].platforms;
        platforms.forEach(platform => {
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.textContent = platform;
            button.onclick = () => this.selectPlatform(platform);
            this.quickActions.appendChild(button);
        });
    }

    selectPlatform(platform) {
        this.selectedPlatform = platform;
        this.addMessage('user', platform);
        
        this.showTyping(() => {
            this.addMessage('bot', `🎨 Perfect! Let me generate customized ${this.categories[this.selectedCategory].name.toLowerCase()} prompts for ${platform}...`);
            this.generatePromptsAndSuggestions();
        }, 2000);
    }

    generatePromptsAndSuggestions() {
        const prompts = this.generatePrompts();
        const colorPalette = this.getColorPalette();
        
        this.showTyping(() => {
            // Display prompts
            let promptsHtml = `<strong>🚀 Here are your AI art prompts for ${this.selectedPlatform}:</strong><br><br>`;
            
            prompts.forEach((prompt, index) => {
                promptsHtml += `<div class="prompt-container">
                    <div class="prompt-title">
                        <span>✨ Prompt ${index + 1}</span>
                    </div>
                    <div class="prompt-text">${prompt}</div>
                </div>`;
            });

            this.addMessage('bot', promptsHtml, true);
            
            setTimeout(() => {
                // Display color palette
                let paletteHtml = `<strong>🎨 Recommended Color Palette: "${colorPalette.name}"</strong><br><br>`;
                paletteHtml += '<div class="color-palette">';
                
                colorPalette.colors.forEach(color => {
                    paletteHtml += `<div class="color-swatch" style="background-color: ${color}" title="${color}"></div>`;
                });
                
                paletteHtml += '</div>';
                paletteHtml += '<div style="margin-top: 10px; font-size: 0.9rem;">';
                paletteHtml += '<strong>Hex Codes:</strong> ' + colorPalette.colors.join(' • ');
                paletteHtml += '</div>';

                this.addMessage('bot', paletteHtml, true);
                
                setTimeout(() => {
                    this.addMessage('bot', `✅ All done! Your ${this.categories[this.selectedCategory].name.toLowerCase()} inspiration package is ready. Would you like to create prompts for another category or modify these settings?`);
                    this.showFinalOptions();
                }, 1000);
            }, 1500);
        }, 2500);
    }

    generatePrompts() {
        const category = this.selectedCategory;
        const style = this.selectedStyle;
        const complexity = this.selectedComplexity;
        const platform = this.selectedPlatform;
        
        const basePrompts = this.getBasePrompts(category, style, complexity);
        const platformOptimized = this.optimizeForPlatform(basePrompts, platform);
        
        return platformOptimized;
    }

    getBasePrompts(category, style, complexity) {
        const promptTemplates = {
            'poster': {
                'Vintage': [
                    `Vintage ${complexity.toLowerCase()} poster design with retro typography, aged paper texture, muted earth tones, classic composition, nostalgic feel`,
                    `1950s advertising poster style, ${complexity.toLowerCase()} layout, vintage color palette, retro fonts, classic American design elements`,
                    `Art deco inspired poster with ${complexity.toLowerCase()} geometric patterns, vintage gold accents, elegant typography, sophisticated design`
                ],
                'Modern Minimalist': [
                    `Clean minimalist poster design, ${complexity.toLowerCase()} composition, negative space, sans-serif typography, modern color scheme`,
                    `Contemporary minimalist poster with ${complexity.toLowerCase()} layout, geometric shapes, subtle gradients, professional typography`,
                    `Scandinavian-inspired poster design, ${complexity.toLowerCase()} elements, clean lines, neutral colors, modern aesthetic`
                ],
                'Retro': [
                    `Retro 80s poster design with ${complexity.toLowerCase()} neon elements, synthwave colors, vintage typography, nostalgic vibes`,
                    `70s retro poster style, ${complexity.toLowerCase()} psychedelic patterns, warm orange and brown tones, groovy typography`,
                    `Vintage retro poster with ${complexity.toLowerCase()} disco-era design, bold colors, funky fonts, classic 70s aesthetic`
                ],
                'Cyberpunk': [
                    `Cyberpunk poster design with ${complexity.toLowerCase()} neon glitch effects, dark urban setting, futuristic typography, electric blue and pink tones`,
                    `Futuristic cyberpunk poster, ${complexity.toLowerCase()} digital elements, neon lighting, high-tech aesthetics, dystopian atmosphere`,
                    `Neo-noir cyberpunk poster with ${complexity.toLowerCase()} holographic effects, rain-soaked streets, neon signs, futuristic cityscape`
                ]
            },
            'logo': {
                'Minimalist': [
                    `Clean minimalist logo design, ${complexity.toLowerCase()} geometric shape, modern sans-serif typography, professional appearance`,
                    `Simple minimalist logo with ${complexity.toLowerCase()} abstract symbol, negative space usage, contemporary design principles`,
                    `Modern minimalist logo featuring ${complexity.toLowerCase()} line art, clean typography, versatile design, corporate aesthetics`
                ],
                'Corporate': [
                    `Professional corporate logo design, ${complexity.toLowerCase()} business aesthetic, trustworthy appearance, blue and gray color scheme`,
                    `Enterprise-level logo with ${complexity.toLowerCase()} authoritative design, strong typography, reliable corporate identity`,
                    `Corporate logo featuring ${complexity.toLowerCase()} professional elements, established brand feel, sophisticated design`
                ],
                'Luxury': [
                    `Luxury brand logo with ${complexity.toLowerCase()} premium aesthetics, elegant typography, gold and black color palette, sophisticated design`,
                    `High-end luxury logo featuring ${complexity.toLowerCase()} refined elements, premium materials feel, exclusive brand identity`,
                    `Luxury logo design with ${complexity.toLowerCase()} elegant script typography, premium color scheme, upscale brand positioning`
                ]
            },
            'portrait': {
                'Realistic': [
                    `Photorealistic portrait with ${complexity.toLowerCase()} detail, natural lighting, professional photography style, lifelike appearance`,
                    `Hyperrealistic portrait featuring ${complexity.toLowerCase()} facial features, studio lighting, high-definition quality, natural skin tones`,
                    `Realistic portrait with ${complexity.toLowerCase()} expression, natural pose, professional headshot style, authentic human features`
                ],
                'Anime/Manga': [
                    `Anime-style portrait with ${complexity.toLowerCase()} character design, large expressive eyes, colorful hair, manga aesthetics`,
                    `Manga-inspired portrait featuring ${complexity.toLowerCase()} stylized features, dynamic pose, vibrant colors, Japanese art style`,
                    `Anime character portrait with ${complexity.toLowerCase()} design elements, cel-shading technique, bright colors, distinctive style`
                ],
                'Oil Painting': [
                    `Classical oil painting portrait with ${complexity.toLowerCase()} brushwork, rich color palette, traditional painting techniques, artistic mastery`,
                    `Renaissance-style oil portrait featuring ${complexity.toLowerCase()} classical composition, warm earth tones, masterful technique`,
                    `Oil painting portrait with ${complexity.toLowerCase()} impressionistic style, visible brushstrokes, rich texture, artistic depth`
                ]
            },
            'abstract': {
                'Geometric': [
                    `Abstract geometric composition with ${complexity.toLowerCase()} shapes, bold color contrasts, mathematical precision, modern art style`,
                    `Geometric abstract art featuring ${complexity.toLowerCase()} patterns, primary colors, clean lines, contemporary design`,
                    `Abstract geometric design with ${complexity.toLowerCase()} angular forms, vibrant color palette, structured composition`
                ],
                'Fluid/Organic': [
                    `Fluid abstract art with ${complexity.toLowerCase()} organic forms, flowing movements, gradient colors, natural inspiration`,
                    `Organic abstract composition featuring ${complexity.toLowerCase()} curved lines, natural flow, earthy color palette, biomorphic shapes`,
                    `Abstract fluid design with ${complexity.toLowerCase()} liquid movements, smooth transitions, organic color blending`
                ],
                'Surreal': [
                    `Surreal abstract artwork with ${complexity.toLowerCase()} dreamlike elements, impossible geometry, vibrant colors, Salvador Dalí inspiration`,
                    `Surrealist abstract composition featuring ${complexity.toLowerCase()} bizarre forms, dream logic, unexpected combinations`,
                    `Abstract surreal design with ${complexity.toLowerCase()} fantastical elements, reality-bending visuals, psychedelic colors`
                ]
            },
            'digital': {
                'Sci-fi': [
                    `Sci-fi digital art with ${complexity.toLowerCase()} futuristic elements, space setting, advanced technology, blue and silver tones`,
                    `Science fiction digital artwork featuring ${complexity.toLowerCase()} alien landscapes, futuristic cities, cosmic themes`,
                    `Futuristic sci-fi digital art with ${complexity.toLowerCase()} robotic designs, space exploration themes, high-tech aesthetics`
                ],
                'Fantasy': [
                    `Fantasy digital art with ${complexity.toLowerCase()} magical elements, mythical creatures, enchanted forests, warm mystical colors`,
                    `Epic fantasy digital artwork featuring ${complexity.toLowerCase()} heroic characters, magical landscapes, medieval inspiration`,
                    `Fantasy digital art with ${complexity.toLowerCase()} dragon themes, castle settings, magical lighting effects`
                ],
                'Concept Art': [
                    `Professional concept art with ${complexity.toLowerCase()} design exploration, detailed rendering, production-ready quality`,
                    `Game concept art featuring ${complexity.toLowerCase()} character design, environmental art, industry-standard quality`,
                    `Concept art with ${complexity.toLowerCase()} creative development, visual storytelling, professional illustration`
                ]
            }
        };

        const categoryPrompts = promptTemplates[category] || {};
        const stylePrompts = categoryPrompts[style] || [];
        
        return stylePrompts.length > 0 ? stylePrompts.slice(0, 3) : [
            `${style} style ${category} with ${complexity.toLowerCase()} design elements, professional quality, creative composition`,
            `${category} in ${style} aesthetic, ${complexity.toLowerCase()} details, modern artistic approach`,
            `Creative ${category} design with ${style} influence, ${complexity.toLowerCase()} execution, innovative visual approach`
        ];
    }

    optimizeForPlatform(basePrompts, platform) {
        const platformOptimizations = {
            'DALL·E 3': (prompt) => `${prompt}, highly detailed, professional quality, 4K resolution, perfect composition`,
            'MidJourney': (prompt) => `${prompt} --ar 16:9 --style expressive --quality 2 --chaos 10`,
            'Stable Diffusion': (prompt) => `${prompt}, masterpiece, best quality, ultra-detailed, photorealistic, 8k uhd, professional lighting`,
            'Adobe Firefly': (prompt) => `${prompt}, commercial use, high resolution, professional grade, clean composition`
        };

        const optimizer = platformOptimizations[platform] || ((prompt) => prompt);
        return basePrompts.map(optimizer);
    }

    getColorPalette() {
        const palettes = this.colorPalettes[this.selectedCategory] || [];
        return palettes[Math.floor(Math.random() * palettes.length)] || {
            name: 'Default',
            colors: ['#3498DB', '#E74C3C', '#2ECC71', '#F39C12', '#9B59B6']
        };
    }

    showFinalOptions() {
        this.clearQuickActions();
        
        const newCategoryBtn = document.createElement('button');
        newCategoryBtn.className = 'action-btn';
        newCategoryBtn.textContent = '🔄 Try Another Category';
        newCategoryBtn.onclick = () => this.startOver();
        
        const modifyBtn = document.createElement('button');
        modifyBtn.className = 'action-btn secondary';
        modifyBtn.textContent = '⚙️ Modify Settings';
        modifyBtn.onclick = () => this.modifyCurrentSettings();
        
        const restartBtn = document.createElement('button');
        restartBtn.className = 'action-btn secondary';
        restartBtn.textContent = '🏠 Start Fresh';
        restartBtn.onclick = () => this.restart();
        
        this.quickActions.appendChild(newCategoryBtn);
        this.quickActions.appendChild(modifyBtn);
        this.quickActions.appendChild(restartBtn);
    }

    startOver() {
        this.addMessage('user', '🔄 Try Another Category');
        this.showTyping(() => {
            this.addMessage('bot', 'Perfect! Let\'s explore another category. What type of art design inspiration would you like this time?');
            this.resetSelections();
            this.showCategoryButtons();
        });
    }

    modifyCurrentSettings() {
        this.addMessage('user', '⚙️ Modify Settings');
        this.showTyping(() => {
            this.addMessage('bot', `Let's modify your ${this.categories[this.selectedCategory].name} settings. What would you like to change first?`);
            this.showModifyOptions();
        });
    }

    showModifyOptions() {
        this.clearQuickActions();
        
        const styleBtn = document.createElement('button');
        styleBtn.className = 'action-btn';
        styleBtn.textContent = `Style: ${this.selectedStyle}`;
        styleBtn.onclick = () => {
            this.addMessage('user', 'Change Style');
            this.showTyping(() => {
                this.addMessage('bot', 'What style would you prefer instead?');
                this.showStyleButtons();
            });
        };
        
        const complexityBtn = document.createElement('button');
        complexityBtn.className = 'action-btn';
        complexityBtn.textContent = `Complexity: ${this.selectedComplexity}`;
        complexityBtn.onclick = () => {
            this.addMessage('user', 'Change Complexity');
            this.showTyping(() => {
                this.addMessage('bot', 'What complexity level would you prefer?');
                this.showComplexityButtons();
            });
        };
        
        const platformBtn = document.createElement('button');
        platformBtn.className = 'action-btn';
        platformBtn.textContent = `Platform: ${this.selectedPlatform}`;
        platformBtn.onclick = () => {
            this.addMessage('user', 'Change Platform');
            this.showTyping(() => {
                this.addMessage('bot', 'Which AI platform would you like to optimize for?');
                this.showPlatformButtons();
            });
        };
        
        this.quickActions.appendChild(styleBtn);
        this.quickActions.appendChild(complexityBtn);
        this.quickActions.appendChild(platformBtn);
    }

    restart() {
        this.addMessage('user', '🏠 Start Fresh');
        this.resetSelections();
        this.showTyping(() => {
            this.addMessage('bot', '🎨 Welcome back to Chitra-Flux! Ready to create some amazing art prompts? Choose your category:');
            this.showCategoryButtons();
        });
    }

    resetSelections() {
        this.selectedCategory = null;
        this.selectedStyle = null;
        this.selectedComplexity = null;
        this.selectedPlatform = null;
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChitraFluxChatbot();
});

// Add some interactive features for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll to chatbot button
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'action-btn';
        scrollBtn.textContent = '💬 Start Chatting';
        scrollBtn.style.marginTop = '20px';
        scrollBtn.onclick = () => {
            document.querySelector('.chatbot-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        };
        
        const featuresDiv = heroSection.querySelector('.features');
        if (featuresDiv) {
            featuresDiv.parentNode.insertBefore(scrollBtn, featuresDiv.nextSibling);
        }
    }

    // Add copy functionality to prompts (will be added dynamically)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('prompt-text')) {
            navigator.clipboard.writeText(e.target.textContent).then(() => {
                const originalText = e.target.textContent;
                e.target.textContent = '✅ Copied!';
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 1000);
            });
        }
    });

    // Add hover effects to color swatches
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('color-swatch')) {
            const hexColor = e.target.style.backgroundColor;
            const tooltip = document.createElement('div');
            tooltip.className = 'color-tooltip';
            tooltip.textContent = e.target.title;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                top: ${e.pageY - 40}px;
                left: ${e.pageX - 30}px;
            `;
            document.body.appendChild(tooltip);
            
            e.target.addEventListener('mouseleave', () => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            });
        }
    });
});
