# 🏞️ 360° Virtual Tour Demo

![Virtual Tour Preview](https://via.placeholder.com/1200x400?text=360+Tour+Preview)

> 🚀 A lightweight and interactive **360° virtual tour** showcasing immersive web development skills with modern technologies.

## 📌 Features
- 🌍 **360° Image Navigation** powered by [Photo Sphere Viewer](https://photo-sphere-viewer.js.org/).
- ⚡ **Built with Angular** for a scalable and maintainable structure.
- 🎨 **Tailwind CSS** for sleek and responsive styling.
- 🔄 **Server-Side Rendering (SSR) & Static Site Generation (SSG)** for enhanced performance.
- 💧 **Hydration & Signals** for optimized reactivity.
- 🔍 **BiomeJS** for code linting and formatting.
- 🏎 **Bun** for fast package management and runtime.
- 🔄 **GitHub Actions** for automated CI/CD.

## 🚀 Roadmap
- [x] Project setup with Angular & Bun
- [x] Integrate TailwindCSS for styling
- [ ] Implement Photo Sphere Viewer for 360° navigation
- [ ] Add SSR & SSG support
- [ ] Optimize hydration with Angular Signals
- [x] Implement GitHub Actions for CI/CD
- [ ] Deploy demo version

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/360-tour-demo.git
cd 360-tour-demo
```

### 2️⃣ Install Dependencies
Using **Bun**:
```bash
bun install
```

Using **npm** (alternative):
```bash
npm install
```

### 3️⃣ Run Development Server
```bash
bun run dev
```
or

```bash
ng serve
```

Then open [http://localhost:4200](http://localhost:4200) in your browser.

### 4️⃣ Build the Project
```bash
bun run build
```

or

```bash
ng build
```

This will generate an optimized production build.

## 🚀 Deployment
This project supports SSR/SSG, so you can deploy it to platforms like **Vercel**, **Netlify**, or your preferred hosting.

To preview a production build locally:
```bash
bun run preview
```

## 🧪 Running Tests
```bash
bun run test
```

## 🔄 Continuous Integration
This project uses **GitHub Actions** for CI/CD. On every push to `main`, the following workflows will run:
- **Build & Test** the application
- **Lint & Format** using BiomeJS
- **Deploy to Staging** (if applicable)

## 📜 License
This project is open-source under the [GPL-3.0](LICENSE).

## 🤝 Contributing
Pull requests are welcome! Please open an issue to discuss any major changes.

---

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


---

🚀 Happy Coding!
