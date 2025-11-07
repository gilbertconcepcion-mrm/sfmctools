// Prism SQL Syntax Highlighter for Textarea
(function() {
    const textarea = document.getElementById('sqlQuery');
    const highlightContainer = document.createElement('div');
    const highlightCode = document.createElement('code');
    const highlightPre = document.createElement('pre');
    
    let prismEnabled = false;
    let checkInterval = null;
    
    // Custom configuration for highlighting
    const customConfig = {
        key1: "AMC_Genre_targeting",
        key2: "Sendlist",
        key3: "Member",
        key4: "s.MemberStatus",
        key5: "sub.Status =",
        key6: "Tier",
        key7: "ACTION",
        key8: "ADVENTURE",
        key9: "ANIMATION",
        key10: "CLASSIC_CONCERT",
        key11: "COMEDY",
        key12: "DANCE",
        key13: "DOCUMENTARY",
        key14: "DRAMA",
        key15: "FAMILY",
        key16: "FANTASY",
        key17: "HORROR",
        key18: "MUSICAL",
        key19: "OPERA",
        key20: "ROCK_POP_CONCERT",
        key21: "ROMANCE",
        key22: "ROMANTIC_COMEDY",
        key23: "SCIENCE_FICTION",
        key24: "SPECIAL_EVENTS",
        key25: "SUSPENSE",
        key26: "THEATRE",
        key27: "WESTERN",
        key28: "ANIME",
        key29: "ARTISAN",
        key30: "THRILLS_AND_CHILLS",
        key31: "year, -13",
        key32: "year, -18",
        key33: "year, -21",
        key34: "_Complaint",
        key35: "AMC_MasterSuppression",
        key36: "AND s.[AMCStubsSpecialOfferOptInIndicator]",
        key37: "AND s.[AMCMyMoviesQueueOptIn]",
        key38: "AND s.[AMCStubsAccountInformationEmailOptin]",
        key39: "AND s.[AMCStubsMemberRewardsEmailOptin]",
        key40: "AND s.[AMCStubsMemberRewardsSummaryEmailOptIn]",
        key41: "FreshAddress_Exclusions_MRM",
        key42: "CLICK_ENGAGEMENT_LAST_6_MONTHS",
        key43: "LastOpen_6Months",
        key44: "sub.Status=",
        key45: "INNER JOIN",
        key46: ">= 13",
        key47: ">= 18",
        key48: ">= 21",
        key49: "WHERE Tier =",
        key50: "AND s.DateOfBirth",
        key51: "DEV1_PLACEHOLDER",
        key52: "DEV2_PLACEHOLDER",
        key53: "PLACEHOLDER_Sendlist",
        key54: "s.Age13to18Indicator",
        key55: "s.Age18to21Indicator",
        key56: "s.Age21PlusIndicator",
        sendList:"PLACEHOLDER_Sendlist",
        addField:"",
        joinField:"",
        devData1:"DEV1_PLACEHOLDER",
        devData2:"DEV2_PLACEHOLDER"
    };
    
    // Create Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'btn-secondary';
    editButton.style.cssText = `
        margin-bottom: 10px;
        padding: 8px 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        background-color: #6c757d;
        color: white;
        transition: all 0.3s ease;
        display:none !important;
    `;
    editButton.addEventListener('mouseover', () => {
        editButton.style.backgroundColor = '#5a6268';
    });
    editButton.addEventListener('mouseout', () => {
        editButton.style.backgroundColor = '#6c757d';
    });
    
    // Insert Edit button before textarea
    const sqlContainer = textarea.parentElement;
    sqlContainer.insertBefore(editButton, textarea);
    
    // Setup highlight container
    highlightContainer.className = 'highlight-container';
    highlightCode.className = 'language-sql';
    highlightPre.appendChild(highlightCode);
    highlightContainer.appendChild(highlightPre);
    
    // Style the highlight container
    highlightContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        pointer-events: none;
        overflow: visible;
        background-color: #000000;
        border-radius: 6px;
        padding: 15px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
        line-height: 1.6;
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-word;
        color: transparent;
        box-sizing: border-box;
    `;
    
    highlightPre.style.cssText = `
        margin: 0;
        padding: 0;
        background: transparent;
        overflow: visible;
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-word;
        line-height: 1.6;
    `;
    
    highlightCode.style.cssText = `
        background: transparent;
        color: #ffffff;
        text-shadow: none;
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-word;
        display: block;
        overflow-wrap: break-word;
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
        line-height: 1.6;
    `;
    
    // Make textarea container position relative
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    sqlContainer.insertBefore(wrapper, textarea);
    wrapper.appendChild(highlightContainer);
    wrapper.appendChild(textarea);
    
    // Default textarea style (no Prism)
    const defaultTextareaStyle = `
        position: relative;
        z-index: 1;
        background-color: #000000;
        color: #ffffff;
        caret-color: #ffffff;
        width: 100%;
        min-height: 100px;
        overflow: hidden;
        padding: 15px;
        border: 1px solid #ced4da;
        border-radius: 6px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
        line-height: 1.6;
        resize: none;
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-word;
        overflow-wrap: break-word;
        box-sizing: border-box;
    `;
    
    // Prism-enabled textarea style
    const prismTextareaStyle = `
        position: relative;
        z-index: 1;
        background-color: transparent;
        color: #ffffff;
        caret-color: #ffffff;
        width: 100%;
        min-height: 100px;
        overflow: hidden;
        padding: 15px;
        border: 1px solid #ced4da;
        border-radius: 6px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
        line-height: 1.6;
        resize: none;
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-word;
        overflow-wrap: break-word;
        -webkit-text-fill-color: transparent;
        box-sizing: border-box;
    `;
    
    // Set default style
    textarea.style.cssText = defaultTextareaStyle;
    
    // Create a style element to override Prism token font sizes and add custom highlighting
    const prismOverrideStyle = document.createElement('style');
    prismOverrideStyle.textContent = `
        .highlight-container .token {
            font-size: 14px !important;
            font-family: 'Courier New', Courier, monospace !important;
        }
        .highlight-container .token.config-highlight {
            color: #ff9d00 !important;
            font-weight: bold !important;
        }
    `;
    document.head.appendChild(prismOverrideStyle);
    
    // Collect values from config object
    function collectValues(obj, values = new Set()) {
        for (const key in obj) {
            const val = obj[key];
            if (typeof val === 'string' && val.trim() !== '') {
                values.add(val.trim());
            } else if (typeof val === 'object' && val !== null) {
                collectValues(val, values);
            }
        }
        return values;
    }
    
    // Add Prism highlight rules for all non-empty config values
    function highlightConfigValues(config, language = 'sql') {
        // Reset Prism languages to avoid duplicate rules
        if (Prism && Prism.languages && Prism.languages.sql) {
            // Remove any existing config-values rule
            if (Prism.languages.sql['config-values']) {
                delete Prism.languages.sql['config-values'];
            }
            
            const values = collectValues(config);
            if (values.size === 0) return;
            
            const combinedPattern = Array.from(values)
                .map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // escape regex
                .join('|');
            
            const customRule = {
                pattern: new RegExp(`(?<![\\w'])(${combinedPattern})(?![\\w'])`, 'g'),
                alias: 'config-highlight'
            };
            
            Prism.languages.insertBefore(language, 'keyword', {
                'config-values': customRule
            });
            
            return values;
        }
    }
    
    // Auto-resize textarea to fit content
    function autoResize() {
        // Reset height to auto to get accurate scrollHeight
        textarea.style.height = 'auto';
        
        // Calculate the actual content height
        const scrollHeight = textarea.scrollHeight;
        const newHeight = Math.max(100, scrollHeight);
        
        // Set both textarea and highlight container to same height
        textarea.style.height = newHeight + 'px';
        
        if (prismEnabled) {
            highlightContainer.style.height = newHeight + 'px';
            
            // Force the wrapper to match the textarea height
            wrapper.style.height = newHeight + 'px';
        } else {
            wrapper.style.height = 'auto';
        }
    }
    
    // Enable Prism highlighting
    function enablePrism() {
        prismEnabled = true;
        textarea.style.cssText = prismTextareaStyle;
        highlightContainer.style.display = 'block';
        updateHighlight();
    }
    
    // Disable Prism highlighting
    function disablePrism() {
        prismEnabled = false;
        textarea.style.cssText = defaultTextareaStyle;
        highlightContainer.style.display = 'none';
        highlightCode.textContent = '';
        autoResize();
    }
    
    // Update highlighting
    function updateHighlight() {
        if (!prismEnabled) {
            return;
        }
        
        const text = textarea.value;
        
        if (text.trim() === '') {
            // If empty, show placeholder effect
            highlightCode.textContent = '';
            textarea.style.height = '100px';
            highlightContainer.style.height = '100px';
            wrapper.style.height = '100px';
            return;
        }
        
        // Update highlighted code
        highlightCode.textContent = text;
        
        // Apply custom highlighting before Prism highlighting
        highlightConfigValues(customConfig);
        
        // Apply Prism highlighting if available
        if (typeof Prism !== 'undefined') {
            Prism.highlightElement(highlightCode);
        }
        
        // Use setTimeout to ensure DOM is updated before calculating height
        setTimeout(() => {
            autoResize();
        }, 0);
    }
    
    // Request animation frame for smooth updates
    let rafId = null;
    function scheduleUpdate() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(updateHighlight);
    }
    
    // Check if textarea has content and enable Prism if needed
    function checkTextareaContent() {
        if (textarea.value.trim() !== '' && !prismEnabled) {
            enablePrism();
        } else if (textarea.value.trim() === '' && prismEnabled) {
            disablePrism();
        }
    }
    
    // Start checking textarea content periodically
    function startContentCheck() {
        // Check immediately
        checkTextareaContent();
        
        // Set up interval to check regularly
        if (checkInterval) {
            clearInterval(checkInterval);
        }
        checkInterval = setInterval(checkTextareaContent, 500); // Check every 500ms
    }
    
    // Event listeners
    textarea.addEventListener('input', () => {
        if (prismEnabled) {
            scheduleUpdate();
        } else {
            checkTextareaContent();
        }
        autoResize();
    });
    
    // Also check on paste event
    textarea.addEventListener('paste', () => {
        setTimeout(() => {
            checkTextareaContent();
        }, 10);
    });
    
    // Edit button click handler
    editButton.addEventListener('click', () => {
        disablePrism();
    });
    
    // Integrate with existing buttons
    const validateBtn = document.getElementById('validateBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    if (validateBtn) {
        validateBtn.addEventListener('click', () => {
            if (textarea.value.trim() !== '') {
                enablePrism();
            }
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            textarea.value = '';
            disablePrism();
        });
    }
    
    // Handle textarea resize observer for wrapper changes
    const resizeObserver = new ResizeObserver(() => {
        autoResize();
    });
    resizeObserver.observe(textarea);
    
    // Initial state - Prism disabled
    disablePrism();
    
    // Load Prism CSS and JS
    function loadPrism() {
        // Load Prism CSS
        const prismCSS = document.createElement('link');
        prismCSS.rel = 'stylesheet';
        prismCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
        document.head.appendChild(prismCSS);
        
        // Load Prism JS
        const prismJS = document.createElement('script');
        prismJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
        prismJS.onload = () => {
            // Load SQL language component
            const prismSQL = document.createElement('script');
            prismSQL.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-sql.min.js';
            prismSQL.onload = () => {
                // Apply custom highlighting rules
                highlightConfigValues(customConfig);
                
                // Start checking content after Prism is loaded
                startContentCheck();
            };
            document.head.appendChild(prismSQL);
        };
        document.head.appendChild(prismJS);
    }
    
    // Load Prism on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPrism);
    } else {
        loadPrism();
    }
})();