# 🎀 Debbie's Day Out - 90s Style Mini-Game

A delightful web-based mini-game that captures the nostalgic feel of 90s CD-ROM games! Help Debbie have the perfect day with three exciting activities featuring beautiful custom graphics and engaging gameplay.

## 🌟 Features

- **90s Aesthetic**: Glittery backgrounds, pastel colors, and nostalgic styling
- **Interactive Mini-Games**: Click sounds, animations, and engaging activities
- **Three Adventure Paths**: Thrift Store Adventure, Beach Picnic, and Horseback Riding
- **Photo Memories**: Each adventure ends with a special photo with custom backgrounds
- **Custom Graphics**: Beautiful SVG illustrations and backgrounds
- **Responsive Design**: Works on desktop and mobile devices
- **Custom Pop-ups**: Beautiful modal dialogs instead of browser alerts

## 🎮 Game Activities

### 🏬 Thrift Store Adventure
1. **Dress Up**: Choose Debbie's shopping outfit (tops, skirts, shoes, purse)
2. **Find & Buy**: Click hidden items in a shop window
3. **Fashion Show**: Take a photo with the chosen outfit and shopping bag

### 🏖️ Beach Picnic
1. **Swimwear**: Pick Debbie's swimsuit and sandals
2. **Picnic Prep**: Drag snacks and beach items into a picnic basket
3. **Photo Time**: Take a photo with friends at the beach

### 🐴 Horseback Riding
1. **Get Ready**: Dress Debbie in riding gear (boots, helmet, jacket, pants)
2. **Groom Horse**: Click to brush the horse's mane with a custom brush cursor
3. **Trail Ride**: Take a photo while riding through the trails

## 🚀 How to Run

### Option 1: Local Server (Recommended) ⭐
For the best experience with audio features:

1. **Open Terminal/Command Prompt** in the project directory
2. **Run the server**:
   ```bash
   python -m http.server 8000
   ```
3. **Open your browser** and visit: `http://localhost:8000`
4. **Enjoy** the game with full audio support!

**Note for Windows PowerShell users**: Run commands separately:
   ```powershell
   python -m http.server 8000
   ```

### Option 2: Direct File Opening
1. **Download/Clone** the project files
2. **Double-click** `index.html` or drag it into your browser
3. **Note**: Audio features may not work properly with this method

### Alternative Methods:
- **Drag and drop** `index.html` into your browser
- **Open with** any modern web browser (Chrome, Firefox, Safari, Edge)

## 🎨 Technical Details

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Animations, gradients, responsive design, and custom cursors
- **JavaScript**: Interactive game logic, state management, and custom pop-ups
- **SVG Graphics**: Custom illustrations for all game elements
- **No Dependencies**: Pure vanilla web technologies
- **Cross-Platform**: Works on Windows, Mac, and Linux

## 🎯 Game Controls

- **Mouse/Touch**: Click or tap to interact
- **Navigation**: Use buttons to move between screens
- **Selections**: Click items to select them
- **Progress**: Follow the progress indicators
- **Custom Cursor**: Special brush cursor for horse grooming

## 🌈 Visual Features

- **Glitter Background**: Animated sparkle effects
- **Pastel Colors**: Soft pink, blue, and lavender gradients
- **Bouncing Animations**: Playful element movements
- **Click Effects**: Visual feedback for interactions
- **Progress Indicators**: Clear activity tracking
- **Custom Pop-ups**: Beautiful modal dialogs with animations
- **Photo Effects**: Glossy shine animations on final photos

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🔧 Troubleshooting

### Audio Not Working?
- **Use a local server** (Option 1 above) instead of opening the file directly
- **Check browser settings** - ensure audio is enabled
- **Try a different browser** if issues persist

### Server Won't Start?
- **Windows PowerShell**: Use `python -m http.server 8000` (not `&&`)
- **Port in use**: Try a different port: `python -m http.server 8001`
- **Python not found**: Install Python from [python.org](https://python.org)

### Game Not Loading?
- **Check file structure** - ensure all files are in the correct directories
- **Clear browser cache** and refresh the page
- **Try incognito/private mode** to rule out browser extensions

## 🎵 Audio Features

- **Click Sounds**: Retro-style audio feedback for interactions
- **Success Sounds**: Celebration audio for completing mini-games
- **Camera Sounds**: Photo-taking sound effects
- **Background Music**: Ambient mall music
- **Audio Files**: Included in `assets/audio/` directory
- **Optional**: Audio can be disabled in browser settings

## 🎪 Game Flow

1. **Start Screen**: Choose to start, read about, or exit
2. **Plan Selection**: Pick from three adventure options
3. **Activity Progression**: Complete 2-3 mini-games per adventure
4. **Photo Time**: Take a commemorative photo with custom backgrounds
5. **Return**: Go back to start for another adventure

## 🎨 Customization

The game is easily customizable:
- **Colors**: Modify CSS variables for different themes
- **Activities**: Add new mini-games by extending the JavaScript
- **Content**: Change text and graphics for different themes
- **Animations**: Adjust timing and effects in CSS
- **Graphics**: Replace SVG files to change visual style

## 📁 Project Structure

```
debbie-day-out/
├── index.html          # Main game file
├── styles.css          # All styling and animations
├── script.js           # Game logic and interactions
├── *.svg              # Custom graphics and icons
├── *.jpg              # Background images
├── *.mp3              # Audio files
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## 🏆 Perfect For

- **Nostalgia Lovers**: Relive the 90s gaming experience
- **Young Players**: Simple, engaging gameplay
- **Debbie Fans**: Themed content and activities
- **Web Developers**: Clean, well-commented code
- **Educators**: Interactive learning tool
- **Designers**: Beautiful custom graphics and animations

## 🤝 Contributing

Feel free to contribute to this project! Some ideas:
- Add new activities or mini-games
- Create new graphics or animations
- Improve accessibility features
- Add sound effects or music
- Enhance mobile experience

## 📄 License

This project is open source and available for personal and educational use.

## 🌐 Hosting Options

Want to share this game online? Here are free hosting options:

### **Netlify (Recommended)**
1. Go to [netlify.com](https://netlify.com)
2. Click "Deploy manually"
3. Drag your entire project folder
4. Your game is live in 30 seconds!

### **GitHub Pages**
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → main
4. Site will be live in minutes

### **Other Options**
- **Vercel**: Connect GitHub repo for automatic deployments
- **Firebase Hosting**: Google's hosting service
- **Surge.sh**: Simple command-line deployment

All these options are completely free and will give you a public URL to share!

---

**Enjoy your day out with Debbie!** 🎀✨ 