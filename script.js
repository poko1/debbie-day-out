/*
  Debbie's Day Out - 90s Style Mini-Game JavaScript
  A delightful web-based mini-game featuring Debbie's adventures
  
  Features:
  - Interactive game logic and state management
  - Custom pop-up dialogs with async/await
  - Audio feedback with click sounds
  - Drag and drop functionality for picnic prep
  - Progress tracking for all activities
  - Outfit validation and photo capture
  
  Author: Debbie's Day Out Team
  License: MIT
  Version: 1.0.0
*/
let currentPlan = '';
let currentActivity = 0;
let foundItems = 0;
let totalItems = 5;
let packedItems = 0;
let totalPackedItems = 4;
let groomingProgress = 0;
let chosenOutfit = {
    top: '',
    bottom: '',
    shoes: '',
    dress: '',
    accessories: [], // Changed to array to support multiple accessories
    boots: '',
    jacket: '',
    pants: '',
    helmet: ''
};
let chosenSwimwear = {
    suit: '',
    sandals: ''
};
let chosenRidingGear = {
    boots: false,
    helmet: false,
    jacket: false,
    pants: false
};

// Audio elements
const clickSound = document.getElementById('click-sound');
const successSound = document.getElementById('success-sound');
const cameraSound = document.getElementById('camera-sound');

// Custom Pop-up Functions
function showCustomAlert(message, title = 'Message') {
    return new Promise((resolve) => {
        const popup = document.getElementById('custom-popup');
        const popupTitle = document.getElementById('popup-title');
        const popupMessage = document.getElementById('popup-message');
        const okButton = document.getElementById('popup-ok');
        const cancelButton = document.getElementById('popup-cancel');
        
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        
        // Show only OK button for alerts
        okButton.style.display = 'inline-block';
        cancelButton.style.display = 'none';
        
        popup.style.display = 'flex';
        
        const handleOK = () => {
            popup.style.display = 'none';
            okButton.removeEventListener('click', handleOK);
            resolve(true);
        };
        
        okButton.addEventListener('click', handleOK);
    });
}

function showCustomConfirm(message, title = 'Confirm') {
    return new Promise((resolve) => {
        const popup = document.getElementById('custom-popup');
        const popupTitle = document.getElementById('popup-title');
        const popupMessage = document.getElementById('popup-message');
        const okButton = document.getElementById('popup-ok');
        const cancelButton = document.getElementById('popup-cancel');
        
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        
        // Show both OK and Cancel buttons for confirms
        okButton.style.display = 'inline-block';
        cancelButton.style.display = 'inline-block';
        
        popup.style.display = 'flex';
        
        const handleOK = () => {
            popup.style.display = 'none';
            okButton.removeEventListener('click', handleOK);
            cancelButton.removeEventListener('click', handleCancel);
            resolve(true);
        };
        
        const handleCancel = () => {
            popup.style.display = 'none';
            okButton.removeEventListener('click', handleOK);
            cancelButton.removeEventListener('click', handleCancel);
            resolve(false);
        };
        
        okButton.addEventListener('click', handleOK);
        cancelButton.addEventListener('click', handleCancel);
    });
}

// Play click sound
function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Play success sound
function playSuccessSound() {
    if (successSound) {
        successSound.currentTime = 0;
        successSound.play().catch(e => console.log('Success audio play failed:', e));
    }
}

// Play camera sound
function playCameraSound() {
    if (cameraSound) {
        cameraSound.currentTime = 0;
        cameraSound.play().catch(e => console.log('Camera audio play failed:', e));
    }
}

// Music control variables
let isMusicPlaying = false;
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');

// Toggle background music
function toggleMusic() {
    playClickSound();
    
    if (isMusicPlaying) {
        // Stop music
        bgMusic.pause();
        bgMusic.currentTime = 0;
        isMusicPlaying = false;
        musicBtn.classList.add('muted');
        musicBtn.textContent = '🔇';
        musicBtn.title = 'Play Music';
    } else {
        // Start music
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.remove('muted');
            musicBtn.textContent = '🎵';
            musicBtn.title = 'Stop Music';
        }).catch(e => {
            console.log('Background music play failed:', e);
            // If autoplay fails, keep button in muted state
            musicBtn.classList.add('muted');
            musicBtn.textContent = '🔇';
            musicBtn.title = 'Play Music (Click to enable)';
        });
    }
}

// Add click effect to element
function addClickEffect(element) {
    element.classList.add('click-effect');
    setTimeout(() => element.classList.remove('click-effect'), 300);
}

// Screen navigation
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Start game
function startGame() {
    playClickSound();
    startBackgroundMusic();
    showScreen('plan-screen');
}

// Show about screen
function showAbout() {
    playClickSound();
    showScreen('about-screen');
}

// Exit game
async function exitGame() {
    playClickSound();
    const confirmed = await showCustomConfirm('Are you sure you want to exit?', 'Exit Game');
    if (confirmed) {
        window.close();
    }
}


// Go back to previous screen
function goBack() {
    playClickSound();
    if (currentPlan) {
        showScreen('plan-screen');
        currentPlan = '';
        resetGame();
    } else {
        showScreen('start-screen');
    }
}

// Select a plan
function selectPlan(plan) {
    playClickSound();
    currentPlan = plan;
    currentActivity = 0;
    resetGame();
    
    switch(plan) {
        case 'mall':
            showScreen('mall-screen');
            // Ensure first activity is visible
            setFirstActivityActive('#mall-screen');
            break;
        case 'beach':
            showScreen('beach-screen');
            setFirstActivityActive('#beach-screen');
            break;
        case 'horse':
            showScreen('horse-screen');
            setFirstActivityActive('#horse-screen');
            break;
    }
}

function startBackgroundMusic() {
    if (bgMusic) {
        bgMusic.volume = 0.5; // adjust volume as needed
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicBtn.classList.remove('muted');
            musicBtn.textContent = '🎵';
            musicBtn.title = 'Stop Music';
        }).catch(e => {
            console.log('Music play blocked:', e);
            // If autoplay fails, keep button in muted state
            isMusicPlaying = false;
            musicBtn.classList.add('muted');
            musicBtn.textContent = '🔇';
            musicBtn.title = 'Play Music (Click to enable)';
        });
    }
}
  

// Helper to set first activity as active in a given screen
function setFirstActivityActive(screenSelector) {
    const screen = document.querySelector(screenSelector);
    if (!screen) return;
    // Remove active from all activities
    screen.querySelectorAll('.activity').forEach(a => a.classList.remove('active'));
    // Add active to the first activity
    const first = screen.querySelector('.activity');
    if (first) first.classList.add('active');
    // Set first progress step as active
    screen.querySelectorAll('.progress-step').forEach((step, idx) => {
        if (idx === 0) step.classList.add('active');
        else step.classList.remove('active');
    });
}

// Next activity
function nextActivity() {
    playClickSound();
    currentActivity++;
    
    switch(currentPlan) {
        case 'mall':
            updateMallProgress();
            break;
        case 'beach':
            updateBeachProgress();
            break;
        case 'horse':
            updateHorseProgress();
            break;
    }
}

// Update mall progress
function updateMallProgress() {
    const activities = ['dress-up', 'find-buy', 'fashion-show'];
    const progressSteps = document.querySelectorAll('#mall-screen .progress-step');
    
    // Hide current activity
    document.querySelectorAll('#mall-screen .activity').forEach(activity => {
        activity.classList.remove('active');
    });
    
    // Show next activity
    if (currentActivity < activities.length) {
        document.getElementById(activities[currentActivity]).classList.add('active');
        
        // Update progress steps
        progressSteps.forEach((step, index) => {
            if (index <= currentActivity) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Initialize activity
        if (currentActivity === 1) {
            initializeFindBuy();
        }
    }
}

// Update beach progress
function updateBeachProgress() {
    const activities = ['beach-dress-up', 'picnic-prep', 'photo-time'];
    const progressSteps = document.querySelectorAll('#beach-screen .progress-step');
    
    // Hide current activity
    document.querySelectorAll('#beach-screen .activity').forEach(activity => {
        activity.classList.remove('active');
    });
    
    // Show next activity
    if (currentActivity < activities.length) {
        document.getElementById(activities[currentActivity]).classList.add('active');
        
        // Update progress steps
        progressSteps.forEach((step, index) => {
            if (index <= currentActivity) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Initialize activity
        if (currentActivity === 1) {
            initializePicnicPrep();
        }
    }
}

async function validateMallOutfitBeforeNext() {
    playClickSound();
  
    // If a dress is chosen, must have shoes too
    if (chosenOutfit.dress && !chosenOutfit.shoes) {
      await showCustomAlert('Oops! Looks like your outfit is incomplete. Please add shoes!', 'Outfit Incomplete');
      return;
    }
  
    // If using top/bottom, must have BOTH bottom and shoes
    if (!chosenOutfit.dress) {
      if (!chosenOutfit.bottom) {
        await showCustomAlert('Oops! Looks like your outfit is incomplete. Please pick a bottom!', 'Outfit Incomplete');
        return;
      }
      if (!chosenOutfit.shoes) {
        await showCustomAlert('Oops! Looks like your outfit is incomplete. Please add shoes!', 'Outfit Incomplete');
        return;
      }
    }
  
    // If complete, go to next activity
    nextActivity();
  }
  

  async function validateBeachOutfitBeforeNext() {
    playClickSound();
  
    // For beach wear, only check if a dress has been selected
    if (!chosenOutfit.dress) {
      await showCustomAlert('Oops! Looks like your outfit is incomplete. Please pick a swimsuit!', 'Outfit Incomplete');
      return;
    }
    // If complete, go to next activity
    nextActivity();
  }

  async function validateRidingOutfitBeforeNext() {
    playClickSound();
  
    // For riding, must have boots, jacket, pants, and helmet
    if (!chosenOutfit.boots) {
      await showCustomAlert('Oops! Looks like your outfit is incomplete. Please pick riding boots!', 'Outfit Incomplete');
      return;
    }
    if (!chosenOutfit.jacket) {
      await showCustomAlert('Oops! Looks like your outfit is incomplete. Please pick a riding jacket!', 'Outfit Incomplete');
      return;
    }
    if (!chosenOutfit.pants) {
      await showCustomAlert('Oops! Looks like your outfit is incomplete. Please pick riding pants!', 'Outfit Incomplete');
      return;
    }
    if (!chosenOutfit.helmet) {
      await showCustomAlert('Oops! Looks like your outfit is incomplete. Please pick a riding helmet!', 'Outfit Incomplete');
      return;
    }
    // If complete, go to next activity
    nextActivity();
  }

// Update horse progress
function updateHorseProgress() {
    const activities = ['get-ready', 'groom-horse', 'trail-ride'];
    const progressSteps = document.querySelectorAll('#horse-screen .progress-step');
    
    // Hide current activity
    document.querySelectorAll('#horse-screen .activity').forEach(activity => {
        activity.classList.remove('active');
    });
    
    // Show next activity
    if (currentActivity < activities.length) {
        document.getElementById(activities[currentActivity]).classList.add('active');
        
        // Update progress steps
        progressSteps.forEach((step, index) => {
            if (index <= currentActivity) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Initialize activity
        if (currentActivity === 1) {
            initializeHorseGrooming();
        }
    }
}

// Initialize find and buy activity
function initializeFindBuy() {
    // Add a small delay to ensure background is loaded
    setTimeout(() => {
        foundItems = 0;
        updateFoundCount();
      
        const hiddenItems = document.querySelectorAll('.hidden-item');
        const placedPositions = [];
      
        hiddenItems.forEach(item => {
          item.classList.remove('found');
      
          let x, y;
          let safe = false;
      
          while (!safe) {
            x = Math.random() * 70 + 15; // left: 15%–85%
            y = Math.random() * 40 + 10; // top: 10%–50%
      
            safe = true;
      
            // Check distance from all previous positions
            for (const pos of placedPositions) {
              const dx = x - pos.x;
              const dy = y - pos.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < 15) { // adjust: minimum distance in % units
                safe = false;
                break;
              }
            }
          }
      
          placedPositions.push({ x, y });
      
          item.style.left = x + '%';
          item.style.top = y + '%';
      
          item.onclick = function() {
            if (!item.classList.contains('found')) {
              item.classList.add('found');
              foundItems++;
              updateFoundCount();
              addClickEffect(item);
              playClickSound();
      
                          if (foundItems >= totalItems) {
                  setTimeout(async () => {
                    playSuccessSound();
                    await showCustomAlert('Great job! You found all the items!', 'Success!');
                    nextActivity();
                  }, 500);
                }
            }
          };
        });
    }, 100); // Small delay to ensure background loads first
  }
  
  

// Update found count
function updateFoundCount() {
    const countElement = document.getElementById('found-count');
    if (countElement) {
        countElement.textContent = foundItems;
    }
}

// Initialize picnic prep
function initializePicnicPrep() {
    packedItems = 0;
    
    const picnicItems = document.querySelectorAll('.picnic-item');
    const packedContainer = document.querySelector('.packed-items');
    const dropZone = document.getElementById('drop-zone');
    
    // Reset all items
    picnicItems.forEach(item => {
        item.classList.remove('packed');
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });
    
    // Clear packed items
    packedContainer.innerHTML = '';
    
    // Function to pack an item
    function packItem(item) {
        if (item && !item.classList.contains('packed')) {
            // Mark item as packed and apply fade effect
            item.classList.add('packed');
            item.style.opacity = '0.3';
            item.style.transform = 'scale(0.9)';
            
            // Add to basket
            const packedItem = document.createElement('div');
            const itemImg = item.querySelector('.picnic-item-img');
            
            // Position items with left/right inclination based on count (before incrementing)
            if (packedItems === 0) {
                // First item - left inclined
                packedItem.style.position = 'absolute';
                packedItem.style.left = '30px';
                packedItem.style.top = '20px';
                packedItem.style.transform = 'rotate(-15deg)';
            } else if (packedItems === 1) {
                // Second item - left inclined
                packedItem.style.position = 'absolute';
                packedItem.style.left = '80px';
                packedItem.style.top = '20px';
                packedItem.style.transform = 'rotate(-10deg)';
            } else if (packedItems === 2) {
                // Third item - right inclined
                packedItem.style.position = 'absolute';
                packedItem.style.right = '80px';
                packedItem.style.top = '20px';
                packedItem.style.transform = 'rotate(10deg)';
            } else if (packedItems === 3) {
                // Fourth item - right inclined
                packedItem.style.position = 'absolute';
                packedItem.style.right = '30px';
                packedItem.style.top = '20px';
                packedItem.style.transform = 'rotate(15deg)';
            }
            
            // Increment packed items count
            packedItems++;
            
            if (itemImg) {
                // If it's an image, create a copy of the image
                const packedImg = document.createElement('img');
                packedImg.src = itemImg.src;
                packedImg.alt = itemImg.alt;
                packedImg.style.width = '45px';
                packedImg.style.height = '45px';
                packedImg.style.margin = '0px';
                packedImg.style.objectFit = 'contain';
                packedItem.appendChild(packedImg);
            } else {
                // Fallback to text if no image
                packedItem.textContent = item.textContent;
                packedItem.style.fontSize = '1.4rem';
                packedItem.style.margin = '0px';
            }
            packedContainer.appendChild(packedItem);
            
            addClickEffect(item);
            playClickSound();
            
            if (packedItems >= totalPackedItems) {
                setTimeout(async () => {
                    playSuccessSound();
                    await showCustomAlert('Awesome Job! All items are packed!', 'Success!');
                    nextActivity();
                }, 500);
            }
        }
    }
    
    // Check if device supports touch (mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Add mobile instruction
        const picnicHeading = document.querySelector('#picnic-prep h3');
        if (picnicHeading) {
            picnicHeading.innerHTML = 'Tap Items to Pack the Basket!';
        }
        
        // Mobile-friendly tap-to-pack system
        picnicItems.forEach(item => {
            item.addEventListener('touchstart', function(e) {
                e.preventDefault();
                if (!item.classList.contains('packed')) {
                    packItem(item);
                }
            });
            
            // Also add click for desktop fallback
            item.addEventListener('click', function(e) {
                if (!item.classList.contains('packed')) {
                    packItem(item);
                }
            });
        });
    } else {
        // Desktop drag and drop functionality
        picnicItems.forEach(item => {
            item.addEventListener('dragstart', function(e) {
                if (!item.classList.contains('packed')) {
                    item.classList.add('dragging');
                    e.dataTransfer.setData('text/plain', item.dataset.item);
                    e.dataTransfer.effectAllowed = 'move';
                }
            });
            
            item.addEventListener('dragend', function() {
                item.classList.remove('dragging');
            });
        });
        
        // Drop zone event listeners
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', function(e) {
            if (!dropZone.contains(e.relatedTarget)) {
                dropZone.classList.remove('drag-over');
            }
        });
        
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const itemType = e.dataTransfer.getData('text/plain');
            const draggedItem = document.querySelector(`[data-item="${itemType}"]`);
            
            if (draggedItem && !draggedItem.classList.contains('packed')) {
                packItem(draggedItem);
            }
        });
    }
}

// Initialize horse grooming
function initializeHorseGrooming() {
    // Add a small delay to ensure background is loaded
    setTimeout(() => {
        groomingProgress = 0;
        const progressFill = document.querySelector('.progress-fill');
        const horse = document.querySelector('.horse');
        
        if (progressFill && horse) {
            progressFill.style.width = '0%';
            
            horse.onclick = function() {
                groomingProgress += 10;
                progressFill.style.width = groomingProgress + '%';
                addClickEffect(horse);
                playClickSound();
                
                             if (groomingProgress >= 100) {
                     setTimeout(async () => {
                         playSuccessSound();
                         await showCustomAlert('The horse is perfectly groomed!', 'Success!');
                         nextActivity();
                     }, 500);
                 }
            };
        }
    }, 100); // Small delay to ensure background loads first
}

// Take photo
function takePhoto() {
    playClickSound();
    playCameraSound();
  
    const photoImage = document.getElementById('photo-image');
    
    console.log('Current plan:', currentPlan); // Debug log
  
    if (photoImage) {
      switch (currentPlan) {
        case 'mall':
          // For mall, show the mall photo
          photoImage.innerHTML = `
            <div class="mall-final">
              <img src="assets/vectors/mall_pose.svg" alt="Friends Pose" class="mall-photo-final" />
            </div>
          `;
          break;
  
        case 'beach':
          // For beach, show the beach photo
          photoImage.innerHTML = `
            <div class="beach-final">
              <img src="assets/vectors/beach-photo.svg" alt="Beach Photo" class="beach-photo-final" />
            </div>
          `;
          break;
  
        case 'horse':
          // For horse, show the trail ride photo
          photoImage.innerHTML = `
            <div class="horse-final">
              <img src="assets/vectors/trail.svg" alt="Trail Ride Photo" class="horse-photo-final" />
            </div>
          `;
          break;
          
        default:
          console.log('No plan detected, showing default'); // Debug log
          photoImage.innerHTML = '👙🏖️'; // Default fallback
          break;
      }
    }
  
    showScreen('photo-screen');
  }
  

// Finish plan
function finishPlan() {
    playClickSound();
    showScreen('start-screen');
    resetGame();
}

// Reset game state
function resetGame() {
    currentActivity = 0;
    foundItems = 0;
    packedItems = 0;
    groomingProgress = 0;
         chosenOutfit = { top: '', bottom: '', shoes: '', dress: '', accessories: [], boots: '', jacket: '', pants: '', helmet: '' };
    chosenSwimwear = { suit: '', sandals: '' };
    chosenRidingGear = { boots: false, helmet: false, jacket: false, pants: false };
    
    // Reset all activities to first
    document.querySelectorAll('.activity').forEach(activity => {
        activity.classList.remove('active');
    });
    
    document.querySelectorAll('.activity:first-child').forEach(activity => {
        activity.classList.add('active');
    });
    
    // Reset progress steps
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index === 0) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Reset clothing selections
    document.querySelectorAll('.clothing-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Clear all overlays across all screens
    clearAllOverlays();
}

// Clear all overlays across all screens
function clearAllOverlays() {
    // Get all screens
    const allScreens = document.querySelectorAll('.screen');
    
    allScreens.forEach(screen => {
        // Clear dress overlays
        const dressOverlay = screen.querySelector('.dress-overlay');
        if (dressOverlay) {
            dressOverlay.src = '';
            dressOverlay.style.display = 'none';
            dressOverlay.classList.remove('swimsuit-overlay');
        }
        
        // Clear shoes overlays
        const shoesOverlay = screen.querySelector('.shoes-overlay');
        if (shoesOverlay) {
            shoesOverlay.src = '';
            shoesOverlay.style.display = 'none';
        }
        
        // Clear top overlays
        const topOverlay = screen.querySelector('.top-overlay');
        if (topOverlay) {
            topOverlay.src = '';
            topOverlay.style.display = 'none';
        }
        
        // Clear bottom overlays
        const bottomOverlay = screen.querySelector('.bottom-overlay');
        if (bottomOverlay) {
            bottomOverlay.src = '';
            bottomOverlay.style.display = 'none';
        }
        
        // Clear accessory overlays
        const sunniesOverlay = screen.querySelector('.sunnies-overlay');
        if (sunniesOverlay) {
            sunniesOverlay.src = '';
            sunniesOverlay.style.display = 'none';
        }
        
        const hatOverlay = screen.querySelector('.hat-overlay');
        if (hatOverlay) {
            hatOverlay.src = '';
            hatOverlay.style.display = 'none';
        }
        
        // Clear riding overlays
        const bootsOverlay = screen.querySelector('.boots-overlay');
        if (bootsOverlay) {
            bootsOverlay.src = '';
            bootsOverlay.style.display = 'none';
        }
        
        const jacketOverlay = screen.querySelector('.jacket-overlay');
        if (jacketOverlay) {
            jacketOverlay.src = '';
            jacketOverlay.style.display = 'none';
        }
        
        const pantsOverlay = screen.querySelector('.pants-overlay');
        if (pantsOverlay) {
            pantsOverlay.src = '';
            pantsOverlay.style.display = 'none';
        }
        
        const helmetOverlay = screen.querySelector('.helmet-overlay');
        if (helmetOverlay) {
            helmetOverlay.src = '';
            helmetOverlay.style.display = 'none';
        }
    });
}

// Dress up functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize music control button
    if (musicBtn) {
        // Set initial state (muted until user starts music)
        musicBtn.classList.add('muted');
        musicBtn.textContent = '🔇';
        musicBtn.title = 'Play Music';
    }
    
    // Clothing selection for dress and shoes only
    const clothingItems = document.querySelectorAll('.clothing-item');
    clothingItems.forEach(item => {
        item.addEventListener('click', function() {
            const type = this.dataset.type;
            const itemValue = this.dataset.item;
            
            // ✅ Handle accessories (can be worn with any outfit)
            if (type === 'accessories') {
                // Toggle selection for accessories (can wear multiple)
                if (this.classList.contains('selected')) {
                    // Remove this accessory
                    this.classList.remove('selected');
                    const index = chosenOutfit.accessories.indexOf(itemValue);
                    if (index > -1) {
                        chosenOutfit.accessories.splice(index, 1);
                    }
                } else {
                    // Add this accessory
                    this.classList.add('selected');
                    if (!chosenOutfit.accessories.includes(itemValue)) {
                        chosenOutfit.accessories.push(itemValue);
                    }
                }
                updateDollOutfit();
                addClickEffect(this);
                playClickSound();
                return; // Don't continue with the rest of the logic
            }
            
            // ✅ Handle toggle functionality for all other clothing types
            if (this.classList.contains('selected')) {
                // If already selected, deselect it
                this.classList.remove('selected');
                chosenOutfit[type] = '';
                
                // Handle special cases for dress/top/bottom relationships
                if (type === 'dress') {
                    // When deselecting dress, also clear bottom selections (but keep jacket)
                    chosenOutfit.bottom = '';
                    document.querySelectorAll(`[data-type="bottom"]`).forEach(el => {
                        el.classList.remove('selected');
                    });
                } else if (type === 'bottom') {
                    // When deselecting bottom, also clear dress selection
                    chosenOutfit.dress = '';
                    document.querySelectorAll(`[data-type="dress"]`).forEach(el => {
                        el.classList.remove('selected');
                    });
                }
                
                updateDollOutfit();
                addClickEffect(this);
                playClickSound();
                return;
            }
            
            // ✅ If not selected, handle normal selection logic
            
            // Remove selection from other items of same type
            document.querySelectorAll(`[data-type="${type}"]`).forEach(el => {
                el.classList.remove('selected');
            });
            
            // ✅ NEW RULE: Picking bottom cancels dress, but jacket can be worn over dress
            if (type === 'bottom') {
                chosenOutfit.dress = '';
                // Also remove selection highlight from dress items
                document.querySelectorAll(`[data-type="dress"]`).forEach(el => {
                el.classList.remove('selected');
                });
            }
            // ✅ If picking BOTTOM, cancel dress
            if (type === 'bottom') {
                chosenOutfit.dress = '';
                document.querySelectorAll(`[data-type="dress"]`).forEach(el => {
                    el.classList.remove('selected');
                });
            }

            // ✅ If picking DRESS, cancel bottom (but keep jacket)
            if (type === 'dress') {
                chosenOutfit.bottom = '';
                document.querySelectorAll(`[data-type="bottom"]`).forEach(el => {
                    el.classList.remove('selected');
                });
            }
            
            // Select this item
            this.classList.add('selected');
            chosenOutfit[type] = itemValue;
            updateDollOutfit();
            addClickEffect(this);
            playClickSound();
        });
    });
    
    // Add click effects to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            addClickEffect(this);
        });
    });
    
    // Add click effects to plan cards
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', function() {
            addClickEffect(this);
        });
    });
});

// Add this function after the DOMContentLoaded block
function updateDollOutfit() {
    // Find the currently active screen
    const activeScreen = document.querySelector('.screen.active');
    if (!activeScreen) return;

    // Dress overlay
    const dressOverlay = activeScreen.querySelector('.dress-overlay');
    if (dressOverlay) {
      if (chosenOutfit.dress === 'pink-dress') {
        dressOverlay.src = 'assets/vectors/dress.svg';
        dressOverlay.style.display = 'block';
        dressOverlay.classList.remove('swimsuit-overlay');
      } else if (chosenOutfit.dress === 'swimsuit') {
        dressOverlay.src = 'assets/vectors/swimsuit.svg';
        dressOverlay.style.display = 'block';
        dressOverlay.classList.add('swimsuit-overlay');
        console.log('Swimsuit selected, class added:', dressOverlay.classList.contains('swimsuit-overlay'));
        console.log('Element classes:', dressOverlay.className);
      } else if (chosenOutfit.dress === 'swimwear') {
        dressOverlay.src = 'assets/vectors/swimwear.svg';
        dressOverlay.style.display = 'block';
        dressOverlay.classList.add('swimsuit-overlay');
        console.log('Swimwear selected, class added:', dressOverlay.classList.contains('swimsuit-overlay'));
        console.log('Element classes:', dressOverlay.className);
      } else {
        dressOverlay.src = '';
        dressOverlay.style.display = 'none';
        dressOverlay.classList.remove('swimsuit-overlay');
      }
    }

    // Shoes overlay
    const shoesOverlay = activeScreen.querySelector('.shoes-overlay');
    if (shoesOverlay) {
      if (chosenOutfit.shoes === 'red-shoes') {
        shoesOverlay.src = 'assets/vectors/red-shoes.svg';
        shoesOverlay.style.display = 'block';
      } else if (chosenOutfit.shoes === 'black-shoes') {
        shoesOverlay.src = 'assets/vectors/black-shoes.svg';
        shoesOverlay.style.display = 'block';
      } else {
        shoesOverlay.src = '';
        shoesOverlay.style.display = 'none';
      }
    }

    // ✅ Tops — jacket can be worn over dress, other tops only if NO dress selected
    const topOverlay = activeScreen.querySelector('.top-overlay');
    if (topOverlay) {
      if (chosenOutfit.top === 'jacket') {
        // Jacket can be worn over anything
        topOverlay.src = 'assets/vectors/jacket.svg';
        topOverlay.style.display = 'block';
      } else if (!chosenOutfit.dress) {
        // Other tops only if no dress is selected
        if (chosenOutfit.top === 'tan-top') {
          topOverlay.src = 'assets/vectors/tan-top.svg';
          topOverlay.style.display = 'block';
        } else if (chosenOutfit.top === 'purple-top') {
          topOverlay.src = 'assets/vectors/purple-top.svg';
          topOverlay.style.display = 'block';
        } else {
          topOverlay.src = '';
          topOverlay.style.display = 'none';
        }
      } else {
        topOverlay.src = '';
        topOverlay.style.display = 'none';
      }
    }

    // ✅ Bottoms — only if NO dress selected
    const bottomOverlay = activeScreen.querySelector('.bottom-overlay');
    if (bottomOverlay) {
      if (!chosenOutfit.dress) {
        if (chosenOutfit.bottom === 'pants') {
          bottomOverlay.src = 'assets/vectors/pants.svg';
          bottomOverlay.style.display = 'block';
        } else if (chosenOutfit.bottom === 'skirt') {
          bottomOverlay.src = 'assets/vectors/skirt.svg';
          bottomOverlay.style.display = 'block';
        } 
        else if (chosenOutfit.bottom === 'shorts') {
          bottomOverlay.src = 'assets/vectors/shorts.svg';
          bottomOverlay.style.display = 'block';
        } else {
          bottomOverlay.src = '';
          bottomOverlay.style.display = 'none';
        }
      } else {
        bottomOverlay.src = '';
        bottomOverlay.style.display = 'none';
      }
    }

         // ✅ Accessories overlays (for beach wear) - now supports multiple accessories
     const sunniesOverlay = activeScreen.querySelector('.sunnies-overlay');
     if (sunniesOverlay) {
       if (chosenOutfit.accessories.includes('sunnies')) {
         sunniesOverlay.src = 'assets/vectors/sunnies.svg';
         sunniesOverlay.style.display = 'block';
       } else {
         sunniesOverlay.src = '';
         sunniesOverlay.style.display = 'none';
       }
     }

     const hatOverlay = activeScreen.querySelector('.hat-overlay');
     if (hatOverlay) {
       if (chosenOutfit.accessories.includes('hat')) {
         hatOverlay.src = 'assets/vectors/hat.svg';
         hatOverlay.style.display = 'block';
       } else {
         hatOverlay.src = '';
         hatOverlay.style.display = 'none';
       }
     }

     // ✅ Riding overlays (for horseback riding)
     const bootsOverlay = activeScreen.querySelector('.boots-overlay');
     if (bootsOverlay) {
       if (chosenOutfit.boots === 'boots') {
         bootsOverlay.src = 'assets/vectors/boots.svg';
         bootsOverlay.style.display = 'block';
       } else {
         bootsOverlay.src = '';
         bootsOverlay.style.display = 'none';
       }
     }

     const jacketOverlay = activeScreen.querySelector('.jacket-overlay');
     if (jacketOverlay) {
       if (chosenOutfit.jacket === 'jacket') {
         jacketOverlay.src = 'assets/vectors/jacket.svg';
         jacketOverlay.style.display = 'block';
       } else {
         jacketOverlay.src = '';
         jacketOverlay.style.display = 'none';
       }
     }

           const pantsOverlay = activeScreen.querySelector('.pants-overlay');
      if (pantsOverlay) {
        if (chosenOutfit.pants === 'pants') {
          pantsOverlay.src = 'assets/vectors/pants.svg';
          pantsOverlay.style.display = 'block';
        } else {
          pantsOverlay.src = '';
          pantsOverlay.style.display = 'none';
        }
      }

      const helmetOverlay = activeScreen.querySelector('.helmet-overlay');
      if (helmetOverlay) {
        if (chosenOutfit.helmet === 'helmet') {
          helmetOverlay.src = 'assets/vectors/helmet.svg';
          helmetOverlay.style.display = 'block';
        } else {
          helmetOverlay.src = '';
          helmetOverlay.style.display = 'none';
        }
      }
  }

// Add some random glitter effects
function addGlitterEffect() {
    const glitter = document.createElement('div');
    glitter.style.position = 'fixed';
    glitter.style.left = Math.random() * window.innerWidth + 'px';
    glitter.style.top = Math.random() * window.innerHeight + 'px';
    glitter.style.fontSize = '20px';
    glitter.style.color = '#ff69b4';
    glitter.style.pointerEvents = 'none';
    glitter.style.zIndex = '1000';
    glitter.textContent = '✨';
    glitter.style.animation = 'glitter 1s ease-out forwards';
    
    document.body.appendChild(glitter);
    
    setTimeout(() => {
        document.body.removeChild(glitter);
    }, 1000);
}

// Add glitter effect randomly
setInterval(addGlitterEffect, 3000);

// Add CSS for glitter animation
const style = document.createElement('style');
style.textContent = `
    @keyframes glitter {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
`;
document.head.appendChild(style); 