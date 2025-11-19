       // Function to reset all highlights to default
        function resetHighlights() {
            document.querySelectorAll('.checkbox-item').forEach(item => {
                item.classList.remove('highlight-success', 'highlight-warning', 'highlight-error', 'highlight-flag');
            });
            document.getElementById('tierSelectionContainer').classList.remove('highlight-success', 'highlight-warning', 'highlight-error', 'highlight-flag');
        }
        
        // Function to show the full interface
        function showFullInterface() {
            document.querySelector('header').classList.remove('hidden');
            document.getElementById('tierSelectionContainer').classList.remove('hidden');
            document.getElementById('sqlSection').classList.remove('hidden');
            document.getElementById('backBtn').style.display = 'none';
            
            // Reset SQL container visibility
            const sqlContainer = document.getElementById('sqlContainer');
            const sqlToggleHeader = document.getElementById('sqlToggleHeader');
            const sqlToggleButton = document.getElementById('sqlToggleButton');
            
            sqlContainer.style.display = 'block';
            sqlToggleHeader.classList.remove('collapsed');
            sqlToggleButton.classList.remove('collapsed');
            sqlToggleHeader.style.display = 'flex';
            sqlToggleButton.style.display = 'none';
        }
        
        // Implement single selection for tier checkboxes
        document.addEventListener('DOMContentLoaded', function() {
            const tierCheckboxes = document.querySelectorAll('input[name="tier"]');
            
            tierCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        // Uncheck all other tier checkboxes
                        tierCheckboxes.forEach(otherCheckbox => {
                            if (otherCheckbox !== this) {
                                otherCheckbox.checked = false;
                                // Remove selected class from parent
                                const parentItem = otherCheckbox.closest('.tier-checkbox-item');
                                if (parentItem) {
                                    parentItem.classList.remove('selected');
                                }
                            }
                        });
                        // Add selected class to parent
                        const parentItem = this.closest('.tier-checkbox-item');
                        if (parentItem) {
                            parentItem.classList.add('selected');
                        }
                    } else {
                        // Remove selected class from parent
                        const parentItem = this.closest('.tier-checkbox-item');
                        if (parentItem) {
                            parentItem.classList.remove('selected');
                        }
                    }
                });
            });
            
            // Add click event listeners to tier checkbox items
            const tierCheckboxItems = document.querySelectorAll('.tier-checkbox-item');

            tierCheckboxItems.forEach(item => {
                item.addEventListener('click', function(event) {
                    // Check if the click was on the checkbox itself
                    if (event.target.type === 'checkbox') {
                        return; // Let the checkbox handle its own click
                    }

                    // Check if the click was on the label
                    if (event.target.tagName === 'LABEL') {
                        return; // Let the label handle its own click
                    }

                    // For clicks on the container (but not on checkbox or label)
                    const checkbox = this.querySelector('input[type="checkbox"]');
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                        // Trigger change event to update selection
                        checkbox.dispatchEvent(new Event('change'));
                    }
                });
            });
            
            // Add click event listeners to checkbox containers
            const checkboxContainers = document.querySelectorAll('.checkbox-item');
            
            checkboxContainers.forEach(container => {
                container.addEventListener('click', function(event) {
                    // Don't toggle if clicking on dropdowns or their labels
                    if (event.target.tagName === 'SELECT' || 
                        event.target.tagName === 'OPTION' ||
                        event.target.classList.contains('genre-dropdown') ||
                        event.target.classList.contains('age-dropdown') ||
                        event.target.classList.contains('optin-dropdown') ||
                        event.target.classList.contains('small-text')) {
                        return;
                    }
                    
                    // Don't toggle if clicking directly on the checkbox (to avoid double toggle)
                    if (event.target.classList.contains('form-check-input')) {
                        return;
                    }
                    
                    // Get the checkbox ID from the data attribute
                    const checkboxId = this.getAttribute('data-checkbox');
                    if (checkboxId) {
                        const checkbox = document.getElementById(checkboxId);
                        if (checkbox) {
                            checkbox.checked = !checkbox.checked;
                        }
                    }
                });
            });
            
            // Done button - close modal and show main content
            document.getElementById('doneBtn').addEventListener('click', function() {
                document.getElementById('step1Modal').style.display = 'none';
                document.getElementById('mainContent').classList.add('active');
            });
            
            // Change Options button - show modal and hide main content
            document.getElementById('changeOptionsBtn').addEventListener('click', function() {
                // Reset highlights before showing modal
                resetHighlights();
                
                document.getElementById('step1Modal').style.display = 'flex';
                document.getElementById('mainContent').classList.remove('active');
            });
            
            // Back button - show the full interface
            document.getElementById('backBtn').addEventListener('click', function() {
                showFullInterface();
            });
            
            // SQL Container toggle functionality
            const sqlContainer = document.getElementById('sqlContainer');
            const sqlToggleHeader = document.getElementById('sqlToggleHeader');
            const sqlToggleButton = document.getElementById('sqlToggleButton');
            
            // Initially show the header toggle and hide the button toggle
            sqlToggleHeader.style.display = 'flex';
            sqlToggleButton.style.display = 'none';
            
            // Function to toggle SQL container
            function toggleSqlContainer() {
                if (sqlContainer.style.display === 'none') {
                    sqlContainer.style.display = 'block';
                    sqlToggleHeader.classList.remove('collapsed');
                    sqlToggleButton.classList.remove('collapsed');
                    
                    // Show header toggle, hide button toggle
                    sqlToggleHeader.style.display = 'flex';
                    sqlToggleButton.style.display = 'none';
                } else {
                    sqlContainer.style.display = 'none';
                    sqlToggleHeader.classList.add('collapsed');
                    sqlToggleButton.classList.add('collapsed');
                    
                    // Hide header toggle, show button toggle
                    sqlToggleHeader.style.display = 'none';
                    sqlToggleButton.style.display = 'flex';
                }
            }
            
            // Add event listeners to both toggle buttons
            sqlToggleHeader.addEventListener('click', toggleSqlContainer);
            sqlToggleButton.addEventListener('click', toggleSqlContainer);
        });
        
        document.getElementById('validateBtn').addEventListener('click', function() {
            const sqlQuery = document.getElementById('sqlQuery').value;
            const resultsContainer = document.getElementById('validationResults');
            const sqlContainer = document.getElementById('sqlContainer');
            const sqlToggleHeader = document.getElementById('sqlToggleHeader');
            const sqlToggleButton = document.getElementById('sqlToggleButton');
            const tierSelectionContainer = document.getElementById('tierSelectionContainer');
            const sqlSection = document.getElementById('sqlSection');
            const header = document.querySelector('header');
            const backBtn = document.getElementById('backBtn');
            
            // Hide everything except results section and the show SQL button
            header.classList.add('hidden');
            tierSelectionContainer.classList.add('hidden');
            sqlSection.classList.add('hidden');
            
            // Show the back button
            backBtn.style.display = 'block';
            
            // Make sure the show SQL button is visible
            sqlToggleButton.style.display = 'flex';
            
            // Collapse the SQL container when validating
            sqlContainer.style.display = 'none';
            sqlToggleHeader.classList.add('collapsed');
            sqlToggleButton.classList.add('collapsed');
            
            resultsContainer.innerHTML = '';
            
            if (!sqlQuery.trim()) {
                resultsContainer.innerHTML = '<div class="error result-group"><div class="result-group-header"><span class="result-group-icon">✗</span>Error</div><div class="result-group-content">Please enter a SQL query to validate.</div></div>';
                return;
            }
            
            // Clear all highlights before validation
            resetHighlights();
            
            let hasValidations = false;
            let successCount = 0;
            let warningCount = 0;
            let errorCount = 0;
            let flagCount = 0;
            let resultsHTML = '';
            
            // Create an object to store grouped results
            const groupedResults = {};
            
            // Genre Selection Validation
            const genreSelectedChecked = document.getElementById('genreSelected').checked;
            const selectedGenre = document.getElementById('genres').value;
            const hasGenreJoin = sqlQuery.includes('INNER JOIN [AMC_Genre_targeting]');
            
            // Check if the selected genre column exists in the query
            let hasGenreColumn = false;
            if (selectedGenre !== 'NONE') {
                hasGenreColumn = sqlQuery.includes('' + selectedGenre + '');
            }
            
            // Get all genre options for checking what's found in the query
            const genreOptions = [
                'ACTION', 'ADVENTURE', 'ANIMATION', 'CLASSIC_CONCERT', 'COMEDY', 
                'DANCE', 'DOCUMENTARY', 'DRAMA', 'FAMILY', 'FANTASY', 'HORROR', 
                'MUSICAL', 'OPERA', 'ROCK_POP_CONCERT', 'ROMANCE', 'ROMANTIC_COMEDY', 
                'SCIENCE_FICTION', 'SPECIAL_EVENTS', 'SUSPENSE', 'THEATRE', 'WESTERN', 
                'ANIME', 'ARTISAN', 'THRILLS_AND_CHILLS'
            ];
            
            // Find all genre columns that exist in the query
            let foundGenreColumns = [];
            genreOptions.forEach(genre => {
                if (sqlQuery.includes('al.[' + genre + ']') || sqlQuery.includes('al.' + genre + '')) {
                    foundGenreColumns.push(genre);
                }
            });
            
            if (genreSelectedChecked) {
                hasValidations = true;
                
                // Check if NONE is selected
                if (selectedGenre === 'NONE') {
                    if (foundGenreColumns.length === 0) {
                        successCount++;
                        groupedResults['genre'] = {
                            status: 'success',
                            title: 'Genre Selection',
                            icon: '✓',
                            content: 'N/A selected and no genre columns found in query'
                        };
                        document.querySelector('[data-checkbox="genreSelected"]').classList.add('highlight-success');
                    } else {
                        errorCount++;
                        groupedResults['genre'] = {
                            status: 'error',
                            title: 'Genre Selection',
                            icon: '✗',
                            content: 'N/A selected but genre columns found in query',
                            details: 'Query contains: ' + foundGenreColumns.join(', ')
                        };
                        document.querySelector('[data-checkbox="genreSelected"]').classList.add('highlight-error');
                    }
                } else {
                    // Check if selected genre column exists in query
                    if (hasGenreJoin && hasGenreColumn) {
                        successCount++;
                        groupedResults['genre'] = {
                            status: 'success',
                            title: 'Genre Selection',
                            icon: '✓',
                            content: 'AMC_Genre_targeting is joined and genre column exists',
                            details: 'Selected genre column: ' + selectedGenre + ''
                        };
                        document.querySelector('[data-checkbox="genreSelected"]').classList.add('highlight-success');
                    } else if (hasGenreJoin) {
                        warningCount++;
                        let foundGenresText = foundGenreColumns.length > 0 ? 
                            'Found in query: ' + foundGenreColumns.join(', ') : 
                            'No genre columns found in query';
                            
                        groupedResults['genre'] = {
                            status: 'warning',
                            title: 'Genre Selection',
                            icon: '⚠',
                            content: 'AMC_Genre_targeting is joined but genre column is missing',
                            details: 'Selected: ' + selectedGenre + ' | Not found in query',
                            foundItems: foundGenresText
                        };
                        document.querySelector('[data-checkbox="genreSelected"]').classList.add('highlight-warning');
                    } else {
                        errorCount++;
                        groupedResults['genre'] = {
                            status: 'error',
                            title: 'Genre Selection',
                            icon: '✗',
                            content: 'AMC_Genre_targeting join is missing'
                        };
                        document.querySelector('[data-checkbox="genreSelected"]').classList.add('highlight-error');
                    }
                }
            } else if (hasGenreJoin) {
                // Flag if checkbox is unchecked but condition exists in query
                flagCount++;
                let foundGenresText = foundGenreColumns.length > 0 ? 
                    'Found in query: ' + foundGenreColumns.join(', ') : 
                    '';
                    
                groupedResults['genre'] = {
                    status: 'flag',
                    title: 'Genre Selection',
                    icon: '🚩',
                    content: 'Genre Selection is not checked but genre-related conditions exist in query',
                    flagMessage: 'Query contains genre-related conditions but the Genre Selection checkbox is not checked. This might indicate a mismatch between your selection and the query.',
                    foundItems: foundGenresText
                };
                document.querySelector('[data-checkbox="genreSelected"]').classList.add('highlight-flag');
            }
            
            // Member Status Validation
            const memberStatusChecked = document.getElementById('memberStatus').checked;
            const hasMemberStatus = sqlQuery.includes('s.MemberStatus = \'Member\'');
            const hasNonMemberStatus = sqlQuery.includes('s.MemberStatus = \'Non-Member\'');
            
            if (memberStatusChecked) {
                hasValidations = true;
                if (hasMemberStatus) {
                    successCount++;
                    groupedResults['memberStatus'] = {
                        status: 'success',
                        title: 'Member Status',
                        icon: '✓',
                        content: 'MemberStatus is set to "Member"'
                    };
                    document.querySelector('[data-checkbox="memberStatus"]').classList.add('highlight-success');
                } else if (hasNonMemberStatus) {
                    successCount++;
                    groupedResults['memberStatus'] = {
                        status: 'success',
                        title: 'Member Status',
                        icon: '✓',
                        content: 'MemberStatus is set to "Non-Member"'
                    };
                    document.querySelector('[data-checkbox="memberStatus"]').classList.add('highlight-success');
                } else {
                    errorCount++;
                    groupedResults['memberStatus'] = {
                        status: 'error',
                        title: 'Member Status',
                        icon: '✗',
                        content: 'MemberStatus condition is missing'
                    };
                    document.querySelector('[data-checkbox="memberStatus"]').classList.add('highlight-error');
                }
            } else if (hasMemberStatus || hasNonMemberStatus) {
                // Flag if checkbox is unchecked but condition exists in query
                flagCount++;
                groupedResults['memberStatus'] = {
                    status: 'flag',
                    title: 'Member Status',
                    icon: '🚩',
                    content: 'Member Status is not checked but MemberStatus condition exists in query',
                    flagMessage: 'Query contains MemberStatus condition but the Member Status checkbox is not checked. This might indicate a mismatch between your selection and the query.'
                };
                document.querySelector('[data-checkbox="memberStatus"]').classList.add('highlight-flag');
            }
            
            // Opt-in Selector Validation
            const optInSelectorChecked = document.getElementById('optInSelector').checked;
            const selectedOptIn = document.getElementById('emailOptIn').value;
            
            if (optInSelectorChecked) {
                hasValidations = true;
                
                // Check if NA is selected
                if (selectedOptIn === '') {
                    // Check if any opt-in conditions exist in the query
                    const optInOptions = [
                        `s.[AMCStubsSpecialOfferOptInIndicator] = 'Y'`,
                        `s.[AMCMyMoviesQueueOptIn] = 'Y'`,
                        `s.[AMCStubsAccountInformationEmailOptin] = 'Y'`,
                        `s.[AMCStubsMemberRewardsEmailOptin] = 'Y'`,
                        `s.AMCStubsMemberRewardsSummaryEmailOptIn = 'Y'`,
                        `s.AMCStubsSpecialOfferOptInIndicator = 'Y'`,
                        `s.AMCMyMoviesQueueOptIn = 'Y'`,
                        `s.AMCStubsAccountInformationEmailOptin = 'Y'`,
                        `s.AMCStubsMemberRewardsEmailOptin = 'Y'`,
                        `s.AMCStubsMemberRewardsSummaryEmailOptIn = 'Y'`
                    ];

                    let foundOptIns = [];
                    optInOptions.forEach(optIn => {
                        if (sqlQuery.includes(optIn)) {
                            foundOptIns.push(optIn);
                        }
                    });
                    
                    if (foundOptIns.length === 0) {
                        successCount++;
                        groupedResults['optIn'] = {
                            status: 'success',
                            title: 'Opt-in Selector',
                            icon: '✓',
                            content: 'N/A selected and no opt-in conditions found in query'
                        };
                        document.querySelector('[data-checkbox="optInSelector"]').classList.add('highlight-success');
                    } else {
                        errorCount++;
                        groupedResults['optIn'] = {
                            status: 'error',
                            title: 'Opt-in Selector',
                            icon: '✗',
                            content: 'N/A selected but opt-in conditions found in query',
                            details: 'Query contains: ' + foundOptIns.join(', ')
                        };
                        document.querySelector('[data-checkbox="optInSelector"]').classList.add('highlight-error');
                    }
                } else {
                    // Check if selected opt-in exists in query
                    if (sqlQuery.includes(`s.[${selectedOptIn}] = 'Y'`) || sqlQuery.includes(`s.${selectedOptIn} = 'Y'`)) {
                        successCount++;
                        groupedResults['optIn'] = {
                            status: 'success',
                            title: 'Opt-in Selector',
                            icon: '✓',
                            content: 'Selected opt-in condition is present in query',
                            details: 'Selected opt-in: ' + selectedOptIn
                        };
                        document.querySelector('[data-checkbox="optInSelector"]').classList.add('highlight-success');
                    } else {
                        errorCount++;
                        // Show what opt-ins were found in the query
                        const optInOptions = [
                            'AMCStubsSpecialOfferOptInIndicator',
                            'AMCMyMoviesQueueOptIn',
                            'AMCStubsAccountInformationEmailOptin',
                            'AMCStubsMemberRewardsEmailOptin',
                            'AMCStubsMemberRewardsSummaryEmailOptIn'
                        ];
                        
                        let foundOptIns = [];
                        optInOptions.forEach(optIn => {
                            if (sqlQuery.includes(`s.[${optIn}] = 'Y'`)) {
                                foundOptIns.push(`s.[${optIn}] = 'Y'`);
                            }
                        });
                        
                        let foundOptInsText = foundOptIns.length > 0 ? 
                            'Found in query: ' + foundOptIns.join(', ') : 
                            'No opt-in conditions found in query';
                            
                        groupedResults['optIn'] = {
                            status: 'error',
                            title: 'Opt-in Selector',
                            icon: '✗',
                            content: 'Selected opt-in condition is missing',
                            details: 'Selected: ' + selectedOptIn + ' | Not found in query',
                            foundItems: foundOptInsText
                        };
                        document.querySelector('[data-checkbox="optInSelector"]').classList.add('highlight-error');
                    }
                }
            } else {
                // Check if any opt-in conditions exist in the query for flagging
                const optInOptions = [
                    'AMCStubsSpecialOfferOptInIndicator',
                    'AMCMyMoviesQueueOptIn',
                    'AMCStubsAccountInformationEmailOptin',
                    'AMCStubsMemberRewardsEmailOptin',
                    'AMCStubsMemberRewardsSummaryEmailOptIn'
                ];
                
                let foundOptIns = [];
                optInOptions.forEach(optIn => {
                    if (sqlQuery.includes(optIn)) {
                        foundOptIns.push(optIn);
                    }
                });
                
                if (foundOptIns.length > 0) {
                    // Flag if checkbox is unchecked but condition exists in query
                    flagCount++;
                    groupedResults['optIn'] = {
                        status: 'flag',
                        title: 'Opt-in Selector',
                        icon: '🚩',
                        content: 'Opt-in Selector is not checked but opt-in conditions exist in query',
                        flagMessage: 'Query contains opt-in conditions but the Opt-in Selector checkbox is not checked. This might indicate a mismatch between your selection and the query.',
                        details: 'Query contains: ' + foundOptIns.join(', ')
                    };
                    document.querySelector('[data-checkbox="optInSelector"]').classList.add('highlight-flag');
                }
            }
            
            // Tier Selection Validation - Fixed to handle exclusive words properly
            const selectedTierCheckbox = document.querySelector('input[name="tier"]:checked');
            const selectedTier = selectedTierCheckbox ? selectedTierCheckbox.value : null;
            const selectedTierName = selectedTierCheckbox ? selectedTierCheckbox.getAttribute('data-tier-name') : null;
            const tierSelectionChecked = selectedTierCheckbox !== null; // If any tier is selected, consider it checked
            
            // Define all possible tier values with exact match patterns
            // Order matters here - check for A-List_Classic before A-List to avoid false matches
            
            const tierPatterns = [
              { 
                value: 'A-List_Classic', 
                name: 'A-List_Classic', 
                pattern: /'A-List_Classic'/g  // Changed from 'A-List Classic' to 'A-List_Classic'
              },
              { 
                value: 'A-List', 
                name: 'A-List', 
                pattern: /'A-List'(?!_Classic| Classic)/g  // Updated to exclude both formats
              },
              { 
                value: 'Insider', 
                name: 'Insider', 
                pattern: /'Insider'/g 
              },
              { 
                value: 'Premiere', 
                name: 'Premiere', 
                pattern: /'Premiere'(?!Go)/g
              },
              { 
                value: 'PremiereGo', 
                name: 'PremiereGo', 
                pattern: /'PremiereGo'/g 
              }
            ];
            
            // Find all tier values that exist in the query using exact matching
            let foundTiers = [];
            tierPatterns.forEach(tier => {
                if (tier.pattern.test(sqlQuery)) {
                    foundTiers.push(tier.value);
                }
                // Reset regex lastIndex for next test
                tier.pattern.lastIndex = 0;
            });
            
            if (tierSelectionChecked) {
                hasValidations = true;
                
                // Check if selected tier exists in query
                if (foundTiers.includes(selectedTier)) {
                    successCount++;
                    groupedResults['tier'] = {
                        status: 'success',
                        title: 'Tier Selection',
                        icon: '✓',
                        content: 'Selected tier matches query',
                        details: 'Selected tier: ' + selectedTierName
                    };
                    document.getElementById('tierSelectionContainer').classList.add('highlight-success');
                } else if (foundTiers.length > 0) {
                    warningCount++;
                    // Convert found tier values to names for display
                    let foundTierNames = [];
                    foundTiers.forEach(tierValue => {
                        const tierPattern = tierPatterns.find(p => p.value === tierValue);
                        if (tierPattern) {
                            foundTierNames.push(tierPattern.name);
                        }
                    });
                    
                    groupedResults['tier'] = {
                        status: 'warning',
                        title: 'Tier Selection',
                        icon: '⚠',
                        content: 'Selected tier does not match query',
                        details: 'Selected: ' + selectedTierName + ' | Not found in query',
                        foundItems: 'Found in query: ' + foundTierNames.join(', ')
                    };
                    document.getElementById('tierSelectionContainer').classList.add('highlight-warning');
                } else {
                    errorCount++;
                    groupedResults['tier'] = {
                        status: 'error',
                        title: 'Tier Selection',
                        icon: '✗',
                        content: 'Tier condition is missing'
                    };
                    document.getElementById('tierSelectionContainer').classList.add('highlight-error');
                }
            } else if (foundTiers.length > 0) {
                // Flag if no tier is selected but condition exists in query
                flagCount++;
                // Convert found tier values to names for display
                let foundTierNames = [];
                foundTiers.forEach(tierValue => {
                    const tierPattern = tierPatterns.find(p => p.value === tierValue);
                    if (tierPattern) {
                        foundTierNames.push(tierPattern.name);
                    }
                });
                
                groupedResults['tier'] = {
                    status: 'flag',
                    title: 'Tier Selection',
                    icon: '🚩',
                    content: 'No tier selected but tier condition exists in query',
                    flagMessage: 'Query contains tier condition but no tier is selected. This might indicate a mismatch between your selection and the query.',
                    foundItems: 'Found in query: ' + foundTierNames.join(', ')
                };
                document.getElementById('tierSelectionContainer').classList.add('highlight-flag');
            }
            
            // Age Selection Validation - Enhanced to check for both patterns
            const ageSelectionChecked = document.getElementById('ageSelection').checked;
            const selectedAge = document.getElementById('age').value;

            // Define age indicator patterns
            const age13 = `AND (s.Age13to18Indicator = 'Y' OR s.Age18to21Indicator = 'Y' OR s.Age21PlusIndicator = 'Y')`;
            const age18 = `AND (s.Age18to21Indicator = 'Y' OR s.Age21PlusIndicator = 'Y')`;
            const age21 = `AND s.Age21PlusIndicator = 'Y'`;

            // Check if query contains DateOfBirth patterns (these should NOT be used)
            const ageFlags1 = sqlQuery.match(/DATEADD\(year,\s*-(\d+),\s*GETDATE\(\)\)/i);
            const ageFlags2 = sqlQuery.match(/DATEDIFF\(yy,\s*s\.DateOfBirth,\s*GETDATE\(\)\)\s*>=\s*(\d+)/i);

            // If DateOfBirth patterns are found, show error
            if (ageFlags1 || ageFlags2) {
                errorCount++;
                hasValidations = true;
                const dobPattern = ageFlags1 ? 'DATEADD' : 'DATEDIFF';
                const dobAge = ageFlags1 ? ageFlags1[1] : ageFlags2[1];

                groupedResults['age'] = {
                    status: 'error',
                    title: 'Age Selection',
                    icon: '✗',
                    content: 'Query contains DateOfBirth condition - Age Indicators must be used instead',
                    details: `Found ${dobPattern} pattern with age ${dobAge}. Please use Age Indicators (Age13to18Indicator, Age18to21Indicator, Age21PlusIndicator) instead of DateOfBirth calculations.`
                };
                document.querySelector('[data-checkbox="ageSelection"]').classList.add('highlight-error');
            } else if (ageSelectionChecked) {
                hasValidations = true;

                // Check if NA is selected
                if (selectedAge === 'NA') {
                    // Check if any age indicator is present in query
                    const hasAgeIndicator = sqlQuery.includes('Age13to18Indicator') || 
                                           sqlQuery.includes('Age18to21Indicator') || 
                                           sqlQuery.includes('Age21PlusIndicator');

                    if (!hasAgeIndicator) {
                        successCount++;
                        groupedResults['age'] = {
                            status: 'success',
                            title: 'Age Selection',
                            icon: '✓',
                            content: 'N/A selected and no age indicators found in query'
                        };
                        document.querySelector('[data-checkbox="ageSelection"]').classList.add('highlight-success');
                    } else {
                        errorCount++;
                        groupedResults['age'] = {
                            status: 'error',
                            title: 'Age Selection',
                            icon: '✗',
                            content: 'N/A selected but age indicators found in query'
                        };
                        document.querySelector('[data-checkbox="ageSelection"]').classList.add('highlight-error');
                    }
                } else {
                    // Check if selected age matches query age indicators
                    let expectedPattern = '';
                    let patternFound = false;

                    if (selectedAge === '13') {
                        expectedPattern = age13;
                        patternFound = sqlQuery.includes("Age13to18Indicator = 'Y'") && 
                                      sqlQuery.includes("Age18to21Indicator = 'Y'") && 
                                      sqlQuery.includes("Age21PlusIndicator = 'Y'");
                    } else if (selectedAge === '18') {
                        expectedPattern = age18;
                        patternFound = sqlQuery.includes("Age18to21Indicator = 'Y'") && 
                                      sqlQuery.includes("Age21PlusIndicator = 'Y'") &&
                                      !sqlQuery.includes("Age13to18Indicator = 'Y'");
                    } else if (selectedAge === '21') {
                        expectedPattern = age21;
                        patternFound = sqlQuery.includes("Age21PlusIndicator = 'Y'") &&
                                      !sqlQuery.includes("Age13to18Indicator = 'Y'") &&
                                      !sqlQuery.includes("Age18to21Indicator = 'Y'");
                    }

                    if (patternFound) {
                        successCount++;
                        groupedResults['age'] = {
                            status: 'success',
                            title: 'Age Selection',
                            icon: '✓',
                            content: 'Age indicators are present and match selection',
                            details: 'Selected age: ' + selectedAge
                        };
                        document.querySelector('[data-checkbox="ageSelection"]').classList.add('highlight-success');
                    } else {
                        errorCount++;
                        groupedResults['age'] = {
                            status: 'error',
                            title: 'Age Selection',
                            icon: '✗',
                            content: 'Age indicators are missing or do not match selection',
                            details: 'Selected age: ' + selectedAge + ' | Expected pattern: ' + expectedPattern
                        };
                        document.querySelector('[data-checkbox="ageSelection"]').classList.add('highlight-error');
                    }
                }
            } else {
                // Check if age indicators exist when checkbox is unchecked
                const hasAgeIndicator = sqlQuery.includes('Age13to18Indicator') || 
                                       sqlQuery.includes('Age18to21Indicator') || 
                                       sqlQuery.includes('Age21PlusIndicator');

                if (hasAgeIndicator) {
                    flagCount++;
                    groupedResults['age'] = {
                        status: 'flag',
                        title: 'Age Selection',
                        icon: '🚩',
                        content: 'Age Selection is not checked but age indicators exist in query',
                        flagMessage: 'Query contains age indicators but the Age Selection checkbox is not checked. This might indicate a mismatch between your selection and the query.'
                    };
                    document.querySelector('[data-checkbox="ageSelection"]').classList.add('highlight-flag');
                }
            }
            
            // Active Status Validation
            const activeStatusChecked = document.getElementById('activeStatus').checked;
            const hasActiveStatus = sqlQuery.includes('Active');
            
            if (activeStatusChecked) {
                hasValidations = true;
                if (hasActiveStatus) {
                    successCount++;
                    groupedResults['activeStatus'] = {
                        status: 'success',
                        title: 'Active Status',
                        icon: '✓',
                        content: 'Subscriber status is checked for "Active"'
                    };
                    document.querySelector('[data-checkbox="activeStatus"]').classList.add('highlight-success');
                } else {
                    errorCount++;
                    groupedResults['activeStatus'] = {
                        status: 'error',
                        title: 'Active Status',
                        icon: '✗',
                        content: 'Active status condition is missing'
                    };
                    document.querySelector('[data-checkbox="activeStatus"]').classList.add('highlight-error');
                }
            } else if (hasActiveStatus) {
                // Flag if checkbox is unchecked but condition exists in query
                flagCount++;
                groupedResults['activeStatus'] = {
                    status: 'flag',
                    title: 'Active Status',
                    icon: '🚩',
                    content: 'Active Status is not checked but active status condition exists in query',
                    flagMessage: 'Query contains active status condition but the Active Status checkbox is not checked. This might indicate a mismatch between your selection and the query.'
                };
                document.querySelector('[data-checkbox="activeStatus"]').classList.add('highlight-flag');
            }
            
            // Complaint Validation
            const complaintChecked = document.getElementById('complaint').checked;
            const hasComplaintCheck = sqlQuery.includes('_Complaint');
            
            if (complaintChecked) {
                hasValidations = true;
                if (hasComplaintCheck) {
                    successCount++;
                    groupedResults['complaint'] = {
                        status: 'success',
                        title: 'Complaint',
                        icon: '✓',
                        content: '_Complaint is checked'
                    };
                    document.querySelector('[data-checkbox="complaint"]').classList.add('highlight-success');
                } else {
                    errorCount++;
                    groupedResults['complaint'] = {
                        status: 'error',
                        title: 'Complaint',
                        icon: '✗',
                        content: '_Complaint is missing'
                    };
                    document.querySelector('[data-checkbox="complaint"]').classList.add('highlight-error');
                }
            } else if (hasComplaintCheck) {
                // Flag if checkbox is unchecked but condition exists in query
                flagCount++;
                groupedResults['complaint'] = {
                    status: 'flag',
                    title: 'Complaint',
                    icon: '🚩',
                    content: 'Complaint is not checked but _Complaint check exists in query',
                    flagMessage: 'Query contains complaint check but the Complaint checkbox is not checked. This might indicate a mismatch between your selection and the query.'
                };
                document.querySelector('[data-checkbox="complaint"]').classList.add('highlight-flag');
            }
            
            // Master Suppression Validation
            const masterSuppressionChecked = document.getElementById('masterSuppression').checked;
            const hasMasterSuppression = sqlQuery.includes('AMC_MasterSuppression');
            
            if (masterSuppressionChecked) {
                hasValidations = true;
                if (hasMasterSuppression) {
                    successCount++;
                    groupedResults['masterSuppression'] = {
                        status: 'success',
                        title: 'AMC Master Suppression',
                        icon: '✓',
                        content: 'AMC_MasterSuppression table is checked'
                    };
                    document.querySelector('[data-checkbox="masterSuppression"]').classList.add('highlight-success');
                } else {
                    errorCount++;
                    groupedResults['masterSuppression'] = {
                        status: 'error',
                        title: 'AMC Master Suppression',
                        icon: '✗',
                        content: 'AMC_MasterSuppression check is missing'
                    };
                    document.querySelector('[data-checkbox="masterSuppression"]').classList.add('highlight-error');
                }
            } else if (hasMasterSuppression) {
                // Flag if checkbox is unchecked but condition exists in query
                flagCount++;
                groupedResults['masterSuppression'] = {
                    status: 'flag',
                    title: 'AMC Master Suppression',
                    icon: '🚩',
                    content: 'AMC Master Suppression is not checked but AMC_MasterSuppression check exists in query',
                    flagMessage: 'Query contains master suppression check but the AMC Master Suppression checkbox is not checked. This might indicate a mismatch between your selection and the query.'
                };
                document.querySelector('[data-checkbox="masterSuppression"]').classList.add('highlight-flag');
            }
            
            // Associate Suppression Validation
            const associateSuppressionChecked = document.getElementById('associateSuppression').checked;
            const hasAssociateSuppression = sqlQuery.includes(`1104%`);
            
            if (associateSuppressionChecked) {
                hasValidations = true;
                if (hasAssociateSuppression) {
                    successCount++;
                    groupedResults['associateSuppression'] = {
                        status: 'success',
                        title: 'Associate Suppression',
                        icon: '✓',
                        content: 'Associate Suppression present'
                    };
                    document.querySelector('[data-checkbox="associateSuppression"]').classList.add('highlight-success');
                } else {
                    errorCount++;
                    groupedResults['associateSuppression'] = {
                        status: 'error',
                        title: 'Associate Suppression',
                        icon: '✗',
                        content: 'Associate Suppression missing'
                    };
                    document.querySelector('[data-checkbox="associateSuppression"]').classList.add('highlight-error');
                }
            } else if (hasAssociateSuppression) {
                // Flag if checkbox is unchecked but condition exists in query
                flagCount++;
                groupedResults['associateSuppression'] = {
                    status: 'flag',
                    title: 'Associate Suppression',
                    icon: '🚩',
                    content: 'Associate Suppression is not checked but conditions exist in query',
                    flagMessage: 'Query contains associate suppression conditions but the Associate Suppression checkbox is not checked. This might indicate a mismatch between your selection and the query.'
                };
                document.querySelector('[data-checkbox="associateSuppression"]').classList.add('highlight-flag');
            }
            
            // Fresh Address Validation
            const freshAddressChecked = document.getElementById('freshAddress').checked;
            const hasFreshAddress = sqlQuery.includes('FreshAddress_Exclusions_MRM');
            
            if (freshAddressChecked) {
                hasValidations = true;
                if (hasFreshAddress) {
                    successCount++;
                    groupedResults['freshAddress'] = {
                        status: 'success',
                        title: 'Fresh Address',
                        icon: '✓',
                        content: 'FreshAddress_Exclusions_MRM is checked'
                    };
                    document.querySelector('[data-checkbox="freshAddress"]').classList.add('highlight-success');
                } else {
                    errorCount++;
                    groupedResults['freshAddress'] = {
                        status: 'error',
                        title: 'Fresh Address',
                        icon: '✗',
                        content: 'FreshAddress_Exclusions_MRM check is missing'
                    };
                    document.querySelector('[data-checkbox="freshAddress"]').classList.add('highlight-error');
                }
            } else if (hasFreshAddress) {
                // Flag if checkbox is unchecked but condition exists in query
                flagCount++;
                groupedResults['freshAddress'] = {
                    status: 'flag',
                    title: 'Fresh Address',
                    icon: '🚩',
                    content: 'Fresh Address is not checked but FreshAddress_Exclusions_MRM check exists in query',
                    flagMessage: 'Query contains fresh address check but the Fresh Address checkbox is not checked. This might indicate a mismatch between your selection and the query.'
                };
                document.querySelector('[data-checkbox="freshAddress"]').classList.add('highlight-flag');
            }
            
            // Engagement Validation
            const engagementChecked = document.getElementById('engagement').checked;
            const hasEngagement = sqlQuery.includes('CLICK_ENGAGEMENT_LAST_6_MONTHS');
            
            if (engagementChecked) {
                hasValidations = true;
                if (hasEngagement) {
                    successCount++;
                    groupedResults['engagement'] = {
                        status: 'success',
                        title: 'Engagement',
                        icon: '✓',
                        content: 'CLICK_ENGAGEMENT_LAST_6_MONTHS and LastOpen_6Months tables are checked'
                    };
                    document.querySelector('[data-checkbox="engagement"]').classList.add('highlight-success');
                } else {
                    errorCount++;
                    groupedResults['engagement'] = {
                        status: 'error',
                        title: 'Engagement',
                        icon: '✗',
                        content: 'Engagement tables check is missing'
                    };
                    document.querySelector('[data-checkbox="engagement"]').classList.add('highlight-error');
                }
            } else if (hasEngagement) {
                // Flag if checkbox is unchecked but condition exists in query
                flagCount++;
                groupedResults['engagement'] = {
                    status: 'flag',
                    title: 'Engagement',
                    icon: '🚩',
                    content: 'Engagement is not checked but engagement tables check exists in query',
                    flagMessage: 'Query contains engagement check but the Engagement checkbox is not checked. This might indicate a mismatch between your selection and the query.'
                };
                document.querySelector('[data-checkbox="engagement"]').classList.add('highlight-flag');
            }
            
            // Generate HTML from grouped results
            for (const [key, result] of Object.entries(groupedResults)) {
                let resultHTML = `<div class="result-group ${result.status}">
                    <div class="result-group-header">
                        <span class="result-group-icon">${result.icon}</span>
                        ${result.title}
                    </div>
                    <div class="result-group-content">${result.content}`;
                
                if (result.details) {
                    resultHTML += `<div class="result-detail ${result.status === 'success' ? 'match' : 'mismatch'}">${result.details}</div>`;
                }
                
                if (result.foundItems) {
                    resultHTML += `<div class="found-items">${result.foundItems}</div>`;
                }
                
                if (result.flagMessage) {
                    resultHTML += `<div class="flag-message">${result.flagMessage}</div>`;
                }
                
                resultHTML += `</div></div>`;
                resultsHTML += resultHTML;
            }
            
            // Add summary
            if (hasValidations || flagCount > 0) {
                let summaryClass = 'summary-success';
                let summaryText = `Validation Complete: ${successCount} passed, ${warningCount} warnings, ${errorCount} errors`;
                
                if (errorCount > 0) {
                    summaryClass = 'summary-error';
                } else if (warningCount > 0 || flagCount > 0) {
                    summaryClass = 'summary-warning';
                }
                
                if (flagCount > 0) {
                    summaryText += `, ${flagCount} flags`;
                }
                
                resultsHTML = `<div class="summary ${summaryClass}">${summaryText}</div>` + resultsHTML;
            } else {
                resultsHTML = '<div class="warning result-group"><div class="result-group-header"><span class="result-group-icon">⚠</span>Warning</div><div class="result-group-content">Please select at least one validation option.</div></div>';
            }
            
            resultsContainer.innerHTML = resultsHTML;
        });
        
        document.getElementById('clearBtn').addEventListener('click', function() {
            // Reset highlights
            resetHighlights();
            
            // Clear the SQL query
            document.getElementById('sqlQuery').value = '';
            document.getElementById('validationResults').innerHTML = '<div class="info result-group"><div class="result-group-header"><span class="result-group-icon">ℹ</span>Info</div><div class="result-group-content">Please enter a SQL query and click "Validate Query" to see results.</div></div>';
            
            const textarea = document.getElementById('sqlQuery');
//            textarea.value = '';
            textarea.style.height = 'auto';
            textarea.style.height = '100px'; // or whatever your min-height is            
            
            // Show all sections that might have been hidden
            showFullInterface();
        });
        
        // Modify the SQL toggle button to show all hidden sections when clicked
        document.getElementById('sqlToggleButton').addEventListener('click', function() {
            // Show all sections that might have been hidden
            showFullInterface();
            
            // Toggle the SQL container
            const sqlContainer = document.getElementById('sqlContainer');
            const sqlToggleHeader = document.getElementById('sqlToggleHeader');
            
            if (sqlContainer.style.display === 'none') {
                sqlContainer.style.display = 'block';
                sqlToggleHeader.classList.remove('collapsed');
                this.classList.remove('collapsed');
                
                // Show header toggle, hide button toggle
                sqlToggleHeader.style.display = 'flex';
                this.style.display = 'none';
            } else {
                sqlContainer.style.display = 'none';
                sqlToggleHeader.classList.add('collapsed');
                this.classList.add('collapsed');
                
                // Hide header toggle, show button toggle
                sqlToggleHeader.style.display = 'none';
                this.style.display = 'flex';
            }
        });

        // Auto-resize textarea
        const textarea = document.getElementById('sqlQuery');

        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
        
        // Add sample query to the textarea
        document.getElementById('sqlQuery').value = ``;