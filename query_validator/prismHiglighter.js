document.addEventListener('DOMContentLoaded', function() {
    // SQL Editor with Prism Syntax Highlighting
    const sqlQuery = document.getElementById('sqlQuery');
    const highlightedCode = document.getElementById('highlightedCode');
    const lineNumbers = document.getElementById('lineNumbers');
    const sqlEditor = document.getElementById('sqlEditor');
    
    // Initialize line numbers
    function updateLineNumbers() {
        const lines = sqlQuery.value.split('\n').length;
        let numbers = '';
        for (let i = 1; i <= lines; i++) {
            numbers += i + '\n';
        }
        lineNumbers.textContent = numbers;
    }
    
    // Update highlighted code
    function updateHighlightedCode() {
        const code = sqlQuery.value;
        highlightedCode.textContent = code;
        Prism.highlightElement(highlightedCode);
        updateLineNumbers();
    }
    
    // Sync textarea height with highlighted code
    function syncHeight() {
        sqlQuery.style.height = 'auto';
        const height = highlightedCode.offsetHeight;
        sqlQuery.style.height = height + 'px';
    }
    
    // Initialize
    updateHighlightedCode();
    syncHeight();
    sqlEditor.classList.add('with-line-numbers');
    
    // Event listeners
    sqlQuery.addEventListener('input', function() {
        updateHighlightedCode();
        syncHeight();
    });
    
    sqlQuery.addEventListener('scroll', function() {
        highlightedCode.scrollTop = sqlQuery.scrollTop;
        lineNumbers.scrollTop = sqlQuery.scrollTop;
    });
    
    sqlQuery.addEventListener('keydown', function(e) {
        // Handle tab key
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            
            this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
            
            updateHighlightedCode();
            syncHeight();
        }
    });
    
    // Modal functionality
    const step1Modal = document.getElementById('step1Modal');
    const mainContent = document.getElementById('mainContent');
    const doneBtn = document.getElementById('doneBtn');
    const backBtn = document.getElementById('backBtn');
    const changeOptionsBtn = document.getElementById('changeOptionsBtn');
    
    // Toggle between modal and main content
    function showMainContent() {
        step1Modal.style.display = 'none';
        mainContent.classList.add('active');
        backBtn.style.display = 'block';
    }
    
    function showStep1Modal() {
        step1Modal.style.display = 'flex';
        mainContent.classList.remove('active');
        backBtn.style.display = 'none';
    }
    
    doneBtn.addEventListener('click', showMainContent);
    backBtn.addEventListener('click', showMainContent);
    changeOptionsBtn.addEventListener('click', showStep1Modal);
    
    // SQL section toggle
    const sqlToggleHeader = document.getElementById('sqlToggleHeader');
    const sqlContainer = document.getElementById('sqlContainer');
    const sqlToggleButton = document.getElementById('sqlToggleButton');
    
    sqlToggleHeader.addEventListener('click', function() {
        this.classList.toggle('collapsed');
        sqlContainer.style.display = sqlContainer.style.display === 'none' ? 'block' : 'none';
        sqlToggleButton.style.display = sqlContainer.style.display === 'none' ? 'flex' : 'none';
    });
    
    sqlToggleButton.addEventListener('click', function() {
        sqlContainer.style.display = 'block';
        sqlToggleHeader.classList.remove('collapsed');
        this.style.display = 'none';
    });
    
    // Clear button
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', function() {
        sqlQuery.value = '';
        updateHighlightedCode();
        syncHeight();
    });
    
    // Validate button
    const validateBtn = document.getElementById('validateBtn');
    validateBtn.addEventListener('click', function() {
        // This is where you would implement the validation logic
        // For now, just showing a placeholder result
        const validationResults = document.getElementById('validationResults');
        validationResults.innerHTML = `
            <div class="success result-group">
                <div class="result-group-header">
                    <span class="result-group-icon">✓</span>Validation Complete
                </div>
                <div class="result-group-content">
                    <p>Your SQL query has been validated successfully.</p>
                    <div class="result-detail match">
                        <strong>Query:</strong> ${sqlQuery.value.substring(0, 100)}${sqlQuery.value.length > 100 ? '...' : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    // Checkbox highlighting functionality
    const checkboxItems = document.querySelectorAll('.checkbox-item');
    checkboxItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        
        item.addEventListener('click', function(e) {
            // Prevent toggling if clicking on dropdown
            if (e.target.tagName !== 'SELECT' && e.target.tagName !== 'OPTION') {
                checkbox.checked = !checkbox.checked;
            }
            
            // Add highlight class based on checkbox state
            if (checkbox.checked) {
                item.classList.add('highlight-success');
            } else {
                item.classList.remove('highlight-success');
            }
        });
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                item.classList.add('highlight-success');
            } else {
                item.classList.remove('highlight-success');
            }
        });
    });
    
    // Tier checkbox highlighting
    const tierCheckboxItems = document.querySelectorAll('.tier-checkbox-item');
    tierCheckboxItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        
        item.addEventListener('click', function(e) {
            // Prevent toggling if clicking on checkbox label
            if (e.target.tagName !== 'LABEL' && e.target.tagName !== 'INPUT') {
                checkbox.checked = !checkbox.checked;
            }
            
            // Add highlight class based on checkbox state
            if (checkbox.checked) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
        
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    });
});